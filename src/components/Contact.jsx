import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  const contacts = [
    { name: "WhatsApp", value: "+218 92 421 4929", icon: FaWhatsapp, href: "https://wa.me/218924214929" },
    { name: "Email", value: "h.abouminyar@gmail.com", icon: FaEnvelope, href: "mailto:h.abouminyar@gmail.com" },
    { name: "Facebook", value: "Hasan Abouminyar", icon: FaFacebook, href: "https://www.facebook.com/aboumniyar" },
    { name: "LinkedIn", value: "Hasan Abouminyar", icon: FaLinkedin, href: "https://www.linkedin.com/in/hasan-abouminyar-8b552b248/" },
    { name: "GitHub", value: "Hasan-AbouMinyar", icon: FaGithub, href: "https://github.com/Hasan-AbouMinyar" }
  ];

  return (
    <section id="contact" className="min-h-screen bg-white dark:bg-black py-24 sm:py-32 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 lg:px-8 max-w-6xl"
      >
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            {t('contact.subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center max-w-5xl mx-auto">
          {contacts.map((contact) => (
            <a
              key={contact.name}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center group block select-none"
            >
              <contact.icon className="text-3xl text-zinc-400 dark:text-zinc-650 mx-auto mb-5 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-250" />
              <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2">
                {t(`contact.labels.${contact.name}`)}
              </h3>
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mb-3">{contact.value}</p>
              <span className="text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-white underline transition-colors duration-250 uppercase">
                {t('contact.connect')}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
