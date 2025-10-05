import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import VerificationNotice from '../../components/layout/VerificationNotice';
import { Link } from 'react-router-dom';
import { Wand2, Save, Maximize2, X, DollarSign, Briefcase, CheckCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/slices/authSlice';

const CreativeDashboardPage = () => {
    const { userInfo } = useAuth();
    const [profile, setProfile] = useState({ name: '', headline: '', description: '', skills: '' });
    const [assignedProjects, setAssignedProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genLoading, setGenLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const [totalEarnings, setTotalEarnings] = useState(0);
    const [activeProjects, setActiveProjects] = useState([]);
    const [completedProjects, setCompletedProjects] = useState([]);

    const fetchProfile = useCallback(async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, config);
            setProfile({
                name: data.name,
                headline: data.headline || '',
                description: data.description || '',
                skills: data.skills ? data.skills.join(', ') : ''
            });
        } catch (error) {
            toast.error("Gagal memuat profil.");
        }
    }, [userInfo.token]);

    const fetchAssignedProjects = useCallback(async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/assigned`, config);
            setAssignedProjects(data);
        } catch (error) {
            toast.error("Gagal memuat proyek yang ditugaskan.");
        }
    }, [userInfo.token]);

    useEffect(() => {
        dispatch(fetchUserProfile());
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchProfile(), fetchAssignedProjects()]);
            setLoading(false);
        };
        loadData();
    }, [dispatch, fetchProfile, fetchAssignedProjects]);

    useEffect(() => {
        if (assignedProjects) {
            const active = assignedProjects.filter(p => p.status === 'in_progress' || p.status === 'pending_approval');
            const completed = assignedProjects.filter(p => p.status === 'closed');
            const earnings = completed.reduce((acc, project) => acc + (project.budget || 0), 0);

            setActiveProjects(active);
            setCompletedProjects(completed);
            setTotalEarnings(earnings);
        }
    }, [assignedProjects]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const skillsArray = profile.skills.split(',').map(skill => skill.trim()).filter(Boolean);
            await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile`, { ...profile, skills: skillsArray }, config);
            toast.success('Profil berhasil diperbarui!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal memperbarui profil.');
        }
    };
    
    const handleGenerateDescription = async () => {
        setGenLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const keyPoints = `Nama: ${profile.name}, Headline: ${profile.headline}, Keahlian: ${profile.skills}`;
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/generate-description`, { keyPoints }, config);
            setProfile(p => ({ ...p, description: data.description }));
            toast.success('Deskripsi berhasil dibuat oleh AI!');
        } catch (error) {
            toast.error('Gagal membuat deskripsi.');
        } finally {
            setGenLoading(false);
        }
    };
    
    const handleCompleteProject = async (projectId) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}/complete`, {}, config);
            toast.success('Proyek ditandai untuk persetujuan!');
            fetchAssignedProjects();
        } catch (error) {
            toast.error(error.response?.data?.message || "Gagal menyelesaikan proyek.");
        }
    };

    const isPrerequisitesMet = profile.headline.trim() !== '' && profile.skills.trim() !== '';

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!userInfo.isVerified && <VerificationNotice />}
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Pelaku Kreatif</h1>
            <p className="mt-2 text-gray-600">Atur profil Anda dan kelola proyek yang sedang berjalan.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full"><Briefcase className="h-6 w-6 text-blue-600"/></div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Proyek Aktif</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">{activeProjects.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-green-100 p-3 rounded-full"><CheckCircle className="h-6 w-6 text-green-600"/></div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Proyek Selesai</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">{completedProjects.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-full"><DollarSign className="h-6 w-6 text-yellow-600"/></div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Total Pendapatan</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalEarnings)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Edit Profil</h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama</label>
                            <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Headline (Contoh: UI/UX Designer)</label>
                            <input type="text" value={profile.headline} onChange={e => setProfile({...profile, headline: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Keahlian (pisahkan dengan koma)</label>
                            <input type="text" value={profile.skills} onChange={e => setProfile({...profile, skills: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                            {!isPrerequisitesMet && (
                                <p className="text-xs text-red-500 mt-1">Harap isi Headline dan Keahlian terlebih dahulu untuk mengaktifkan deskripsi.</p>
                            )}
                            <textarea
                                value={profile.description}
                                onChange={e => setProfile({...profile, description: e.target.value})}
                                rows="5"
                                disabled={!isPrerequisitesMet}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                placeholder={!isPrerequisitesMet ? 'Isi Headline dan Keahlian untuk memulai...' : 'Ceritakan tentang diri Anda...'}
                            ></textarea>
                            <div className="mt-2 flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleGenerateDescription}
                                    disabled={genLoading || !isPrerequisitesMet}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed"
                                >
                                    <Wand2 className="h-4 w-4 mr-2" />
                                    {genLoading ? 'Membuat...' : 'Buat dengan AI'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(true)}
                                    disabled={!isPrerequisitesMet}
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                >
                                    <Maximize2 className="h-4 w-4 mr-2" /> Perluas
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 inline-flex justify-center items-center">
                            <Save className="h-4 w-4 mr-2" /> Simpan Perubahan
                        </button>
                    </form>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Proyek Aktif</h2>
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {activeProjects.length > 0 ? (
                        activeProjects.map(project => (
                        <div key={project._id} className="border p-4 rounded-md">
                            <h3 className="font-bold text-lg">{project.title}</h3>
                            <p className="text-sm text-gray-500 capitalize">Status: {project.status.replace('_', ' ')}</p>
                            <div className="mt-4 flex gap-2">
                                <Link to={`/project/${project._id}`} className="px-3 py-1 text-sm font-medium text-indigo-600 border border-gray-300 rounded-md hover:text-white hover:bg-indigo-600">Lihat Detail</Link>
                                {project.status === 'in_progress' && (
                                    <button onClick={() => handleCompleteProject(project._id)} className="px-3 py-1 text-sm font-medium text-green-600 border border-gray-300 rounded-md hover:text-white hover:bg-green-600">Tandai Selesai</button>
                                )}
                            </div>
                        </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Tidak ada proyek aktif.</p>
                    )}
                    </div>

                    <h2 className="text-2xl font-bold my-6 border-t pt-6">Riwayat Proyek</h2>
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {completedProjects.length > 0 ? (
                        completedProjects.map(project => (
                        <div key={project._id} className="border p-4 rounded-md bg-gray-50">
                            <div className="flex justify-between items-start">
                                <h3 className="font-semibold text-gray-800 flex-1">{project.title}</h3>
                                {project.budget && (
                                    <p className="text-sm font-semibold text-green-700 ml-2">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(project.budget)}
                                    </p>
                                )}
                            </div>
                            <Link to={`/project/${project._id}`} className="px-3 py-1 text-sm font-medium text-indigo-600 border border-gray-300 rounded-md hover:text-white hover:bg-indigo-600 mt-2 inline-block">Lihat Detail</Link>
                        </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Anda belum menyelesaikan proyek.</p>
                    )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <h3 className="text-lg font-bold mb-4">Edit Deskripsi</h3>
                        <textarea
                            value={profile.description}
                            onChange={e => setProfile({...profile, description: e.target.value})}
                            rows="12"
                            className="w-full border border-gray-300 rounded-md shadow-sm p-3"
                        ></textarea>
                        <div className="mt-4 flex justify-between">
                            <button
                                type="button"
                                onClick={handleGenerateDescription}
                                disabled={genLoading}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300"
                            >
                                <Wand2 className="h-4 w-4 mr-2" />
                                {genLoading ? 'Membuat...' : 'Buat dengan AI'}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreativeDashboardPage;
