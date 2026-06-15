import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArchive,
  FaEnvelopeOpen,
  FaEye,
  FaEyeSlash,
  FaInbox,
  FaMoon,
  FaReply,
  FaSignInAlt,
  FaSignOutAlt,
  FaSun,
  FaSyncAlt,
  FaTrash,
} from 'react-icons/fa';
import loginDarkImage from '../assets/login-dark.jpg';
import loginLightImage from '../assets/login-light.jpg';
import { useLanguage } from '../context/LanguageContext';
import {
  clearAdminSession,
  deleteContactMessage,
  fetchContactMessages,
  getStoredAdminSession,
  getSupabaseConfigStatus,
  loginAdmin,
  saveAdminSession,
  updateMessageStatus,
} from '../lib/supabaseApi';
import {
  clearRateLimit,
  formatRetryTime,
  getLoginRateKey,
  getRateLimitStatus,
  recordRateLimitAttempt,
} from '../lib/security';

const statusOptions = ['all', 'new', 'read', 'archived'];

const formatDate = (value, lang) => {
  if (!value) return '';

  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-LY' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

const getStatusClass = (status) => {
  if (status === 'new') {
    return 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black';
  }

  if (status === 'archived') {
    return 'border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400';
  }

  return 'border-zinc-300 bg-white text-zinc-600 dark:border-zinc-700 dark:bg-black dark:text-zinc-300';
};

const getAdminErrorMessage = (error, t) => {
  const code = error?.code || error?.details?.code || '';
  const message = `${error?.message || ''} ${error?.details?.message || ''}`.toLowerCase();

  if (code === 'missing_config') return t('admin.configMissing');
  if (error?.status === 404) return t('admin.projectUrlError');
  if (code === '42P01' || message.includes('relation') || message.includes('contact_messages')) {
    return t('admin.setupMissing');
  }
  if (code === '42501' || message.includes('permission denied')) {
    return t('admin.setupPermission');
  }
  if (
    code === 'invalid_credentials' ||
    message.includes('invalid login credentials') ||
    message.includes('invalid credentials')
  ) {
    return t('admin.invalidCredentials');
  }
  if (error instanceof TypeError || message.includes('failed to fetch')) {
    return t('admin.networkError');
  }

  return t('admin.loginError');
};

const AdminDashboard = ({ darkMode, toggleDarkMode }) => {
  const { lang, toggleLanguage, t } = useLanguage();
  const [session, setSession] = useState(() => getStoredAdminSession());
  const [profile, setProfile] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const loginImage = darkMode ? loginDarkImage : loginLightImage;

  const visibleMessages = useMemo(() => {
    if (filter === 'all') return messages;
    return messages.filter((message) => message.status === filter);
  }, [filter, messages]);

  const stats = useMemo(
    () =>
      messages.reduce(
        (acc, message) => {
          acc.total += 1;
          acc[message.status] = (acc[message.status] || 0) + 1;
          return acc;
        },
        { total: 0, new: 0, read: 0, archived: 0 }
      ),
    [messages]
  );

  const loadInbox = async (activeSession = session) => {
    if (!activeSession?.access_token) return;

    const config = getSupabaseConfigStatus();
    if (!config.configured) {
      setError(`${t('admin.configError')} ${config.missing.join(', ')}`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const inboxData = await fetchContactMessages(activeSession.access_token);
      setProfile(activeSession.admin_profile || activeSession.user || null);
      setMessages(inboxData || []);
    } catch (err) {
      if (err.status === 401) {
        clearAdminSession();
        setSession(null);
        setProfile(null);
      }
      setError(getAdminErrorMessage(err, t));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      loadInbox(session);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');

    const config = getSupabaseConfigStatus();
    if (!config.configured) {
      setLoginError(`${t('admin.configError')} ${config.missing.join(', ')}`);
      return;
    }

    const loginRateKey = getLoginRateKey(loginForm.email);
    const limitStatus = getRateLimitStatus(loginRateKey, 5, 15 * 60 * 1000);
    if (limitStatus.limited) {
      setLoginError(
        `${t('admin.tooManyAttempts')} ${formatRetryTime(limitStatus.retryAfterMs, lang)}.`
      );
      return;
    }

    setLoginLoading(true);

    try {
      const nextSession = await loginAdmin(loginForm.email, loginForm.password);
      clearRateLimit(loginRateKey);
      saveAdminSession(nextSession);
      setSession(nextSession);
      setProfile(nextSession.admin_profile);
      setLoginForm({ email: '', password: '' });
    } catch (err) {
      const nextLimit = recordRateLimitAttempt(loginRateKey, 5, 15 * 60 * 1000);
      if (nextLimit.limited) {
        setLoginError(
          `${t('admin.tooManyAttempts')} ${formatRetryTime(nextLimit.retryAfterMs, lang)}.`
        );
      } else {
        setLoginError(getAdminErrorMessage(err, t));
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setSession(null);
    setProfile(null);
    setMessages([]);
  };

  const handleStatusUpdate = async (messageId, status) => {
    setBusyId(`${messageId}:${status}`);
    setError('');

    try {
      const updatedMessages = await updateMessageStatus(messageId, status, session.access_token);
      const updatedMessage = updatedMessages?.[0];

      if (updatedMessage) {
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === messageId ? { ...message, ...updatedMessage } : message
          )
        );
      }
    } catch {
      setError(t('admin.actionError'));
    } finally {
      setBusyId('');
    }
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm(t('admin.confirmDelete'))) return;

    setBusyId(`${messageId}:delete`);
    setError('');

    try {
      await deleteContactMessage(messageId, session.access_token);
      setMessages((currentMessages) => currentMessages.filter((message) => message.id !== messageId));
    } catch {
      setError(t('admin.actionError'));
    } finally {
      setBusyId('');
    }
  };

  if (!session) {
    return (
      <main className="relative min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white">
        <div className="absolute right-6 top-6 z-20 flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLanguage}
            className="text-[11px] font-bold tracking-wider text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          >
            {lang === 'en' ? 'العربية' : 'ENGLISH'}
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-800 dark:bg-black dark:text-zinc-400 dark:hover:border-white dark:hover:text-white"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
          </button>
        </div>

        <section className="flex min-h-screen items-center justify-center px-6 py-24 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-black md:grid-cols-2"
          >
            <form onSubmit={handleLogin} className="p-6 sm:p-8 md:p-10">
              <button
                type="button"
                onClick={() => window.location.assign('/')}
                className="mb-10 flex h-8 w-8 items-center justify-center transition-opacity hover:opacity-70"
                aria-label={t('name')}
              >
                <img
                  src="/black-circle.svg"
                  alt=""
                  className="h-8 w-8 dark:invert"
                  aria-hidden="true"
                />
              </button>

              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                {t('admin.loginTitle')}
              </h1>
              <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {t('admin.loginSubtitle')}
              </p>

              <div className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="admin-email"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                  >
                    {t('admin.email')}
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    value={loginForm.email}
                    onChange={(event) =>
                      setLoginForm((current) => ({ ...current, email: event.target.value }))
                    }
                    required
                    autoComplete="email"
                    dir="ltr"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-left text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:bg-black dark:text-white dark:focus:border-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="admin-password"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                  >
                    {t('admin.password')}
                  </label>
                  <div className="relative">
                    <input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginForm.password}
                      onChange={(event) =>
                        setLoginForm((current) => ({ ...current, password: event.target.value }))
                      }
                      required
                      autoComplete="current-password"
                      dir="ltr"
                      className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 pe-11 text-left text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:bg-black dark:text-white dark:focus:border-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute inset-y-0 end-3 flex items-center text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white"
                      aria-label={showPassword ? t('admin.hidePassword') : t('admin.showPassword')}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-4 w-4" />
                      ) : (
                        <FaEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {loginError && (
                <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <FaSignInAlt className="h-3.5 w-3.5" />
                {loginLoading ? t('admin.signingIn') : t('admin.signIn')}
              </button>
            </form>

            <div className="relative hidden min-h-[620px] overflow-hidden bg-black md:block">
              <img
                src={loginImage}
                alt={t('admin.loginImageAlt')}
                className="absolute inset-0 h-full w-full object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-black/10 to-transparent" />
            </div>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white">
      <header className="sticky top-0 z-40 h-16 border-b border-zinc-100 bg-white/85 backdrop-blur-md dark:border-zinc-900 dark:bg-black/85">
        <div className="container mx-auto flex h-full max-w-6xl items-center justify-between px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {t('admin.dashboard')}
            </p>
            <h1 className="text-sm font-bold text-zinc-900 dark:text-white">{t('admin.title')}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="hidden text-[11px] font-bold tracking-wider text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white sm:block"
            >
              {lang === 'en' ? 'العربية' : 'ENGLISH'}
            </button>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-white dark:hover:text-white"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => loadInbox()}
              disabled={loading}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-zinc-900 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-white dark:hover:text-white"
              title={t('admin.refresh')}
            >
              <FaSyncAlt className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-white dark:hover:text-white"
            >
              <FaSignOutAlt className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{t('admin.logout')}</span>
            </button>
          </div>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {profile?.display_name || profile?.email}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {t('admin.inbox')}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex">
            {statusOptions.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`rounded-lg border px-4 py-2 text-xs font-semibold transition-colors ${
                  filter === status
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black'
                    : 'border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-white dark:hover:text-white'
                }`}
              >
                {t(`admin.filters.${status}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { key: 'total', icon: FaInbox },
            { key: 'new', icon: FaInbox },
            { key: 'read', icon: FaEnvelopeOpen },
            { key: 'archived', icon: FaArchive },
          ].map((item) => (
            <div
              key={item.key}
              className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {t(`admin.stats.${item.key}`)}
                </p>
                <item.icon className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
              </div>
              <p className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
                {stats[item.key] || 0}
              </p>
            </div>
          ))}
        </div>

        {error && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </p>
        )}

        <div className="space-y-4">
          {loading && !messages.length ? (
            <div className="rounded-lg border border-zinc-200 p-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              {t('admin.loading')}
            </div>
          ) : visibleMessages.length ? (
            visibleMessages.map((message) => (
              <article
                key={message.id}
                className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${getStatusClass(
                          message.status
                        )}`}
                      >
                        {t(`admin.status.${message.status}`)}
                      </span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {formatDate(message.created_at, lang)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {message.subject}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                      {message.name} · {message.email}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`mailto:${message.email}?subject=${encodeURIComponent(
                        `Re: ${message.subject}`
                      )}`}
                      className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-950 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-white dark:hover:text-white"
                    >
                      <FaReply className="h-3.5 w-3.5" />
                      {t('admin.reply')}
                    </a>
                    {message.status !== 'read' && (
                      <button
                        type="button"
                        onClick={() => handleStatusUpdate(message.id, 'read')}
                        disabled={busyId === `${message.id}:read`}
                        className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-white dark:hover:text-white"
                      >
                        <FaEnvelopeOpen className="h-3.5 w-3.5" />
                        {t('admin.markRead')}
                      </button>
                    )}
                    {message.status !== 'archived' && (
                      <button
                        type="button"
                        onClick={() => handleStatusUpdate(message.id, 'archived')}
                        disabled={busyId === `${message.id}:archived`}
                        className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-white dark:hover:text-white"
                      >
                        <FaArchive className="h-3.5 w-3.5" />
                        {t('admin.archive')}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(message.id)}
                      disabled={busyId === `${message.id}:delete`}
                      className="flex h-9 items-center gap-2 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-600 transition-colors hover:border-red-600 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-950 dark:text-red-300 dark:hover:border-red-500 dark:hover:text-red-200"
                    >
                      <FaTrash className="h-3.5 w-3.5" />
                      {t('admin.delete')}
                    </button>
                  </div>
                </div>

                <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                  {message.message}
                </p>
              </article>
            ))
          ) : (
            <div className="rounded-lg border border-zinc-200 p-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              {t('admin.noMessages')}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
