import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, UserCheck } from 'lucide-react';

const PublicProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${id}`);
                setUser(data);
            } catch (error) {
                console.error("Gagal memuat profil publik");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    if (loading) return <div className="text-center py-10">Loading profile...</div>;
    if (!user) return <div className="text-center py-10">Profil tidak ditemukan.</div>;

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row items-start">
                    <div className="md:ml-8 w-full">
                        <div className="flex items-center mb-6">
                            <button
                                onClick={() => {
                                    if (window.history.length > 1) {
                                        navigate(-1);
                                    } else {
                                        navigate('/');
                                    }
                                }}
                                className="flex items-center text-sm text-indigo-600 border border-indigo-600 rounded-lg px-3 py-2 hover:bg-indigo-600 hover:text-white transition-all"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Kembali
                            </button>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
                        <h2 className="text-xl font-semibold text-indigo-600 mt-1">{user.headline}</h2>
                        {user.isVerified && <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><UserCheck className="w-4 h-4 mr-1"/> Terverifikasi</span>}
                        
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Deskripsi</h3>
                            <div className="mt-2 text-gray-600 space-y-2">
                                {user.description?.split("\n").map((line, i) => (
                                    <p key={i} className='text-justify'>{line}</p>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Keahlian</h3>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {user.skills?.map(skill => (
                                    <span key={skill} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>

                        {user.portfolio && user.portfolio.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Portofolio Proyek</h3>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {user.portfolio.map(project => (
                                        <Link 
                                            to={`/project/${project._id}`} 
                                            key={project._id} 
                                            className="block p-4 border rounded-lg font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors"
                                        >
                                            <p>{project.title}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfilePage;
