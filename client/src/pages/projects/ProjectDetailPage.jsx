import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { Briefcase, User, CheckSquare, Clock, AlertCircle } from 'lucide-react';

const ProjectDetailPage = () => {
    const { id } = useParams();
    const { userInfo } = useAuth();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const navigate = useNavigate();

    const fetchProject = useCallback(async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${id}`);
            setProject(data);
        } catch (error) {
            console.error("Gagal memuat detail proyek");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    const handleTakeProject = async () => {
        if (!userInfo) {
            toast.error("Anda harus login untuk mengambil proyek.");
            return;
        }
        setApplying(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${id}/apply`, {}, config);
            toast.success('Anda berhasil mengajukan diri!');
            fetchProject(); // Memuat ulang data proyek untuk memperbarui state tombol
        } catch (error) {
            toast.error(error.response?.data?.message || "Gagal mengambil proyek.");
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!project) return <div className="text-center py-10">Proyek tidak ditemukan.</div>;

    const hasApplied = userInfo && project.applicants?.includes(userInfo._id);

    const isProfileComplete = userInfo?.description && userInfo.description.trim() !== '';

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <span className="text-sm font-semibold text-indigo-600 uppercase">Proyek Terbuka</span>
                <h1 className="text-4xl font-bold text-gray-900 mt-2">{project.title}</h1>
                <div className="mt-4 text-gray-600 space-y-3">
                    {project.description?.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-md font-semibold text-gray-500">Klien</h3>
                        <p className="text-lg font-medium text-gray-900 flex items-center mt-1"><User className="w-5 h-5 mr-2 text-indigo-500"/>{project.owner?.name}</p>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold text-gray-500">Anggaran</h3>
                        <p className="text-lg font-medium text-gray-900 flex items-center mt-1">
                            {project.budget ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(project.budget) : 'N/A'}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold text-gray-500">Status</h3>
                        <p className="text-lg font-medium text-gray-900 capitalize flex items-center mt-1"><Briefcase className="w-5 h-5 mr-2 text-gray-500"/> {project.status.replace('_', ' ')}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-md font-semibold text-gray-500">Keahlian yang dibutuhkan</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {project.requiredSkills?.map(skill => <span key={skill} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{skill}</span>)}
                    </div>
                </div>
                
                {project.creative && (
                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-md font-semibold text-gray-500">Dikerjakan oleh</h3>
                        <Link to={`/profile/${project.creative._id}`} className="text-lg font-medium text-indigo-600 hover:underline flex items-center mt-1">
                            <CheckSquare className="w-5 h-5 mr-2"/>
                            {project.creative.name}
                        </Link>
                    </div>
                )}
                
                {userInfo?.role === 'creative' && project.status === 'open' && (
                    <div className="mt-10 border-t pt-8">
                        {hasApplied ? (
                            <button 
                                disabled 
                                className="w-full md:w-auto bg-gray-400 text-white px-8 py-3 rounded-md font-semibold cursor-not-allowed flex items-center justify-center shadow-md"
                            >
                                <Clock className="w-5 h-5 mr-2"/>
                                Menunggu Persetujuan Klien
                            </button>
                        ) : !isProfileComplete ? (
                            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-yellow-700">
                                            Profil Anda belum lengkap.
                                            <button onClick={() => navigate('/dashboard/creative')} className="font-medium underline text-yellow-700 hover:text-yellow-600 ml-2">
                                                Lengkapi deskripsi profil Anda
                                            </button>
                                            {' '}untuk bisa mengambil proyek ini.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={handleTakeProject} 
                                disabled={applying}
                                className="w-full md:w-auto bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 shadow-md"
                            >
                                {applying ? 'Mengajukan...' : 'Ambil Proyek Ini'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailPage;
