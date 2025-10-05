import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Users, Briefcase, UserCheck, UserX, FolderCheck, FolderOpen } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/slices/authSlice';
import ConfirmDialog from '../../components/common/ConfirmDialog'; // pastikan path sesuai

const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className={`p-3 rounded-full bg-${color}-100`}>{icon}</div>
        <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
    </div>
);

const AdminDashboardPage = () => {
    const { userInfo } = useAuth();
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('users'); 
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'user'|'project', id: string }
    const dispatch = useDispatch();

    const fetchUsers = useCallback(async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, config);
            setUsers(data);
        } catch (error) { 
            toast.error("Gagal memuat pengguna."); 
        }
    }, [userInfo.token]);

    const fetchProjects = useCallback(async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/projects`, config);
            setProjects(data);
        } catch (error) { 
            toast.error("Gagal memuat proyek."); 
        }
    }, [userInfo.token]);
    
    useEffect(() => {
        dispatch(fetchUserProfile());
        setLoading(true);
        const fetchData = async () => {
            if (view === 'users') await fetchUsers();
            else await fetchProjects();
        };
        fetchData().finally(() => setLoading(false));
    }, [dispatch, view, fetchUsers, fetchProjects]);
    
    const userStats = useMemo(() => ({
        total: users.length,
        verified: users.filter(u => u.isVerified).length,
        unverified: users.filter(u => !u.isVerified).length,
    }), [users]);

    const projectStats = useMemo(() => ({
        total: projects.length,
        open: projects.filter(p => p.status === 'open' || p.status === 'in_progress').length,
        closed: projects.filter(p => p.status === 'closed').length,
    }), [projects]);

    // Buka dialog konfirmasi
    const handleDeleteClick = (type, id) => {
        setDeleteTarget({ type, id });
        setIsConfirmOpen(true);
    };

    // Eksekusi hapus setelah confirm
    const handleConfirmDelete = async () => {
        if (!deleteTarget) return;
        const { type, id } = deleteTarget;
        setIsConfirmOpen(false);

        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            if (type === 'user') {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, config);
                toast.success("Pengguna berhasil dihapus.");
                fetchUsers();
            } else if (type === 'project') {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/projects/${id}`, config);
                toast.success("Proyek berhasil dihapus.");
                fetchProjects();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Gagal menghapus data.");
        } finally {
            setDeleteTarget(null);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
            <p className="mt-2 text-gray-600">Kelola seluruh platform EkrafMate.</p>
            
            {/* Stat Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {view === 'users' ? (
                    <>
                        <StatCard icon={<Users className="h-6 w-6 text-blue-600"/>} title="Total Pengguna" value={userStats.total} color="blue" />
                        <StatCard icon={<UserCheck className="h-6 w-6 text-green-600"/>} title="Terverifikasi" value={userStats.verified} color="green" />
                        <StatCard icon={<UserX className="h-6 w-6 text-red-600"/>} title="Belum Verifikasi" value={userStats.unverified} color="red" />
                    </>
                ) : (
                    <>
                        <StatCard icon={<Briefcase className="h-6 w-6 text-blue-600"/>} title="Total Proyek" value={projectStats.total} color="blue" />
                        <StatCard icon={<FolderOpen className="h-6 w-6 text-yellow-600"/>} title="Proyek Aktif" value={projectStats.open} color="yellow" />
                        <StatCard icon={<FolderCheck className="h-6 w-6 text-green-600"/>} title="Proyek Selesai" value={projectStats.closed} color="green" />
                    </>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mt-8">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setView('users')} className={`${view === 'users' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}>
                        <Users className="mr-2 h-5 w-5"/> Kelola Pengguna
                    </button>
                    <button onClick={() => setView('projects')} className={`${view === 'projects' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}>
                        <Briefcase className="mr-2 h-5 w-5"/> Kelola Proyek
                    </button>
                </nav>
            </div>
            
            {/* Table */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                {loading ? <div className="text-center py-10">Loading...</div> : (
                    view === 'users' ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link to={`/admin/user/${user._id}/edit`} className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-indigo-600 border border-gray-300 rounded-md hover:bg-indigo-600 hover:text-white">
                                                <Edit className="w-4 h-4"/> Edit
                                            </Link>
                                            <button onClick={() => handleDeleteClick('user', user._id)} className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-600 border border-gray-300 rounded-md hover:bg-red-600 hover:text-white">
                                                <Trash2 className="w-4 h-4"/> Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Proyek</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pemilik</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {projects.map(p => (
                                    <tr key={p._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.owner?.name || 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{p.status.replace(/_/g, ' ')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link to={`/project/${p._id}/edit`} className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-indigo-600 border border-gray-300 rounded-md hover:bg-indigo-600 hover:text-white">
                                                <Edit className="w-4 h-4"/> Edit
                                            </Link>
                                            <button onClick={() => handleDeleteClick('project', p._id)} className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-600 border border-gray-300 rounded-md hover:bg-red-600 hover:text-white">
                                                <Trash2 className="w-4 h-4"/> Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>

            {/* Confirm Dialog */}
            <ConfirmDialog
                isOpen={isConfirmOpen}
                title="Konfirmasi Hapus"
                message={
                    deleteTarget?.type === 'user'
                        ? 'Apakah Anda yakin ingin menghapus pengguna ini?'
                        : 'Apakah Anda yakin ingin menghapus proyek ini?'
                }
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default AdminDashboardPage;
