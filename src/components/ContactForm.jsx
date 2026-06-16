import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { createContactMessage, isSupabaseConfigured } from '../lib/supabaseApi';
import {
  formatRetryTime,
  getContactRateKeys,
  getRateLimitStatus,
  hasAbusiveRepetition,
  hasBlockedLink,
  hasUnsafeContent,
  normalizeText,
  recordRateLimitAttempt,
} from '../lib/security';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

const ContactForm = () => {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const fieldClass =
    'w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:bg-black dark:text-white dark:focus:border-white sm:text-sm';

  const labelClass =
    'mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const name = normalizeText(form.name);
    const subject = normalizeText(form.subject);
    const message = normalizeText(form.message);

    if (name.length < 2) return t('contact.form.validation.name');
    if (!emailPattern.test(form.email.trim())) return t('contact.form.validation.email');
    if (subject.length < 3) return t('contact.form.validation.subject');
    if (message.length < 10) return t('contact.form.validation.message');
    if (hasBlockedLink(name, subject, message)) return t('contact.form.validation.links');
    if (hasUnsafeContent(name, subject, message)) return t('contact.form.validation.unsafe');
    if (hasAbusiveRepetition(name, subject, message)) return t('contact.form.validation.repeated');

    return '';
  };

  const getSubmitLimitError = () => {
    const keys = getContactRateKeys(form.email);
    const globalLimit = getRateLimitStatus(keys.global, 3, 10 * 60 * 1000);
    const emailLimit = getRateLimitStatus(keys.email, 2, 30 * 60 * 1000);
    const activeLimit = globalLimit.limited ? globalLimit : emailLimit;

    if (!activeLimit.limited) return '';
    return `${t('contact.form.validation.rateLimit')} ${formatRetryTime(
      activeLimit.retryAfterMs,
      lang
    )}.`;
  };

  const mapSubmitError = (error) => {
    const message = `${error?.message || ''}`.toLowerCase();

    if (message.includes('blocked_links')) return t('contact.form.validation.links');
    if (message.includes('blocked_unsafe_content')) return t('contact.form.validation.unsafe');
    if (message.includes('blocked_repetition')) return t('contact.form.validation.repeated');
    if (message.includes('rate_limited')) return t('contact.form.validation.rateLimit');
    if (message.includes('duplicate_message')) return t('contact.form.validation.duplicate');

    return t('contact.form.error');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });

    if (form.website) {
      setForm(initialForm);
      setStatus({ type: 'success', message: t('contact.form.success') });
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }

    const limitError = getSubmitLimitError();
    if (limitError) {
      setStatus({ type: 'error', message: limitError });
      return;
    }

    if (!isSupabaseConfigured()) {
      setStatus({ type: 'error', message: t('contact.form.configError') });
      return;
    }

    setIsSubmitting(true);

    try {
      await createContactMessage(form);
      const keys = getContactRateKeys(form.email);
      recordRateLimitAttempt(keys.global, 3, 10 * 60 * 1000);
      recordRateLimitAttempt(keys.email, 2, 30 * 60 * 1000);
      setForm(initialForm);
      setStatus({ type: 'success', message: t('contact.form.success') });
    } catch (err) {
      setStatus({ type: 'error', message: mapSubmitError(err) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 sm:p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            {t('contact.form.name')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={120}
            autoComplete="name"
            placeholder={t('contact.form.namePlaceholder')}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {t('contact.form.email')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            maxLength={180}
            autoComplete="email"
            placeholder={t('contact.form.emailPlaceholder')}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-subject" className={labelClass}>
          {t('contact.form.subject')}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={180}
          placeholder={t('contact.form.subjectPlaceholder')}
          className={fieldClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className={labelClass}>
          {t('contact.form.message')}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder={t('contact.form.messagePlaceholder')}
          className={`${fieldClass} resize-none leading-6`}
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status.message && (
        <p
          className={`mt-5 rounded-lg border px-4 py-3 text-sm ${
            status.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-300'
              : 'border-red-200 bg-red-50 text-red-700 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300'
          }`}
          aria-live="polite"
        >
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        <FaPaperPlane className="h-3.5 w-3.5" />
        {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
      </button>
    </form>
  );
};

export default ContactForm;
