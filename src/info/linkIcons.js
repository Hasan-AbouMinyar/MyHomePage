import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLink,
  FaLinkedinIn,
  FaPinterestP,
  FaSnapchat,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

export const linkIconOptions = [
  ['website', 'موقع إلكتروني', FaGlobe],
  ['linkedin', 'LinkedIn', FaLinkedinIn],
  ['github', 'GitHub', FaGithub],
  ['instagram', 'Instagram', FaInstagram],
  ['facebook', 'Facebook', FaFacebookF],
  ['tiktok', 'TikTok', FaTiktok],
  ['youtube', 'YouTube', FaYoutube],
  ['snapchat', 'Snapchat', FaSnapchat],
  ['whatsapp', 'WhatsApp', FaWhatsapp],
  ['telegram', 'Telegram', FaTelegram],
  ['x', 'X / Twitter', FaXTwitter],
  ['discord', 'Discord', FaDiscord],
  ['pinterest', 'Pinterest', FaPinterestP],
  ['link', 'رابط عام', FaLink],
];

export const iconFor = Object.fromEntries(linkIconOptions.map(([kind, , Icon]) => [kind, Icon]));
