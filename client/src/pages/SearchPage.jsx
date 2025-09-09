import React, { useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        setSearched(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/search/creatives`, { query });
            setResults(data);
        } catch (err) {
            setError('Gagal melakukan pencarian. Coba lagi nanti.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Temukan Talenta Kreatif</h1>
                <p className="mt-2 text-gray-600">Jelaskan kebutuhan Anda, dan biarkan AI kami menemukan yang terbaik.</p>
            </div>
            <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto flex shadow-md rounded-lg">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Contoh: desainer logo untuk brand kopi modern"
                />
                <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center">
                    <Search className="w-5 h-5 md:mr-2" />
                    <span className="hidden md:inline">{loading ? 'Mencari...' : 'Cari'}</span>
                </button>
            </form>

            <div className="mt-12">
                {loading && <p className="text-center text-indigo-600">Mencari kandidat terbaik untuk Anda...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {searched && !loading && results.length === 0 && <p className="text-center text-gray-500">Tidak ada hasil yang ditemukan. Coba gunakan deskripsi yang berbeda.</p>}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results.map((user) => (
                        <div key={user._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                            <p className="text-indigo-600 font-semibold mt-1">{user.headline || 'Pelaku Kreatif'}</p>
                            <p className="text-gray-600 mt-4 text-sm line-clamp-3">{user.description || 'Tidak ada deskripsi.'}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {user.skills?.slice(0, 5).map(skill => (
                                    <span key={skill} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{skill}</span>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-between items-center">
                                <p className="text-xs text-gray-400">Skor: {user.score.toFixed(2)}</p>
                                <Link to={`/profile/${user._id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Lihat Profil</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
