import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Plus, Check, Wand2, Edit, Users, Trash2, Briefcase, Clock, DollarSign, Save } from 'lucide-react';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import VerificationNotice from '../../components/layout/VerificationNotice';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/slices/authSlice';

const ClientDashboardPage = () => {
    const { userInfo } = useAuth();
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [applicantsModal, setApplicantsModal] = useState({ isOpen: false, applicants: [], projectId: null });
    const [newProject, setNewProject] = useState({ title: '', description: '', skills: '', budget: '' });
    const [loading, setLoading] = useState(true);
    const [genLoading, setGenLoading] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const dispatch = useDispatch();

    const fetchProjects = useCallback(async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/myprojects`, config);
            setProjects(data);
        } catch (error) {
            toast.error("Gagal memuat proyek Anda.");
        }
    }, [userInfo.token]);

    useEffect(() => {
        dispatch(fetchUserProfile());
        setLoading(true);
        fetchProjects().finally(() => setLoading(false));
    }, [dispatch, fetchProjects]);

    const stats = useMemo(() => {
        const active = projects.filter(p => p.status === 'in_progress' || p.status === 'pending_approval' || p.status === 'open').length;
        const totalSpent = projects.filter(p => p.status === 'closed').reduce((acc, p) => acc + (p.budget || 0), 0);
        return { total: projects.length, active, totalSpent };
    }, [projects]);

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const skillsArray = newProject.skills.split(',').map(skill => skill.trim()).filter(Boolean);
            const projectData = {
                title: newProject.title,
                description: newProject.description,
                requiredSkills: skillsArray,
                budget: newProject.budget ? Number(newProject.budget) : undefined
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, projectData, config);
            toast.success('Proyek berhasil dibuat!');
            setShowModal(false);
            setNewProject({ title: '', description: '', skills: '', budget: '' });
            fetchProjects();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal membuat proyek.');
        }
    };

    const handleGenerateDescription = async () => {
        setGenLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const keyPoints = `Judul: ${newProject.title}, Keahlian: ${newProject.skills}, Anggaran: Rp${newProject.budget}`;
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/projects/generate-description`, { keyPoints }, config);
            setNewProject(p => ({ ...p, description: data.description }));
            toast.success('Deskripsi berhasil dibuat oleh AI!');
        } catch (error) {
            toast.error('Gagal membuat deskripsi.');
        } finally {
            setGenLoading(false);
        }
    };

    const handleApproveProject = async (projectId) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}/close`, {}, config);
            toast.success('Proyek berhasil disetujui dan ditutup!');
            fetchProjects();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal menyetujui proyek.');
        }
    };

    const handleDeleteClick = (projectId) => {
        setSelectedProjectId(projectId);
        setIsConfirmOpen(true);
    };

    const handleDeleteProject = async () => {
        setIsConfirmOpen(false);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${selectedProjectId}`, config);
            toast.success("Proyek berhasil dihapus.");
            fetchProjects();
        } catch (error) {
            toast.error(error.response?.data?.message || "Gagal menghapus proyek.");
        }
    };

    const handleAcceptCreative = async (projectId, creativeId) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/projects/${projectId}/accept`,
                { creativeId },
                config
            );
            toast.success('Pelamar berhasil diterima!');
            setApplicantsModal({ isOpen: false, applicants: [], projectId: null });
            fetchProjects();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal menerima pelamar.');
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!userInfo.isVerified && <VerificationNotice />}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Klien</h1>
                    <p className="mt-2 text-gray-600">Kelola proyek Anda dan temukan talenta terbaik.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center shadow-sm">
                    <Plus className="w-5 h-5 mr-2" /> Buat Proyek Baru
                </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full"><Briefcase className="h-6 w-6 text-blue-600"/></div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Total Proyek</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.total}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-orange-100 p-3 rounded-full"><Clock className="h-6 w-6 text-orange-600"/></div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Proyek Aktif</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.active}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-green-100 p-3 rounded-full"><DollarSign className="h-6 w-6 text-green-600"/></div>
                    <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">Total Anggaran Terpakai</h3>
                        <p className="mt-1 text-2xl font-semibold text-gray-900">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(stats.totalSpent)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Daftar Proyek Anda</h2>
                <div className="space-y-4">
                    {projects.length > 0 ? (
                        projects.map(p => (
                            <div key={p._id} className="border p-4 rounded-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            <Link 
                                                to={`/project/${p._id}`} 
                                                className="text-indigo-600 hover:underline"
                                            >
                                                {p.title}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-gray-500 capitalize">Status: {p.status.replace(/_/g, ' ')}</p>
                                        {p.creative && <p className="text-sm text-gray-500">Dikerjakan oleh: {p.creative.name}</p>}
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap justify-end">
                                        {p.status !== 'closed' && (
                                            <>
                                                <Link to={`/project/${p._id}/edit`} className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-indigo-600 border border-gray-300 rounded-md hover:bg-indigo-600 hover:text-white">
                                                    <Edit className="w-4 h-4" /> Edit
                                                </Link>
                                                <button onClick={() => handleDeleteClick(p._id)} className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-600 border border-gray-300 rounded-md hover:bg-red-600 hover:text-white">
                                                    <Trash2 className="w-4 h-4" /> Hapus
                                                </button>
                                                <ConfirmDialog
                                                    isOpen={isConfirmOpen}
                                                    title="Hapus Proyek"
                                                    message="Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan."
                                                    onCancel={() => setIsConfirmOpen(false)}
                                                    onConfirm={handleDeleteProject}
                                                />
                                            </>
                                        )}
                                        
                                        {p.status === 'open' && p.applicants && p.applicants.length > 0 && (
                                            <button onClick={() => setApplicantsModal({ isOpen: true, applicants: p.applicants, projectId: p._id })} className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 rounded-full flex items-center text-sm">
                                                <Users className="w-4 h-4 mr-1" /> Lihat Pelamar ({p.applicants.length})
                                            </button>
                                        )}
                                        {p.status === 'pending_approval' && (
                                            <button onClick={() => handleApproveProject(p._id)} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center text-sm">
                                                <Check className="w-4 h-4 mr-1" /> Setujui
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Anda belum membuat proyek apapun.</p>
                    )}
                </div>
            </div>

            {/* Modal Buat Proyek */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-6">Proyek Baru</h2>
                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <input type="text" placeholder="Judul Proyek" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full p-3 border rounded-lg" required />
                            <textarea placeholder="Deskripsi Proyek" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full p-3 border rounded-lg" rows="5" required></textarea>
                            <div className="flex justify-end"><button type="button" onClick={handleGenerateDescription} disabled={genLoading} className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"><Wand2 className="h-4 w-4 mr-2" />{genLoading ? 'Membuat...' : 'Buat dengan AI'}</button></div>
                            <input type="text" placeholder="Keahlian (pisahkan koma)" value={newProject.skills} onChange={e => setNewProject({...newProject, skills: e.target.value})} className="w-full p-3 border rounded-lg" />
                            <div className="flex gap-2">
                                <span className="flex items-center px-3 bg-gray-100 rounded-l-lg">Rp</span>
                                <input
                                    type="text"
                                    placeholder="Anggaran (opsional)"
                                    value={newProject.budgetFormatted || ''}
                                    onChange={e => {
                                    const onlyNums = e.target.value.replace(/\D/g, '');
                                    const formatted = onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                    setNewProject(prev => ({
                                        ...prev,
                                        budget: onlyNums,
                                        budgetFormatted: formatted
                                    }));
                                    }}
                                    className="flex-1 p-3 border rounded-r-lg focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="flex justify-end gap-4 mt-4">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)} 
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition"
                                >
                                    <Save className="w-4 h-4" />
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Lihat Pelamar */}
            {applicantsModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6">Daftar Pelamar</h2>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {applicantsModal.applicants.length > 0 ? applicantsModal.applicants.map(applicant => (
                                <div key={applicant._id} className="flex justify-between items-center p-3 border rounded-lg">
                                    <div>
                                        <Link to={`/profile/${applicant._id}`} target="_blank" className="font-semibold text-indigo-600 hover:underline">{applicant.name}</Link>
                                        <p className="text-sm text-gray-500">{applicant.headline}</p>
                                    </div>
                                    <button onClick={() => handleAcceptCreative(applicantsModal.projectId, applicant._id)} className="bg-green-500 text-white px-3 py-1 text-sm rounded-md hover:bg-green-600">
                                        Terima
                                    </button>
                                </div>
                            )) : <p>Belum ada pelamar.</p>}
                        </div>
                        <div className="flex justify-end mt-6">
                            <button type="button" onClick={() => setApplicantsModal({ isOpen: false, applicants: [], projectId: null })} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">Tutup</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientDashboardPage;
