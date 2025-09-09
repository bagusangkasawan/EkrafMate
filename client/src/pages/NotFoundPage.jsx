import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-128px)]">
      <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-4">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-600 mt-2">Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <Link to="/" className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;
