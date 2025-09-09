import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} EkrafMate. Dibuat untuk menghubungkan talenta kreatif Indonesia.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
