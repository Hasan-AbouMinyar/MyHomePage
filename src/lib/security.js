const CLIENT_ID_KEY = 'portfolio_client_id';

const getStorage = () => {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
};

const readAttempts = (key) => {
  const storage = getStorage();
  if (!storage) return [];

  try {
    const value = JSON.parse(storage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter((item) => Number.isFinite(item)) : [];
  } catch {
    storage.removeItem(key);
    return [];
  }
};

const writeAttempts = (key, attempts) => {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(key, JSON.stringify(attempts));
};

export const getClientFingerprint = () => {
  const storage = getStorage();
  if (!storage) return 'browser-unavailable';

  let clientId = storage.getItem(CLIENT_ID_KEY);
  if (!clientId) {
    clientId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    storage.setItem(CLIENT_ID_KEY, clientId);
  }

  return clientId;
};

export const getRateLimitStatus = (key, maxAttempts, windowMs) => {
  const now = Date.now();
  const attempts = readAttempts(key).filter((time) => now - time < windowMs);
  writeAttempts(key, attempts);

  if (attempts.length < maxAttempts) {
    return {
      limited: false,
      remaining: maxAttempts - attempts.length,
      retryAfterMs: 0,
    };
  }

  return {
    limited: true,
    remaining: 0,
    retryAfterMs: Math.max(0, windowMs - (now - attempts[0])),
  };
};

export const recordRateLimitAttempt = (key, maxAttempts, windowMs) => {
  const now = Date.now();
  const attempts = readAttempts(key).filter((time) => now - time < windowMs);
  attempts.push(now);
  writeAttempts(key, attempts);
  return getRateLimitStatus(key, maxAttempts, windowMs);
};

export const clearRateLimit = (key) => {
  const storage = getStorage();
  if (storage) storage.removeItem(key);
};

export const formatRetryTime = (ms, lang) => {
  const minutes = Math.max(1, Math.ceil(ms / 60000));
  return lang === 'ar' ? `${minutes} دقيقة` : `${minutes} min`;
};

export const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();

const URL_PATTERN =
  /(https?:\/\/|www\.|[a-z0-9.-]+\.(com|net|org|io|co|ly|ru|cn|xyz|top|info|biz|online|site|shop)(\/|\s|$))/i;

const UNSAFE_PATTERN =
  /(<[^>]+>|javascript:|vbscript:|data:text\/html|onerror\s*=|onload\s*=|onclick\s*=|<script|<\/script)/i;

const REPEATED_PATTERN = /(.)\1{13,}/;

export const hasBlockedLink = (...values) => values.some((value) => URL_PATTERN.test(value));

export const hasUnsafeContent = (...values) =>
  values.some((value) => UNSAFE_PATTERN.test(value));

export const hasAbusiveRepetition = (...values) =>
  values.some((value) => REPEATED_PATTERN.test(value));

export const getContactRateKeys = (email) => ({
  global: 'contact_submit_global',
  email: `contact_submit_email:${email.trim().toLowerCase() || 'unknown'}`,
});

export const getLoginRateKey = (email) =>
  `admin_login:${email.trim().toLowerCase() || 'unknown'}`;
