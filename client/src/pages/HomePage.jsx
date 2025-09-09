import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Zap } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Temukan <span className="text-indigo-600">Peluang</span>,
          Wujudkan <span className="text-indigo-600">Karya</span>.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          EkrafMate adalah jembatan antara talenta kreatif paling berbakat di Indonesia dengan proyek-proyek inovatif yang menunggu untuk direalisasikan.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/search" className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 shadow-lg transform hover:scale-105 transition-transform duration-300">
            Cari Talenta
          </Link>
          <Link to="/projects" className="bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transform hover:scale-105 transition-transform duration-300">
            Lihat Proyek
          </Link>
        </div>
      </div>

      <div className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Kenapa Memilih EkrafMate?</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center items-center mx-auto w-16 h-16 bg-indigo-100 rounded-full">
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Pencocokan Cerdas</h3>
              <p className="mt-2 text-gray-600">
                Teknologi AI kami memahami kebutuhan Anda, mencocokkan proyek dengan talenta yang paling relevan.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center items-center mx-auto w-16 h-16 bg-indigo-100 rounded-full">
                <Briefcase className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Proyek Berkualitas</h3>
              <p className="mt-2 text-gray-600">
                Temukan beragam proyek dari startup hingga korporasi besar yang terverifikasi dan siap dikerjakan.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="flex justify-center items-center mx-auto w-16 h-16 bg-indigo-100 rounded-full">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-800">Komunitas Terkurasi</h3>
              <p className="mt-2 text-gray-600">
                Bergabunglah dengan jaringan profesional kreatif yang saling mendukung dan bertumbuh bersama.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
