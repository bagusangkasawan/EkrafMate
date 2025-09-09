import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectListPage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
                setProjects(data);
            } catch (error) {
                console.error("Gagal memuat proyek");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) return <div className="text-center py-10">Memuat proyek...</div>;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Jelajahi Proyek Terbuka</h1>
                <p className="mt-2 text-gray-600">Temukan kesempatan berikutnya untuk menunjukkan keahlian Anda.</p>
            </div>
            
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? projects.map(project => (
                <div key={project._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3 flex-grow">{project.description}</p>
                    {project.budget && <p className="text-lg font-semibold text-green-600 mt-4 flex items-center"> {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(project.budget)}</p>}
                    <div className="mt-6 pt-4 border-t">
                        <Link to={`/project/${project._id}`} className="font-semibold text-indigo-600 hover:text-indigo-800">Lihat Detail & Ambil Proyek</Link>
                    </div>
                </div>
            )) : <p className="col-span-full text-center text-gray-500">Saat ini tidak ada proyek yang tersedia.</p>}
            </div>
        </div>
    );
};

export default ProjectListPage;
