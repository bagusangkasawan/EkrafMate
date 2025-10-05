import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const ProjectListPage = () => {
	const navigate = useNavigate();
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [error, setError] = useState(null);
	const [searched, setSearched] = useState(false);

	// Fetch semua proyek (GET)
	const fetchAllProjects = async () => {
		setLoading(true);
		setError(null);
		try {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/projects`
			);
			setProjects(data);
		} catch (err) {
			console.error('Gagal memuat proyek', err);
			setError('Gagal memuat proyek. Coba lagi nanti.');
			setProjects([]);
		} finally {
			setLoading(false);
		}
	};

	// Search proyek (POST)
	const searchProjects = async () => {
		if (!query.trim()) return fetchAllProjects();
		setLoading(true);
		setError(null);
		try {
			const { data } = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/search/projects`,
				{ query }
			);
			setProjects(data);
		} catch (err) {
			console.error('Gagal mencari proyek', err);
			setError('Gagal mencari proyek. Coba lagi nanti.');
			setProjects([]);
		} finally {
			setLoading(false);
			setSearched(true);
		}
	};

	// Load proyek pertama kali
	useEffect(() => {
		fetchAllProjects();
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		searchProjects();
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Header */}
			<div className="text-center">
				<h1 className="text-4xl font-bold text-gray-800">
					Jelajahi Proyek Terbuka
				</h1>
				<p className="mt-2 text-gray-600">
					Temukan kesempatan berikutnya untuk menunjukkan keahlian Anda.
				</p>
			</div>

			{/* Search bar */}
			<form
				onSubmit={handleSearch}
				className="mt-8 max-w-2xl mx-auto flex shadow-md rounded-lg"
			>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="w-full px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					placeholder="Contoh: proyek desain UI/UX aplikasi mobile"
				/>
				<button
					type="submit"
					disabled={loading || !query.trim()}
					className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
				>
					<Search className="w-5 h-5 md:mr-2" />
					<span className="hidden md:inline">
						{loading ? 'Mencari...' : 'Cari'}
					</span>
				</button>
			</form>

			{/* Grid Projects */}
			<div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{loading && (
					<p className="col-span-full text-center text-indigo-600">
						Memuat proyek...
					</p>
				)}
				{error && (
					<p className="col-span-full text-center text-red-500">{error}</p>
				)}
				{searched && !loading && projects.length === 0 && (
					<p className="col-span-full text-center text-gray-500">
						Tidak ada proyek ditemukan.
					</p>
				)}

				{/* Card Project */}
				{projects.map((project) => (
					<div
						key={project._id}
						onClick={() => navigate(`/project/${project._id}`)}
						className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
					>
						{/* Judul */}
						<h2 className="text-xl font-bold text-gray-900">
							{project.title}
						</h2>

						{/* Status */}
						{project.status && (
							<span
								className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full w-fit
									${
										project.status === 'open'
											? 'bg-green-100 text-green-800'
											: 'bg-gray-200 text-gray-700'
									}`}
							>
								{project.status.toUpperCase()}
							</span>
						)}

						{/* Deskripsi */}
						<p className="text-sm text-gray-500 mt-3 line-clamp-3 flex-grow">
							{project.description}
						</p>

						{/* Budget */}
						{project.budget && (
							<p className="text-lg font-semibold text-green-600 mt-4 flex items-center">
								{new Intl.NumberFormat('id-ID', {
									style: 'currency',
									currency: 'IDR',
								}).format(project.budget)}
							</p>
						)}

						{/* Footer */}
						<div className="mt-6 pt-4 border-t flex items-center justify-between">
							<Link
								to={`/project/${project._id}`}
								className="font-semibold text-indigo-600 hover:underline"
							>
								Lihat Detail
							</Link>
							{project.score !== undefined && (
								<p className="text-xs text-gray-400">
									Skor: {project.score.toFixed(2)}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectListPage;
