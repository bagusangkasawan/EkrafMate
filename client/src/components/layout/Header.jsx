import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import {
  HeartHandshake,
  LogOut,
  LayoutDashboard,
  User,
  Briefcase,
  Search as SearchIcon,
  Settings,
  Menu,
  X,
} from 'lucide-react';

const Header = () => {
  const { userInfo } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = () => {
    sessionStorage.removeItem('chatbotMessages');
    dispatch(logout());
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (!userInfo) return '/';
    switch (userInfo.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'client':
        return '/dashboard/client';
      case 'creative':
        return '/dashboard/creative';
      default:
        return '/';
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <HeartHandshake className="w-7 h-7 text-indigo-600" />
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              EkrafMate
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `font-medium flex items-center ${
                  isActive
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`
              }
            >
              <SearchIcon className="w-4 h-4 mr-2" />
              Cari Talenta
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `font-medium flex items-center ${
                  isActive
                    ? 'text-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`
              }
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Jelajahi Proyek
            </NavLink>
          </nav>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center">
            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <User className="w-6 h-6 text-gray-700" />
                  <span className="ml-2 font-semibold text-gray-800 hidden md:block">
                    {userInfo.name}
                  </span>
                </button>

                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                transition-all duration-200 ease-out"
                >
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
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`px-4 py-2 border border-indigo-600 rounded-md font-medium transition ${
                    location.pathname === '/login'
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-600 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 border border-indigo-600 rounded-md font-medium transition ${
                    location.pathname === '/register'
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-600 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-sm">
          <div className="px-4 py-3 space-y-2">
            <NavLink
              to="/search"
              onClick={() => setIsMenuOpen(false)}
              className="block px-2 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
            >
              <SearchIcon className="w-4 h-4 inline mr-2" />
              Cari Talenta
            </NavLink>

            <NavLink
              to="/projects"
              onClick={() => setIsMenuOpen(false)}
              className="block px-2 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
            >
              <Briefcase className="w-4 h-4 inline mr-2" />
              Jelajahi Proyek
            </NavLink>

            <hr className="my-2" />

            {userInfo ? (
              <>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                >
                  <LayoutDashboard className="w-4 h-4 inline mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/settings/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-2 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  Pengaturan
                </Link>
                <button
                  onClick={() => {
                    logoutHandler();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-2 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                >
                  <LogOut className="w-4 h-4 inline mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-600 hover:text-white text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-600 hover:text-white text-center"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
