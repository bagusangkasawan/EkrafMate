import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const ProfileSettingsPage = () => {
    const { userInfo } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State untuk form profil
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loadingProfile, setLoadingProfile] = useState(false);
    
    // State untuk form ganti password
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingPassword, setLoadingPassword] = useState(false);

    // State show/hide untuk masing-masing kolom password
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username);
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoadingProfile(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/users/profile`,
                { name, email },
                config
            );
            
            dispatch(updateUserInfo(data));
            toast.success('Profil berhasil diperbarui!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal memperbarui profil.');
        } finally {
            setLoadingProfile(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Password baru dan konfirmasi tidak cocok.');
            return;
        }
        setLoadingPassword(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/users/profile/change-password`,
                { currentPassword, newPassword, confirmPassword },
                config
            );
            toast.success('Password berhasil diubah!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal mengubah password.');
        } finally {
            setLoadingPassword(false);
        }
    };
    
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Pengaturan Akun</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Form Ubah Profil */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-6">Informasi Profil</h2>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Username</label>
                            <input 
                                type="text" 
                                value={username} 
                                disabled 
                                className="mt-1 w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-500 mt-1">Username tidak dapat diubah.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Nama</label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="mt-1 w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                disabled={userInfo?.isVerified} 
                                className={`mt-1 w-full p-2 border rounded-md ${userInfo?.isVerified ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                            />
                            {userInfo?.isVerified && <p className="text-xs text-gray-500 mt-1">Email tidak bisa diubah setelah terverifikasi.</p>}
                        </div>
                        <button 
                            type="submit" 
                            disabled={loadingProfile} 
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
                        >
                            {loadingProfile ? 'Menyimpan...' : 'Simpan Perubahan Profil'}
                        </button>
                    </form>
                </div>

                {/* Form Ubah Password */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-6">Ubah Password</h2>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                        {/* Password Saat Ini */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Password Saat Ini</label>
                            <div className="relative">
                                <input 
                                    type={showCurrentPassword ? 'text' : 'password'} 
                                    value={currentPassword} 
                                    onChange={(e) => setCurrentPassword(e.target.value)} 
                                    className="mt-1 w-full p-2 border rounded-md pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                                >
                                    {showCurrentPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        {/* Password Baru */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Password Baru</label>
                            <div className="relative">
                                <input 
                                    type={showNewPassword ? 'text' : 'password'} 
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)} 
                                    className="mt-1 w-full p-2 border rounded-md pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                                >
                                    {showNewPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        {/* Konfirmasi Password Baru */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Konfirmasi Password Baru</label>
                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)} 
                                    className="mt-1 w-full p-2 border rounded-md pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                                >
                                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loadingPassword} 
                            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-500"
                        >
                            {loadingPassword ? 'Menyimpan...' : 'Ubah Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettingsPage;
