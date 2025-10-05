import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Zap, Check, Star } from 'lucide-react';

const HomePage = () => {
	return (
		<div className="bg-white">
			{/* Hero */}
			<div className="container mx-auto px-6 py-16 text-center bg-white">
				<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
					Temukan <span className="text-indigo-600">Peluang</span>, Wujudkan <span className="text-indigo-600">Karya</span>.
				</h1>
				<p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
					EkrafMate adalah jembatan antara talenta kreatif paling berbakat di Indonesia dengan proyek-proyek inovatif yang menunggu untuk direalisasikan.
				</p>
				<div className="mt-8 flex justify-center gap-4">
					<Link
						to="/search"
						className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 shadow-lg transform hover:scale-105 transition-transform duration-300"
					>
						Cari Talenta
					</Link>
					<Link
						to="/projects"
						className="bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-semibold border-2 border-indigo-600 hover:text-white hover:bg-indigo-600 transform hover:scale-105 transition-transform duration-300"
					>
						Lihat Proyek
					</Link>
				</div>
			</div>

			{/* Why Choose */}
			<div className="py-24 bg-slate-50">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center text-gray-800">Kenapa Memilih EkrafMate?</h2>
					<div className="mt-12 grid md:grid-cols-3 gap-12">
						<div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition">
							<div className="flex justify-center items-center mx-auto w-16 h-16 bg-indigo-100 rounded-full">
								<Zap className="w-8 h-8 text-indigo-600" />
							</div>
							<h3 className="mt-6 text-xl font-semibold text-gray-800">Pencocokan Cerdas</h3>
							<p className="mt-2 text-gray-600">
								Teknologi AI kami memahami kebutuhan Anda, mencocokkan proyek dengan talenta yang paling relevan.
							</p>
						</div>
						<div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition">
							<div className="flex justify-center items-center mx-auto w-16 h-16 bg-indigo-100 rounded-full">
								<Briefcase className="w-8 h-8 text-indigo-600" />
							</div>
							<h3 className="mt-6 text-xl font-semibold text-gray-800">Proyek Berkualitas</h3>
							<p className="mt-2 text-gray-600">
								Temukan beragam proyek dari startup hingga korporasi besar yang terverifikasi dan siap dikerjakan.
							</p>
						</div>
						<div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition">
							<div className="flex justify-center items-center mx-auto w-16 h-16 bg-indigo-100 rounded-full">
								<Users className="w-8 h-8 text-indigo-600" />
							</div>
							<h3 className="mt-6 text-xl font-semibold text-gray-800">Komunitas Terkurasi</h3>
							<p className="mt-2 text-gray-600">
								Bergabunglah dengan jaringan profesional kreatif yang saling mendukung dan bertumbuh bersama.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* How It Works */}
			<section className="py-20 bg-white">
				<div className="max-w-6xl mx-auto px-6">
					<h2 className="text-3xl font-bold text-center text-slate-800">Bagaimana EkrafMate Bekerja?</h2>
					<div className="mt-12 grid md:grid-cols-3 gap-12">
						<div className="text-center">
							<div className="mx-auto w-16 h-16 bg-indigo-100 flex items-center justify-center rounded-full">
								<span className="text-2xl font-bold text-indigo-600">1</span>
							</div>
							<h3 className="mt-6 text-xl font-semibold">Buat Akun</h3>
							<p className="text-gray-600 mt-2">Daftar sebagai Kreator atau Klien dalam hitungan menit.</p>
						</div>
						<div className="text-center">
							<div className="mx-auto w-16 h-16 bg-indigo-100 flex items-center justify-center rounded-full">
								<span className="text-2xl font-bold text-indigo-600">2</span>
							</div>
							<h3 className="mt-6 text-xl font-semibold">Temukan Pasangan Tepat</h3>
							<p className="text-gray-600 mt-2">AI kami membantu mencocokkan proyek dengan talenta terbaik.</p>
						</div>
						<div className="text-center">
							<div className="mx-auto w-16 h-16 bg-indigo-100 flex items-center justify-center rounded-full">
								<span className="text-2xl font-bold text-indigo-600">3</span>
							</div>
							<h3 className="mt-6 text-xl font-semibold">Kolaborasi & Sukses</h3>
							<p className="text-gray-600 mt-2">Bekerja sama, selesaikan proyek, dan wujudkan karya hebat.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-20 bg-slate-50">
				<div className="max-w-6xl mx-auto px-6">
					<h2 className="text-3xl font-bold text-center text-slate-800">Apa Kata Mereka?</h2>
					<div className="mt-12 grid md:grid-cols-3 gap-8">
						<div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
							<p className="text-gray-600 italic text-justify">
								“Lewat EkrafMate saya bisa menemukan videografer lokal untuk proyek produk UMKM kami di Bandung. Hasilnya cepat, biayanya juga sesuai.”
							</p>
							<h4 className="mt-4 font-semibold text-gray-800">— Dwi, Pemilik Usaha Kuliner</h4>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
							<p className="text-gray-600 italic text-justify">
								“Sebagai ilustrator freelance, saya akhirnya bisa dapat project rutin dari brand dalam negeri. Fiturnya mudah dipakai dan banyak klien serius.”
							</p>
							<h4 className="mt-4 font-semibold text-gray-800">— Rani, Ilustrator Digital</h4>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
							<p className="text-gray-600 italic text-justify">
								“Platformnya sangat memudahkan kami mencari desainer kemasan lokal tanpa ribet. Komunikasi dan proses pembayarannya juga aman.”
							</p>
							<h4 className="mt-4 font-semibold text-gray-800">— Fajar, Brand Manager Kopi Nusantara</h4>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section className="py-16 bg-white" id="pricing">
				<div className="max-w-6xl mx-auto px-4">
					<h2 className="text-3xl font-bold text-center text-slate-800 mb-4">
						Pilih Paket Sesuai Kebutuhan Anda
					</h2>
					<p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
						Mulai gratis dengan semua fitur dasar, atau upgrade ke Premium untuk pengalaman eksklusif dan profesional.
					</p>
					<div className="grid md:grid-cols-2 gap-8">
						
						{/* Free Plan */}
						<div className="bg-slate-50 rounded-2xl shadow-lg p-8 flex flex-col hover:shadow-xl hover:scale-105 transition transform hover:-translate-y-1 relative">
							<span className="absolute top-0 right-0 bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-tr-2xl rounded-bl-xl">
								Best for Starters
							</span>
							<h3 className="text-2xl font-semibold text-indigo-600 mb-4">Gratis</h3>
							<p className="text-slate-600 mb-6">Semua fitur dasar untuk memulai perjalanan Anda.</p>
							<ul className="space-y-3 flex-grow">
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Registrasi akun (Creative atau Client)</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Login & autentikasi dasar</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Pencarian kreator & proyek (semantic search)</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Dashboard kreator & klien</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Posting & edit proyek</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Aplikasi ke proyek & manajemen kandidat</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Chatbot interaktif (basic)</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Profil publik & pengaturan profil</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Verifikasi email dasar</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Notifikasi dasar (toast)</li>
							</ul>
							<div className="mt-6">
								<Link
									to="/dashboard"
									className="block w-full bg-indigo-600 text-white py-3 rounded-xl text-center hover:bg-indigo-700 hover:scale-105 transition"
								>
									Mulai Gratis
								</Link>
							</div>
						</div>

						{/* Premium Plan */}
						<div className="bg-slate-50 rounded-2xl shadow-lg p-8 flex flex-col border-2 border-indigo-600 relative hover:shadow-xl hover:scale-105 transition transform hover:-translate-y-1">
							<span className="absolute top-0 right-0 bg-yellow-400 text-slate-800 text-sm font-bold px-3 py-1 rounded-tr-2xl rounded-bl-xl">
								Coming Soon
							</span>
							<h3 className="text-2xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
								Premium <Star className="text-yellow-500 w-5 h-5"/>
							</h3>
							<p className="text-slate-600 mb-6">Fitur eksklusif dan berkelas untuk profesional.</p>
							<ul className="space-y-3 flex-grow">
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> AI-Powered Smart Matching</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Advanced Analytics Dashboard</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Priority Project Placement</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Unlimited Applications</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Private Messaging & Collaboration Tools</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Custom Branding untuk profil/proyek</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Secure Cross-Border Payment</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> AI Resume & Portfolio Builder</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Team Management untuk klien</li>
								<li className="flex items-center gap-2"><Check className="text-green-600 w-5 h-5"/> Early Access to New Features</li>
							</ul>
							<div className="mt-6">
								<button className="w-full bg-gray-400 text-white py-3 rounded-xl cursor-not-allowed">
									Segera Hadir
								</button>
							</div>
						</div>

					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-indigo-600 text-white text-center">
				<div className="max-w-3xl mx-auto px-6">
					<h2 className="text-4xl font-bold">Siap Mulai Perjalanan Kreatif Anda?</h2>
					<p className="mt-4 text-lg text-indigo-100">
						Bergabunglah dengan ribuan kreator & klien yang sudah menemukan partner terbaik mereka di EkrafMate.
					</p>
					<div className="mt-8 flex justify-center gap-4">
						<Link
							to="/register"
							className="bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 shadow-lg transform hover:scale-105 transition"
						>
							Daftar Sekarang
						</Link>
						<Link
							to="/search"
							className="bg-transparent border-2 border-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-indigo-600  hover:scale-105 transition"
						>
							Temukan Talenta
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
