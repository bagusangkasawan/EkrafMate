import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import CreativeDashboardPage from './pages/CreativeDashboardPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import Chatbot from './components/Chatbot';
import PublicProfilePage from './pages/PublicProfilePage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import AdminUserEditPage from './pages/AdminUserEditPage';
import VerificationPage from './pages/VerificationPage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectEditPage from './pages/ProjectEditPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile/:id" element={<PublicProfilePage />} />
          <Route path="/verify/:token" element={<VerificationPage />} />
          <Route path="/verification-success" element={<VerificationPage success />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          
          {/* Rute Terproteksi */}
          <Route element={<ProtectedRoute allowedRoles={['creative', 'client', 'admin']} />}>
            <Route path="/settings/profile" element={<ProfileSettingsPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['creative']} />}>
            <Route path="/dashboard/creative" element={<CreativeDashboardPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['client']} />}>
            <Route path="/dashboard/client" element={<ClientDashboardPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/user/:id/edit" element={<AdminUserEditPage />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
            <Route path="/project/:id/edit" element={<ProjectEditPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
