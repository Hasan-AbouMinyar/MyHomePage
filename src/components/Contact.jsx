import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  const contacts = [
    { name: "Phone", value: "+218 0924214929", icon: FaPhone, href: "tel:+218924214929" },
    { name: "Email", value: "h.abouminyar@gmail.com", icon: FaEnvelope, href: "mailto:h.abouminyar@gmail.com" },
    { name: "Facebook", value: "Hasan Abouminyar", icon: FaFacebook, href: "https://www.facebook.com/aboumniyar" },
    { name: "LinkedIn", value: "Hasan Abouminyar", icon: FaLinkedin, href: "https://www.linkedin.com/in/hasan-abouminyar-8b552b248/" },
    { name: "GitHub", value: "Hasan-AbouMinyar", icon: FaGithub, href: "https://github.com/Hasan-AbouMinyar" }
  ];

  return (
    <section id="contact" className="min-h-screen bg-[#f5f5f7] dark:bg-black py-24 sm:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {t('contact.subtitle')}
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-center">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.name}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <contact.icon className="text-4xl text-zinc-700 dark:text-zinc-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                {t(`contact.labels.${contact.name}`)}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">{contact.value}</p>
              <span className="text-blue-600 dark:text-blue-400 hover:underline">
                {t('contact.connect')}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
