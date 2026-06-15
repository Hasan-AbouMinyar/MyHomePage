import { getClientFingerprint } from './security';

const normalizeSupabaseUrl = (url) =>
  (url || '')
    .trim()
    .replace(/\/+$/, '')
    .replace(/\/rest\/v1$/, '')
    .replace(/\/auth\/v1$/, '');

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_URL = normalizeSupabaseUrl(rawSupabaseUrl);
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const ADMIN_SESSION_KEY = 'portfolio_admin_session';

export const normalizeAdminPath = (path) => {
  const cleanPath = path || '/admin';
  const prefixedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  return prefixedPath.replace(/\/+$/, '') || '/';
};

export const ADMIN_PATH = normalizeAdminPath(
  import.meta.env.VITE_ADMIN_PATH || import.meta.env.VITE_ADMIN_SECRET_PATH || '/admin'
);

export const isAdminPath = (path = window.location.pathname) =>
  normalizeAdminPath(path) === ADMIN_PATH;

export class SupabaseConfigError extends Error {
  constructor() {
    super('Supabase is not configured.');
    this.name = 'SupabaseConfigError';
    this.code = 'missing_config';
  }
}

export const isSupabaseConfigured = () => Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

export const getSupabaseConfigStatus = () => ({
  configured: isSupabaseConfigured(),
  missing: [
    !SUPABASE_URL ? 'VITE_SUPABASE_URL' : null,
    !SUPABASE_PUBLISHABLE_KEY ? 'VITE_SUPABASE_PUBLISHABLE_KEY' : null,
  ].filter(Boolean),
});

const ensureSupabaseConfigured = () => {
  if (!isSupabaseConfigured()) {
    throw new SupabaseConfigError();
  }
};

const parseResponse = async (response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      data?.error_description ||
      data?.message ||
      data?.hint ||
      data?.error ||
      'Supabase request failed.';
    const error = new Error(message);
    error.status = response.status;
    error.code = data?.code || data?.error || `${response.status}`;
    error.details = data;
    throw error;
  }

  return data;
};

const supabaseRequest = async (path, { method = 'GET', body, token, headers = {} } = {}) => {
  ensureSupabaseConfigured();

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return parseResponse(response);
};

export const createContactMessage = async ({ name, email, subject, message }) => {
  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
    source: 'portfolio',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 500) : null,
    client_fingerprint: getClientFingerprint(),
  };

  return supabaseRequest('/rest/v1/contact_messages', {
    method: 'POST',
    body: payload,
    headers: {
      Prefer: 'return=minimal',
    },
  });
};

export const loginAdmin = async (email, password) => {
  const session = await supabaseRequest('/auth/v1/token?grant_type=password', {
    method: 'POST',
    body: {
      email: email.trim().toLowerCase(),
      password,
    },
  });

  const userEmail = session.user?.email || email.trim().toLowerCase();

  return {
    ...session,
    admin_profile: {
      id: session.user?.id,
      email: userEmail,
      display_name: userEmail,
    },
    expires_at: Math.floor(Date.now() / 1000) + session.expires_in,
  };
};

export const saveAdminSession = (session) => {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
};

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

export const getStoredAdminSession = () => {
  try {
    const stored = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!stored) return null;

    const session = JSON.parse(stored);
    const expiresAt = Number(session?.expires_at || 0);

    if (!session?.access_token || (expiresAt && expiresAt <= Math.floor(Date.now() / 1000))) {
      clearAdminSession();
      return null;
    }

    return session;
  } catch {
    clearAdminSession();
    return null;
  }
};

export const fetchContactMessages = async (token) => {
  const params = new URLSearchParams({
    select: 'id,name,email,subject,message,status,source,created_at,read_at,archived_at',
    order: 'created_at.desc',
    limit: '100',
  });

  return supabaseRequest(`/rest/v1/contact_messages?${params.toString()}`, {
    token,
  });
};

export const updateMessageStatus = async (id, status, token) => {
  const params = new URLSearchParams({ id: `eq.${id}` });
  const now = new Date().toISOString();
  const body = { status };

  if (status === 'read') body.read_at = now;
  if (status === 'archived') body.archived_at = now;

  return supabaseRequest(`/rest/v1/contact_messages?${params.toString()}`, {
    method: 'PATCH',
    body,
    token,
    headers: {
      Prefer: 'return=representation',
    },
  });
};

export const deleteContactMessage = async (id, token) => {
  const params = new URLSearchParams({ id: `eq.${id}` });

  return supabaseRequest(`/rest/v1/contact_messages?${params.toString()}`, {
    method: 'DELETE',
    token,
    headers: {
      Prefer: 'return=minimal',
    },
  });
};
