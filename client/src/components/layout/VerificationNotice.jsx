import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const VerificationNotice = () => {
    const { userInfo } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleResendVerification = async () => {
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resend-verification`, {}, config);
            toast.success('Email verifikasi baru telah dikirim!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal mengirim ulang email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-8 rounded-r-lg shadow" role="alert">
            <div className="flex items-center">
                <AlertTriangle className="mr-3 text-yellow-600" />
                <div>
                    <p className="font-bold">Akun Anda Belum Terverifikasi</p>
                    <p className="text-sm">
                        Beberapa fitur mungkin terbatas. Silakan cek email Anda.
                        <button
                            onClick={handleResendVerification}
                            disabled={loading}
                            className="ml-2 font-semibold underline hover:text-yellow-900 disabled:text-gray-500 disabled:no-underline"
                        >
                            {loading ? 'Mengirim...' : 'Kirim Ulang Verifikasi'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerificationNotice;
