import { useEffect, useMemo, useState } from 'react';
import {
  FaArrowUpRightFromSquare,
  FaArrowDown,
  FaEnvelope,
  FaGlobe,
  FaMoon,
  FaSun,
  FaWhatsapp,
} from 'react-icons/fa6';
import { fetchPublicProfile, fallbackProfile } from './profileApi';
import { iconFor } from './linkIcons';
import GravityTrail from './GravityTrail';

function InfoApp() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [dark, setDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true);

  useEffect(() => {
    document.documentElement.classList.toggle('info-dark', dark);
  }, [dark]);

  useEffect(() => {
    fetchPublicProfile().then(setProfile).catch(() => setProfile(fallbackProfile));
  }, []);

  const socialLinks = useMemo(() => profile.links.filter((link) => link.kind !== 'website'), [profile.links]);

  return (
    <main className="info-page" dir="rtl">
      <GravityTrail />
      <div className="info-noise" />
      <section className="info-shell">
        <header className="info-header">
          <a className="info-mark" href={profile.website_url} aria-label="الموقع الرسمي"><span className="mark-dot" />HA<span>.</span></a>
          <button className="theme-button" type="button" onClick={() => setDark((current) => !current)} aria-label="تبديل المظهر">
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </header>

        <div className="identity-card bento-card reveal-up">
          <div className="identity-aurora" />
          <div className="identity-copy">
            <div className="eyebrow"><span className="status-dot" /> متاح للتعاون والمشاريع</div>
            <h1>{profile.full_name}</h1>
            <p className="headline">{profile.headline}</p>
            <p className="bio">{profile.bio}</p>
            <div className="identity-meta"><span>{profile.location}</span><span>•</span><span>Digital Card</span></div>
          </div>
          <FaArrowDown className="scroll-cue" />
        </div>

        <div className="action-grid reveal-up delay-one">
          <a className="action-card primary" href={profile.website_url} target="_blank" rel="noreferrer"><FaGlobe /><span><small>Portfolio · Case studies</small>اكتشف موقعي الرسمي</span><FaArrowUpRightFromSquare className="arrow" /></a>
          <a className="action-card" href={`mailto:${profile.email}`}><FaEnvelope /><span><small>راسلني مباشرة</small>{profile.email}</span><FaArrowUpRightFromSquare className="mini-arrow" /></a>
          <a className="action-card whatsapp" href={profile.whatsapp_url} target="_blank" rel="noreferrer"><FaWhatsapp /><span><small>متواجد للرد</small>WhatsApp</span><FaArrowUpRightFromSquare className="mini-arrow" /></a>
        </div>

        <section className="social-card bento-card reveal-up delay-two">
          <div className="section-title"><div><span className="section-overline">FOLLOW THE WORK</span><h2>روابط ومنصات التواصل</h2></div><span className="platform-count">{socialLinks.length.toString().padStart(2, '0')} منصة</span></div>
          <div className="social-grid">
            {socialLinks.map((link) => {
              const Icon = iconFor[link.kind] || FaGlobe;
              return <a key={link.url} className="social-link" href={link.url} target="_blank" rel="noreferrer"><Icon /><span>{link.label}</span><FaArrowUpRightFromSquare /></a>;
            })}
          </div>
        </section>
        <footer><span>© {new Date().getFullYear()} {profile.full_name}</span><span>صُممت بعناية في ليبيا</span></footer>
      </section>
    </main>
  );
}

export default InfoApp;
