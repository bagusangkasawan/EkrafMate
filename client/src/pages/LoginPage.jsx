import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { login } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo, loading, error } = useAuth();

    const getDashboardLink = (role) => {
        switch (role) {
            case 'admin': return '/dashboard/admin';
            case 'client': return '/dashboard/client';
            case 'creative': return '/dashboard/creative';
            default: return '/';
        }
    };

    useEffect(() => {
        if (userInfo) {
            toast.success('Login berhasil!');
            navigate(getDashboardLink(userInfo.role));
        }
        if (error) {
            toast.error(error);
        }
    }, [userInfo, navigate, error]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ identifier, password }));
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-slate-50 p-4">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
                <div><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login ke Akun Anda</h2></div>
                <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Email atau Username" />
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Password" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                                {showPassword ? <EyeOff /> : <Eye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400">
                            {loading ? 'Memproses...' : 'Login'}
                        </button>
                    </div>
                </form>
                 <div className="text-sm text-center">
                    <p>Belum punya akun? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Daftar di sini</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
