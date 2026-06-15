-- Supabase schema for portfolio contact form + Supabase Auth dashboard.
-- Run this single file in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 120),
  email text not null check (
    char_length(email) <= 180
    and email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'
  ),
  subject text not null check (char_length(btrim(subject)) between 3 and 180),
  message text not null check (char_length(btrim(message)) between 10 and 4000),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  source text not null default 'portfolio',
  user_agent text,
  client_fingerprint text,
  created_at timestamptz not null default now(),
  read_at timestamptz,
  archived_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.contact_messages
  add column if not exists client_fingerprint text;

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

create index if not exists contact_messages_status_idx
  on public.contact_messages (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_contact_messages_updated_at on public.contact_messages;
create trigger set_contact_messages_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();

create or replace function public.validate_contact_message()
returns trigger
language plpgsql
as $$
declare
  text_content text;
  email_count integer;
  fingerprint_count integer;
  duplicate_count integer;
begin
  new.name = btrim(new.name);
  new.email = lower(btrim(new.email));
  new.subject = btrim(new.subject);
  new.message = btrim(new.message);
  new.source = coalesce(nullif(btrim(new.source), ''), 'portfolio');
  new.user_agent = nullif(left(coalesce(new.user_agent, ''), 500), '');
  new.client_fingerprint = nullif(left(coalesce(new.client_fingerprint, ''), 120), '');

  text_content = lower(concat_ws(' ', new.name, new.subject, new.message));

  if text_content ~ '(<[^>]+>|javascript:|vbscript:|data:text/html|onerror[[:space:]]*=|onload[[:space:]]*=|onclick[[:space:]]*=|<script|</script)' then
    raise exception 'blocked_unsafe_content' using errcode = 'P0001';
  end if;

  if text_content ~ '(https?://|www\.|[a-z0-9.-]+\.(com|net|org|io|co|ly|ru|cn|xyz|top|info|biz|online|site|shop)(/|[[:space:]]|$))' then
    raise exception 'blocked_links' using errcode = 'P0001';
  end if;

  if new.message ~ '(.)\1{13,}' then
    raise exception 'blocked_repetition' using errcode = 'P0001';
  end if;

  select count(*)
    into duplicate_count
    from public.contact_messages
   where lower(email) = new.email
     and lower(subject) = lower(new.subject)
     and lower(message) = lower(new.message)
     and created_at > now() - interval '24 hours';

  if duplicate_count > 0 then
    raise exception 'duplicate_message' using errcode = 'P0001';
  end if;

  select count(*)
    into email_count
    from public.contact_messages
   where lower(email) = new.email
     and created_at > now() - interval '30 minutes';

  if email_count >= 2 then
    raise exception 'rate_limited_email' using errcode = 'P0001';
  end if;

  if new.client_fingerprint is not null then
    select count(*)
      into fingerprint_count
      from public.contact_messages
     where client_fingerprint = new.client_fingerprint
       and created_at > now() - interval '10 minutes';

    if fingerprint_count >= 3 then
      raise exception 'rate_limited_client' using errcode = 'P0001';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists validate_contact_messages_before_insert on public.contact_messages;
create trigger validate_contact_messages_before_insert
before insert on public.contact_messages
for each row execute function public.validate_contact_message();

alter table public.contact_messages enable row level security;

drop policy if exists "contact_messages_insert_public" on public.contact_messages;
create policy "contact_messages_insert_public"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "contact_messages_select_authenticated" on public.contact_messages;
create policy "contact_messages_select_authenticated"
on public.contact_messages
for select
to authenticated
using (true);

drop policy if exists "contact_messages_update_authenticated" on public.contact_messages;
create policy "contact_messages_update_authenticated"
on public.contact_messages
for update
to authenticated
using (true)
with check (true);

drop policy if exists "contact_messages_delete_authenticated" on public.contact_messages;
create policy "contact_messages_delete_authenticated"
on public.contact_messages
for delete
to authenticated
using (true);

grant usage on schema public to anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
