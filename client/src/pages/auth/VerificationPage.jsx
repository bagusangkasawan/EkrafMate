import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserProfileInfo } from '../../redux/slices/authSlice';

const VerificationPage = () => {
    const { token } = useParams();
    const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const verificationHasRun = useRef(false);

    useEffect(() => {
        const verifyToken = async () => {
            if (!token) {
                setStatus('error');
                setMessage('Token verifikasi tidak ditemukan.');
                return;
            }

            try {
                const API_URL = import.meta.env.VITE_API_URL || '';
                const res = await fetch(`${API_URL}/api/auth/verify/${token}`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Terjadi kesalahan saat verifikasi.');
                }

                dispatch(updateUserProfileInfo(data));
                setStatus('success');
                setMessage(data.message);

                // Arahkan pengguna ke halaman pengaturan profil setelah 3 detik
                setTimeout(() => {
                    navigate('/');
                }, 3000);

            } catch (error) {
                setStatus('error');
                setMessage(error.message);
            }
        };
        
        if (!verificationHasRun.current) {
            verificationHasRun.current = true;
            verifyToken();
        }

    }, [token, dispatch, navigate]);

    if (status === 'verifying') {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-128px)]">
                <Loader className="h-20 w-20 text-indigo-600 animate-spin" />
                <h1 className="text-3xl font-bold mt-4">Memverifikasi...</h1>
                <p className="mt-2 text-gray-600">Mohon tunggu sebentar, kami sedang memproses verifikasi akun Anda.</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-128px)]">
                <CheckCircle className="h-20 w-20 text-green-500" />
                <h1 className="text-3xl font-bold mt-4">Verifikasi Berhasil!</h1>
                <p className="mt-2 text-gray-600">{message || "Akun Anda telah berhasil diverifikasi."} Anda akan diarahkan...</p>
                <Link to="/dashboard" className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">
                    Kembali ke Dashboard
                </Link>
            </div>
        );
    }
    
    if (status === 'error') {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-128px)]">
                <XCircle className="h-20 w-20 text-red-500" />
                <h1 className="text-3xl font-bold mt-4">Verifikasi Gagal</h1>
                <p className="mt-2 text-gray-600">{message || "Link verifikasi tidak valid atau sudah kedaluwarsa."}</p>
                <Link to="/" className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">
                    Kembali ke Beranda
                </Link>
            </div>
        );
    }

    return null;
};

export default VerificationPage;
