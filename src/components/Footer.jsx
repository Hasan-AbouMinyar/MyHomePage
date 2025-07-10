import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gradient-to-br from-dark-start via-dark-mid to-dark-end text-gray-600 dark:text-gray-400 py-8">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} Hasan Abouminyar. All rights reserved.</p>
        <p className="text-sm mt-2">Built with React, Tailwind CSS, and a touch of magic ✨</p>
      </div>
    </footer>
  );
};

export default Footer;
