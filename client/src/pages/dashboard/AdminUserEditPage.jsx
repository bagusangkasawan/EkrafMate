import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AdminUserEditPage = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useAuth();

    // State untuk info user
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    // State untuk reset password
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loadingReset, setLoadingReset] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, config);
                setName(data.name);
                setEmail(data.email);
                setRole(data.role);
                setIsVerified(data.isVerified);
                setLoading(false);
            } catch (error) {
                toast.error('Gagal memuat data user.');
                navigate('/dashboard/admin');
            }
        };
        fetchUser();
    }, [userId, userInfo, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, { name, email, role, isVerified }, config);
            toast.success('Data user berhasil diperbarui!');
            navigate('/dashboard/admin');
        } catch (error) {
            toast.error('Gagal memperbarui data user.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Password baru dan konfirmasi tidak cocok.');
            return;
        }
        setLoadingReset(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}/reset-password`, { newPassword }, config);
            toast.success('Password user berhasil di-reset!');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal mereset password.');
        } finally {
            setLoadingReset(false);
        }
    };

    if (loading) { return <div className="text-center py-10">Loading...</div>; }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit User: {name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form Edit Info */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-6">Informasi User</h2>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Nama</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full p-2 border rounded-md"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full p-2 border rounded-md"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Role</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full p-2 border rounded-md">
                                <option value="creative">Creative</option>
                                <option value="client">Client</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)} id="isVerified" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                            <label htmlFor="isVerified" className="ml-2 block text-sm text-gray-900">Verified</label>
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400">
                            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </form>
                </div>

                {/* Form Reset Password */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-6">Reset Password</h2>
                    <form onSubmit={handleResetPassword} className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600">Password Baru</label>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 w-full p-2 border rounded-md pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                            >
                                {showNewPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600">Konfirmasi Password Baru</label>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 w-full p-2 border rounded-md pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-8 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>

                        <button type="submit" disabled={loadingReset} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 disabled:bg-red-400">
                            {loadingReset ? 'Mereset...' : 'Reset Password User'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminUserEditPage;
