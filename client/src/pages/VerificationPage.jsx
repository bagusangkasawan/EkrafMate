import React, { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateVerificationStatus } from '../redux/slices/authSlice';

const VerificationPage = ({ success }) => {
    const { token } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        // Jika dari redirect setelah sukses, update state Redux
        if (success || location.pathname.includes('success')) {
            dispatch(updateVerificationStatus(true));
        }
    }, [success, location, dispatch]);

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20">
                <CheckCircle className="h-20 w-20 text-green-500" />
                <h1 className="text-3xl font-bold mt-4">Verifikasi Berhasil!</h1>
                <p className="mt-2 text-gray-600">Akun Anda telah berhasil diverifikasi. Anda sekarang memiliki akses penuh.</p>
                <Link to="/login" className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">
                    Lanjutkan ke Login
                </Link>
            </div>
        );
    }
    
    // Placeholder untuk halaman yang akan menangani API call jika diperlukan
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <XCircle className="h-20 w-20 text-red-500" />
        <h1 className="text-3xl font-bold mt-4">Verifikasi Gagal</h1>
        <p className="mt-2 text-gray-600">Link verifikasi tidak valid atau sudah kedaluwarsa.</p>
        <Link to="/" className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">
            Kembali ke Beranda
        </Link>
      </div>
    );
};

export default VerificationPage;
