import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Users, Briefcase } from 'lucide-react';

const AdminDashboardPage = () => {
    const { userInfo } = useAuth();
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState('users'); // 'users' or 'projects'

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
        setLoading(true);
        const fetchData = async () => {
            if (view === 'users') {
                await fetchUsers();
            } else {
                await fetchProjects();
            }
        };
        fetchData().finally(() => setLoading(false));
    }, [view, fetchUsers, fetchProjects]);

    const deleteUserHandler = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, config);
                toast.success('Pengguna berhasil dihapus.');
                fetchUsers();
            } catch (error) { 
                toast.error('Gagal menghapus pengguna.'); 
            }
        }
    };
    
    const deleteProjectHandler = async (id) => {
         if (window.confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/projects/${id}`, config);
                toast.success('Proyek berhasil dihapus.');
                fetchProjects();
            } catch (error) { 
                toast.error('Gagal menghapus proyek.'); 
            }
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
            <p className="mt-2 text-gray-600">Kelola seluruh platform EkrafMate.</p>
            
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
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                {loading ? <div className="text-center py-10">Loading...</div> : (
                    view === 'users' ? (
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                               <tr>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                   <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                               </tr>
                           </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map(user => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                        <Link to={`/admin/user/${user._id}/edit`} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"><Edit className="w-4 h-4"/></Link>
                                        <button onClick={() => deleteUserHandler(user._id)} className="text-red-600 hover:text-red-900 inline-flex items-center"><Trash2 className="w-4 h-4"/></button>
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
                                   <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                               </tr>
                           </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {projects.map(p => (
                                <tr key={p._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.owner?.name || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{p.status.replace(/_/g, ' ')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                        <Link to={`/project/${p._id}/edit`} className="text-indigo-600 hover:text-indigo-900"><Edit className="w-4 h-4"/></Link>
                                        <button onClick={() => deleteProjectHandler(p._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4"/></button>
                                    </td>
                                </tr>
                               ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
        </div>
    );
};

export default AdminDashboardPage;
