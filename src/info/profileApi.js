import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabaseApi';

export const fallbackProfile = {
  full_name: 'Hasan Abouminyar',
  headline: 'Backend Developer & ERP Systems Engineer',
  bio: 'أبني أنظمة موثوقة وقابلة للتوسع، من المنتجات الرقمية إلى حلول ERP وواجهات API.',
  website_url: 'https://abouminyar.ly',
  email: 'h.abouminyar@gmail.com',
  whatsapp_url: 'https://wa.me/218924214929',
  location: 'Libya',
  links: [
    { label: 'الموقع الرسمي', url: 'https://abouminyar.ly', kind: 'website', featured: true },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/hasan-abouminyar-8b552b248/', kind: 'linkedin', featured: true },
    { label: 'GitHub', url: 'https://github.com/Hasan-AbouMinyar', kind: 'github', featured: true },
    { label: 'Instagram', url: 'https://www.instagram.com/_.abouminyar._/', kind: 'instagram', featured: false },
    { label: 'Facebook', url: 'https://www.facebook.com/abouminyar/', kind: 'facebook', featured: false },
    { label: 'TikTok', url: 'https://www.tiktok.com/@abouminyar', kind: 'tiktok', featured: false },
    { label: 'YouTube', url: 'https://www.youtube.com/@abouminyar', kind: 'youtube', featured: false },
    { label: 'Snapchat', url: 'https://snapchat.com/t/nMh6n7My', kind: 'snapchat', featured: false },
  ],
};

const cleanLinks = (links) =>
  Array.isArray(links)
    ? links.filter((link) => link && typeof link.url === 'string' && /^https?:\/\//.test(link.url))
    : fallbackProfile.links;

export async function fetchPublicProfile() {
  if (!isSupabaseConfigured()) return fallbackProfile;

  const { data, error } = await getSupabaseClient()
    .from('public_profile')
    .select('full_name, headline, bio, website_url, email, whatsapp_url, location, links')
    .eq('id', 'primary')
    .maybeSingle();

  if (error || !data) return fallbackProfile;
  return { ...fallbackProfile, ...data, links: cleanLinks(data.links) };
}
