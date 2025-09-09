import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { Save, Wand2 } from 'lucide-react';

const ProjectEditPage = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useAuth();
    const [project, setProject] = useState({ title: '', description: '', requiredSkills: '', budget: '' });
    const [loading, setLoading] = useState(true);
    const [genLoading, setGenLoading] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, config);
                setProject({
                    ...data,
                    requiredSkills: data.requiredSkills.join(', ')
                });
            } catch (error) {
                toast.error('Gagal memuat detail proyek.');
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };
        if (userInfo) {
            fetchProject();
        }
    }, [projectId, navigate, userInfo]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const skillsArray = project.requiredSkills.split(',').map(s => s.trim()).filter(Boolean);
            await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, { ...project, requiredSkills: skillsArray }, config);
            toast.success('Proyek berhasil diperbarui!');
            if (userInfo.role === 'admin') navigate('/dashboard/admin');
            else navigate('/dashboard/client');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Gagal memperbarui proyek.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateDescription = async () => {
        setGenLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const keyPoints = `Judul: ${project.title}, Keahlian: ${project.requiredSkills}, Anggaran: Rp${project.budget}`;
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/projects/generate-description`, { keyPoints }, config);
            setProject(p => ({ ...p, description: data.description }));
            toast.success('Deskripsi berhasil dibuat oleh AI!');
        } catch (error) {
            toast.error('Gagal membuat deskripsi.');
        } finally {
            setGenLoading(false);
        }
    };


    if (loading) return <div className="text-center p-12">Memuat Proyek...</div>;

    return (
        <div className="container mx-auto max-w-2xl px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Proyek</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Judul Proyek</label>
                        <input type="text" value={project.title} onChange={e => setProject({ ...project, title: e.target.value })} className="mt-1 w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <textarea value={project.description} onChange={e => setProject({ ...project, description: e.target.value })} rows="5" className="mt-1 w-full p-2 border rounded-md" />
                        <div className="flex justify-end mt-2">
                           <button
                                type="button"
                                onClick={handleGenerateDescription}
                                disabled={genLoading}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300"
                            >
                                <Wand2 className="h-4 w-4 mr-2" />
                                {genLoading ? 'Membuat...' : 'Buat dengan AI'}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Keahlian (pisahkan koma)</label>
                        <input type="text" value={project.requiredSkills} onChange={e => setProject({ ...project, requiredSkills: e.target.value })} className="mt-1 w-full p-2 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Anggaran (Rp)</label>
                        <input
                            type="text"
                            value={project.budgetFormatted || project.budget}
                            onChange={e => {
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                const formatted = onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                                setProject(prev => ({
                                    ...prev,
                                    budget: onlyNums,
                                    budgetFormatted: formatted
                                }));
                            }}
                            className="mt-1 w-full p-2 border rounded-md"
                        />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex justify-center items-center">
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectEditPage;
