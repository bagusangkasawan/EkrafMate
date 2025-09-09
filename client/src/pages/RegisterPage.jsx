import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('creative');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
        toast.error('Password minimal harus 6 karakter.');
        return;
    }
    setLoading(true);
    const resultAction = await dispatch(register({ name, username, email, password, role }));
    if (register.fulfilled.match(resultAction)) {
      setSuccess(true);
    } else {
      toast.error(resultAction.payload || 'Gagal mendaftar. Username/Email mungkin sudah digunakan.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-128px)] bg-slate-50 p-4">
        <div className="max-w-md w-full text-center p-10 bg-white rounded-xl shadow-lg">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Registrasi Berhasil!</h2>
            <p className="mt-2 text-gray-600">Kami telah mengirimkan link verifikasi ke email Anda. Silakan periksa inbox (dan folder spam) Anda untuk melanjutkan.</p>
            <Link to="/login" className="mt-8 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700">
                Kembali ke Login
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 bg-slate-50">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
            <div><h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Buat Akun Baru</h2></div>
            <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <div className="rounded-md shadow-sm space-y-4">
                <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Nama Lengkap" />
                <input value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Username (tanpa spasi, _ atau angka)" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Alamat Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Password (min. 6 karakter)" />
                <div>
                    <div className="mt-2 flex border border-gray-300 rounded-md p-1 bg-gray-50">
                        <button type="button" onClick={() => setRole('creative')} className={`w-1/2 py-2 rounded-md transition-colors ${role === 'creative' ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Pelaku Kreatif</button>
                        <button type="button" onClick={() => setRole('client')} className={`w-1/2 py-2 rounded-md transition-colors ${role === 'client' ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}>Pemberi Proyek</button>
                    </div>
                </div>
            </div>
            <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400">
                    {loading ? 'Mendaftar...' : 'Daftar'}
                </button>
            </div>
            </form>
        </div>
    </div>
  );
};

export default RegisterPage;
