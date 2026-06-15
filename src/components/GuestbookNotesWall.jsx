import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { getSupabaseClient, getSupabaseConfigStatus } from '../lib/supabaseApi';

const MAX_NOTE_CHARS = 100;
const DEFAULT_NOTE_COLOR = '#FEF08A';
const NOTE_ROTATIONS = [-2.5, 1.8, -1.4, 2.4, -0.8];

const NOTE_COLORS = [
  { key: 'yellow', hex: '#FEF08A' },
  { key: 'pink', hex: '#FBCFE8' },
  { key: 'blue', hex: '#BFDBFE' },
  { key: 'green', hex: '#BBF7D0' },
];

const selectColumns = 'id,content,color,x_position,y_position,created_at';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizeNote = (note) => ({
  id: note.id,
  content: note.content || '',
  color: NOTE_COLORS.some((item) => item.hex === note.color) ? note.color : DEFAULT_NOTE_COLOR,
  x_position: Number(note.x_position) || 24,
  y_position: Number(note.y_position) || 24,
  created_at: note.created_at,
});

const upsertNote = (notes, incomingNote) => {
  const normalized = normalizeNote(incomingNote);
  const exists = notes.some((note) => note.id === normalized.id);
  const nextNotes = exists
    ? notes.map((note) => (note.id === normalized.id ? normalized : note))
    : [...notes, normalized];

  return nextNotes.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
};

const StickyNote = ({ note, index, wallRef, onMove }) => {
  const x = useMotionValue(note.x_position);
  const y = useMotionValue(note.y_position);
  const rotation = NOTE_ROTATIONS[index % NOTE_ROTATIONS.length];

  useEffect(() => {
    x.set(note.x_position);
    y.set(note.y_position);
  }, [note.x_position, note.y_position, x, y]);

  const handleDragEnd = (event) => {
    const wall = wallRef.current;
    const target = event.currentTarget;

    if (!wall || !target) return;

    const wallRect = wall.getBoundingClientRect();
    const noteRect = target.getBoundingClientRect();
    const nextX = clamp(noteRect.left - wallRect.left, 8, Math.max(8, wallRect.width - noteRect.width - 8));
    const nextY = clamp(noteRect.top - wallRect.top, 8, Math.max(8, wallRect.height - noteRect.height - 8));

    x.set(nextX);
    y.set(nextY);
    onMove(note.id, nextX, nextY);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={wallRef}
      initial={{ scale: 0, rotate: -6 }}
      animate={{ scale: 1, rotate: rotation }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      whileDrag={{ scale: 1.04, rotate: 0, zIndex: 30 }}
      onDragEnd={handleDragEnd}
      onDoubleClick={(event) => event.stopPropagation()}
      className="absolute left-0 top-0 z-10 h-40 w-40 cursor-grab select-none overflow-hidden rounded-[6px] p-4 shadow-lg active:cursor-grabbing sm:h-44 sm:w-44"
      style={{ x, y, backgroundColor: note.color }}
    >
      <p className="relative z-10 h-full whitespace-pre-wrap break-words text-sm font-semibold leading-5 text-zinc-800">
        {note.content}
      </p>
      <span className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 bg-black/10 [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
    </motion.div>
  );
};

const GuestbookNotesWall = () => {
  const { t } = useLanguage();
  const wallRef = useRef(null);
  const [notes, setNotes] = useState([]);
  const [composer, setComposer] = useState(null);
  const [draft, setDraft] = useState({ content: '', color: DEFAULT_NOTE_COLOR });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [realtimeReady, setRealtimeReady] = useState(false);
  const [messageKey, setMessageKey] = useState('');

  useEffect(() => {
    const config = getSupabaseConfigStatus();

    if (!config.configured) {
      setLoading(false);
      setMessageKey('guestbook.configError');
      return undefined;
    }

    let isMounted = true;
    const supabase = getSupabaseClient();

    const fetchNotes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('guestbook_notes')
        .select(selectColumns)
        .order('created_at', { ascending: true });

      if (!isMounted) return;

      if (error) {
        setMessageKey('guestbook.loadError');
        setLoading(false);
        return;
      }

      setNotes((data || []).map(normalizeNote));
      setMessageKey('');
      setLoading(false);
    };

    fetchNotes();

    const channel = supabase
      .channel('guestbook_notes_wall')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'guestbook_notes' },
        (payload) => {
          setNotes((currentNotes) => upsertNote(currentNotes, payload.new));
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'guestbook_notes' },
        (payload) => {
          setNotes((currentNotes) => upsertNote(currentNotes, payload.new));
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setRealtimeReady(true);
        }
      });

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const handleCanvasDoubleClick = (event) => {
    if (event.target !== event.currentTarget) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const formWidth = Math.min(288, rect.width - 32);
    const formHeight = 260;
    const x = clamp(event.clientX - rect.left, 16, Math.max(16, rect.width - formWidth - 16));
    const y = clamp(event.clientY - rect.top, 16, Math.max(16, rect.height - formHeight - 16));

    setComposer({ x, y });
    setDraft({ content: '', color: DEFAULT_NOTE_COLOR });
    setMessageKey('');
  };

  const handlePostNote = async (event) => {
    event.preventDefault();

    const content = draft.content.trim();
    if (!composer || !content) {
      setMessageKey('guestbook.validation.required');
      return;
    }

    setSubmitting(true);
    setMessageKey('');

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('guestbook_notes')
        .insert({
          content: content.slice(0, MAX_NOTE_CHARS),
          color: draft.color,
          x_position: composer.x,
          y_position: composer.y,
        })
        .select(selectColumns)
        .single();

      if (error) throw error;

      setNotes((currentNotes) => upsertNote(currentNotes, data));
      setComposer(null);
      setDraft({ content: '', color: DEFAULT_NOTE_COLOR });
    } catch {
      setMessageKey('guestbook.postError');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMoveNote = async (id, xPosition, yPosition) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id ? { ...note, x_position: xPosition, y_position: yPosition } : note
      )
    );

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from('guestbook_notes')
        .update({ x_position: xPosition, y_position: yPosition })
        .eq('id', id);

      if (error) throw error;
      setMessageKey('');
    } catch {
      setMessageKey('guestbook.updateError');
    }
  };

  return (
    <section
      id="guestbook"
      className="min-h-screen bg-zinc-50 py-24 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white sm:py-28"
    >
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('guestbook.eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white sm:text-4xl">
              {t('guestbook.title')}
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:text-base">
              {t('guestbook.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.14)]" />
            {realtimeReady ? t('guestbook.live') : t('guestbook.connecting')}
          </div>
        </div>

        <div
          ref={wallRef}
          onDoubleClick={handleCanvasDoubleClick}
          aria-label={t('guestbook.canvasLabel')}
          className="relative min-h-[620px] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(113,113,122,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(113,113,122,0.12)_1px,transparent_1px)] bg-[size:32px_32px]" />

          {loading && (
            <div className="absolute inset-0 z-20 grid place-items-center bg-white/80 text-sm font-medium text-zinc-500 backdrop-blur-sm dark:bg-zinc-900/80 dark:text-zinc-400">
              {t('guestbook.loading')}
            </div>
          )}

          {!loading && notes.length === 0 && (
            <div className="pointer-events-none absolute inset-0 z-0 grid place-items-center px-6 text-center">
              <p className="max-w-sm text-sm font-medium leading-6 text-zinc-400 dark:text-zinc-500">
                {t('guestbook.empty')}
              </p>
            </div>
          )}

          <AnimatePresence>
            {notes.map((note, index) => (
              <StickyNote
                key={note.id}
                note={note}
                index={index}
                wallRef={wallRef}
                onMove={handleMoveNote}
              />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {composer && (
              <motion.form
                initial={{ opacity: 0, scale: 0.92, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                onSubmit={handlePostNote}
                onDoubleClick={(event) => event.stopPropagation()}
                className="absolute z-40 w-72 rounded-lg border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-950"
                style={{ left: composer.x, top: composer.y }}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <label htmlFor="guestbook-note" className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {t('guestbook.form.message')}
                  </label>
                  <button
                    type="button"
                    onClick={() => setComposer(null)}
                    className="grid h-8 w-8 place-items-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                    aria-label={t('guestbook.form.cancel')}
                    title={t('guestbook.form.cancel')}
                  >
                    <FaTimes className="h-3.5 w-3.5" />
                  </button>
                </div>

                <textarea
                  id="guestbook-note"
                  value={draft.content}
                  maxLength={MAX_NOTE_CHARS}
                  onChange={(event) =>
                    setDraft((currentDraft) => ({ ...currentDraft, content: event.target.value }))
                  }
                  placeholder={t('guestbook.form.placeholder')}
                  className="h-24 w-full resize-none rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-5 text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
                />

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2" aria-label={t('guestbook.form.color')}>
                    {NOTE_COLORS.map((color) => {
                      const selected = draft.color === color.hex;

                      return (
                        <button
                          key={color.key}
                          type="button"
                          onClick={() => setDraft((currentDraft) => ({ ...currentDraft, color: color.hex }))}
                          className={`h-7 w-7 rounded-full border border-black/10 transition ${
                            selected ? 'ring-2 ring-zinc-950 ring-offset-2 dark:ring-white dark:ring-offset-zinc-950' : ''
                          }`}
                          style={{ backgroundColor: color.hex }}
                          aria-label={t(`guestbook.colors.${color.key}`)}
                          title={t(`guestbook.colors.${color.key}`)}
                        />
                      );
                    })}
                  </div>

                  <span className="text-xs font-medium text-zinc-400">
                    {draft.content.length}/{MAX_NOTE_CHARS}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={submitting || draft.content.trim().length === 0}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  <FaPaperPlane className="h-3.5 w-3.5" />
                  {submitting ? t('guestbook.form.posting') : t('guestbook.form.post')}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {messageKey && (
            <div className="absolute bottom-4 left-4 right-4 z-40 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100 sm:left-auto sm:max-w-md">
              {t(messageKey)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GuestbookNotesWall;
