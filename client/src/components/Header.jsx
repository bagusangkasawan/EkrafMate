import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { LogOut, LayoutDashboard, User, Briefcase, Search as SearchIcon, Settings } from 'lucide-react';

const Header = () => {
  const { userInfo } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!userInfo) return '/';
    switch (userInfo.role) {
      case 'admin': return '/dashboard/admin';
      case 'client': return '/dashboard/client';
      case 'creative': return '/dashboard/creative';
      default: return '/';
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-indigo-600">EkrafMate</Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/search" className="text-gray-600 hover:text-indigo-600 font-medium flex items-center"><SearchIcon className="w-4 h-4 mr-2"/>Cari Talenta</Link>
            <Link to="/projects" className="text-gray-600 hover:text-indigo-600 font-medium flex items-center"><Briefcase className="w-4 h-4 mr-2"/>Jelajahi Proyek</Link>
          </nav>
          <div className="flex items-center">
            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <User className="w-6 h-6 text-gray-700" />
                  <span className="ml-2 font-semibold text-gray-800 hidden md:block">{userInfo.name}</span>
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                transition-all duration-200 ease-out">
                  <Link 
                    to={getDashboardLink()} 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
                  </Link>
                  <Link 
                    to="/settings/profile" 
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                  >
                    <Settings className="w-4 h-4 mr-2" /> Pengaturan
                  </Link>
                  <button 
                    onClick={logoutHandler} 
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">Login</Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium shadow-sm">Daftar</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
