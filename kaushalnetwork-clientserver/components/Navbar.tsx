import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import {
  Cookie,
  Menu,
  X,
  AlertCircle,
  ChevronDown,
  LogOut,
  User,
  Box,
  Settings,
  Home,
  Network,
  Bell,
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImage from '../logo/image.png';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, checkAuthToken } from '../features/auth/authSlice';
import { RootState, AppDispatch } from '../app/store';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingOverlay from './ui/LoadingOverlay';
import api from '../services/api';
interface UserProfile {
  id: number;
  username: string;
  name: string;
  designation: string;
  email: string;
  countryCode: string;
  contactNumber: string;
  admin: boolean;
  imageUrl: string;
}

// Main Navbar Component
const Navbar: React.FC = () => {
  // --- All hooks and state management remain the same ---
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingSubMessage, setLoadingSubMessage] = useState('');
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Toggle menus
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleAccountMenu = () => setShowAccountMenu(!showAccountMenu);

  // Close menus when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the account menu button and the menu itself
      if (!(event.target as Element).closest('#account-menu-button, #account-menu')) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  useEffect(() => {
    const token = Cookies.get('auth_token')
    if (isAuthenticated && token) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/company-user/me');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile information');
    }
  };

  // Check if a nav link is active
  const isActive = (path: string) => location.pathname === path;

  // --- All effects for auth checking, verification, etc., remain the same ---
  useEffect(() => {
    const isAuth = checkAuthToken();
    if (!isAuth && isAuthenticated) {
      dispatch(logoutUser());
    }
  }, []);

  useEffect(() => {
    const adminView = Cookies.get('admin_view') === 'true';
    const authToken = Cookies.get('auth_token');
    setIsAdminView(adminView);

    if (!adminView && authToken && window.location.pathname === '/login') {
      navigate('/company-view');
    }
  }, [navigate]);

  useEffect(() => {
    const checkVerification = async () => {
      const token = Cookies.get('auth_token');
      if (token) {
        try {
          const response = await axios.get(
            ` ${import.meta.env.VITE_API_BASE_URL}/api/v0/company/company-user-view`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsVerified(response.data.verified);
        } catch (error) {
          console.error('Error checking verification:', error);
        }
      }
    };

    checkVerification();
  }, []);

  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = Cookies.get('auth_token');
      if (!authToken && isAuthenticated) {
        dispatch(logoutUser());
      }
    };

    checkAuthStatus();
    const intervalId = setInterval(checkAuthStatus, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, isAuthenticated]);

  // --- All handlers (logout, navigation) remain functionally the same ---
  const handleLogout = async () => {
    try {
      setLoadingMessage('Logging Out');
      setLoadingSubMessage('Thank you for using Kaushal Network');
      setIsLoading(true);

      setTimeout(async () => {
        await dispatch(logoutUser());
        Cookies.remove('auth_token');
        setIsVerified(false);
        setIsAdminView(false);
        setIsLoading(false);
        navigate('/login');
        toast.success('Logged out successfully');
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast.error('Error during logout');
    }
  };

  const handleAdminNavigation = async () => {
    const isAdmin = Cookies.get('admin_view') === 'true';
    if (!isAdmin) {
      toast.error('Access denied: Admin privileges required');
      return;
    }

    setLoadingMessage('Switching to Admin Dashboard');
    setLoadingSubMessage('Loading administrative controls...');
    setIsLoading(true);

    setTimeout(() => {
      navigate('/admin-view');
      window.location.reload();
    }, 1500);
  };

  const handleUserViewNavigation = async () => {
    setLoadingMessage('Welcome Back');
    setLoadingSubMessage('Loading your dashboard...');
    setIsLoading(true);

    setTimeout(() => {
      navigate('/company-view');
      window.location.reload();
    }, 1500);
  };

  const handleUnverifiedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.error('Your account needs verification to access this feature', {
      icon: '🔒',
      duration: 4000,
    });
  };

  const canAccessFeature = isAuthenticated && isVerified;

  // --- UI-focused improvements start here ---
  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingOverlay message={loadingMessage} subMessage={loadingSubMessage} />}
      </AnimatePresence>

      {/* IMPROVEMENT: Refined header with a more subtle shadow and border */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-900/10 sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-screen-2xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* IMPROVEMENT: Enhanced logo with more subtle hover effects */}
              <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-500 to-indigo-600 p-0.5 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                    <div className="w-full h-full bg-white rounded-[14px] p-1 flex items-center justify-center">
                      <img
                        src={logoImage}
                        alt="Kaushal Network"
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent tracking-tighter">
                    Kaushal Network
                  </h1>
                  <p className="text-xs font-medium text-slate-500 -mt-1 tracking-wide">
                    Connecting Growth
                  </p>
                </div>
              </Link>

              {/* IMPROVEMENT: Central navigation now feels more integrated and less "buttony" */}
              <div className="hidden md:flex items-center justify-center flex-1">
                <nav className="flex items-center space-x-2 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/80">
                  <NavButton
                    onClick={() => navigate('/')}
                    active={isActive('/')}
                    icon={<Home size={18} />}
                  >
                    Home
                  </NavButton>

                  {isAuthenticated && (
                    <>
                      {isAdminView ? (
                        <NavButton
                          onClick={handleAdminNavigation}
                          active={isActive('/admin-view')}
                          icon={<Box size={18} />}
                          highlight
                        >
                          Admin
                        </NavButton>
                      ) : (
                        Cookies.get('auth_token') && (
                          <NavButton
                            onClick={handleUserViewNavigation}
                            active={isActive('/company-view')}
                            icon={<User size={18} />}
                          >
                            Dashboard
                          </NavButton>
                        )
                      )}

                      <FeatureNavButton
                        onClick={
                          canAccessFeature ? () => navigate('/network') : handleUnverifiedClick
                        }
                        disabled={!canAccessFeature}
                        verified={isVerified}
                        active={isActive('/network')}
                        icon={<Network size={18} />}
                      >
                        Network
                      </FeatureNavButton>

                      <FeatureNavButton
                        onClick={canAccessFeature ? () => navigate('/buzz') : handleUnverifiedClick}
                        disabled={!canAccessFeature}
                        verified={isVerified}
                        active={isActive('/buzz')}
                        icon={<Bell size={18} />}
                      >
                        BUZZ
                      </FeatureNavButton>
                    </>
                  )}
                </nav>
              </div>

              {/* IMPROVEMENT: Sleeker auth buttons and more interactive account menu */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      id="account-menu-button"
                      onClick={e => {
                        e.stopPropagation();
                        toggleAccountMenu();
                      }}
                      className="flex items-center gap-3 p-1.5 rounded-full bg-white hover:bg-slate-50 transition-colors duration-200 group border border-slate-200/80 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow text-base">
                        {isAdminView && profile?.imageUrl ? (
                          <img
                            src={profile.imageUrl}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          'U'
                        )}
                      </div>
                      <div className="hidden sm:block text-left pr-2">
                        <p className="text-sm font-semibold text-slate-800 leading-tight">
                          {isAdminView ? 'Admin' : 'Account'}
                        </p>
                        <p className="text-xs text-slate-500 leading-tight">Menu</p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 mr-2 transition-transform duration-300 ${showAccountMenu ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {showAccountMenu && (
                        <motion.div
                          id="account-menu"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute right-0 mt-3 w-72 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden z-30"
                        >
                          <div className="p-4 border-b border-slate-200/80">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg text-lg">
                                {isAdminView && profile?.imageUrl ? (
                                  <img
                                    src={profile.imageUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                ) : (
                                  'U'
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-800">{profile?.name}</p>
                                <p className="text-sm text-slate-500 truncate">{profile?.email}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <MenuButton
                              icon={<User className="text-blue-500" />}
                              onClick={() => {
                                setShowAccountMenu(false);
                                navigate('/profile');
                              }}
                            >
                              {' '}
                              My Profile{' '}
                            </MenuButton>
                            <MenuButton
                              icon={<Settings className="text-slate-500" />}
                              onClick={() => {
                                setShowAccountMenu(false);
                                navigate('/settings');
                              }}
                            >
                              {' '}
                              Account Settings{' '}
                            </MenuButton>
                            <div className="h-px bg-slate-200/80 my-1 mx-2"></div>
                            <MenuButton
                              icon={<LogOut className="text-red-500" />}
                              onClick={() => {
                                setShowAccountMenu(false);
                                handleLogout();
                              }}
                              danger
                            >
                              {' '}
                              Logout{' '}
                            </MenuButton>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => navigate('/login')}
                      className="text-slate-700 font-semibold hover:text-blue-600 hover:bg-slate-100 transition-colors duration-200 px-6 py-2.5 rounded-full"
                    >
                      Login
                    </Button>
                    <Button
                      className="bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2.5 rounded-full"
                      onClick={() => navigate('/register')}
                    >
                      Get Started
                    </Button>
                  </div>
                )}

                <div className="md:hidden">
                  <button
                    onClick={toggleMenu}
                    className="p-3 rounded-full text-slate-600 hover:text-blue-600 hover:bg-slate-100 focus:outline-none transition-colors duration-200 border border-slate-200"
                  >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IMPROVEMENT: Mobile menu is more structured with sections */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-slate-200/80 bg-white"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                <MobileNavButton
                  onClick={() => {
                    navigate('/');
                    setIsOpen(false);
                  }}
                  active={isActive('/')}
                >
                  {' '}
                  <Home className="mr-3" /> Home{' '}
                </MobileNavButton>

                {isAuthenticated ? (
                  <>
                    <div className="pt-2 text-xs font-semibold text-slate-400 px-4 mt-2">
                      DASHBOARD
                    </div>
                    {isAdminView ? (
                      <MobileNavButton
                        onClick={() => {
                          handleAdminNavigation();
                          setIsOpen(false);
                        }}
                        active={isActive('/admin-view')}
                      >
                        {' '}
                        <Box className="mr-3" /> Admin View{' '}
                      </MobileNavButton>
                    ) : (
                      Cookies.get('auth_token') && (
                        <MobileNavButton
                          onClick={() => {
                            handleUserViewNavigation();
                            setIsOpen(false);
                          }}
                          active={isActive('/company-view')}
                        >
                          {' '}
                          <User className="mr-3" /> Dashboard{' '}
                        </MobileNavButton>
                      )
                    )}

                    <div className="pt-2 text-xs font-semibold text-slate-400 px-4 mt-2">
                      FEATURES
                    </div>
                    <MobileNavButton
                      onClick={e => {
                        if (canAccessFeature) {
                          navigate('/network');
                          setIsOpen(false);
                        } else {
                          handleUnverifiedClick(e);
                        }
                      }}
                      active={isActive('/network')}
                      disabled={!canAccessFeature}
                    >
                      <Network className="mr-3" /> Network{' '}
                      {!isVerified && <AlertCircle className="w-4 h-4 text-amber-500 ml-auto" />}
                    </MobileNavButton>
                    <MobileNavButton
                      onClick={e => {
                        if (canAccessFeature) {
                          navigate('/buzz');
                          setIsOpen(false);
                        } else {
                          handleUnverifiedClick(e);
                        }
                      }}
                      active={isActive('/buzz')}
                      disabled={!canAccessFeature}
                    >
                      <Bell className="mr-3" /> BUZZ{' '}
                      {!isVerified && <AlertCircle className="w-4 h-4 text-amber-500 ml-auto" />}
                    </MobileNavButton>

                    <div className="pt-2 text-xs font-semibold text-slate-400 px-4 mt-2">
                      ACCOUNT
                    </div>
                    <MobileNavButton
                      onClick={() => {
                        navigate('/profile');
                        setIsOpen(false);
                      }}
                    >
                      {' '}
                      <User className="mr-3" /> Profile{' '}
                    </MobileNavButton>
                    <MobileNavButton
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      danger
                    >
                      {' '}
                      <LogOut className="mr-3" /> Logout{' '}
                    </MobileNavButton>
                  </>
                ) : (
                  <>
                    <div className="pt-4 mt-4 border-t border-slate-200 space-y-2">
                      <MobileNavButton
                        onClick={() => {
                          navigate('/login');
                          setIsOpen(false);
                        }}
                      >
                        {' '}
                        <User className="mr-3" /> Login{' '}
                      </MobileNavButton>
                      <Button
                        className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white py-3"
                        onClick={() => {
                          navigate('/register');
                          setIsOpen(false);
                        }}
                      >
                        Get Started Free
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* IMPROVEMENT: Refined verification banner with better contrast and softer colors */}
      {!isVerified && isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border-b border-amber-200/70 sticky top-20 z-40"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-3 text-amber-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-500" />
              <p className="text-sm font-medium">
                <span className="font-bold">Account Pending:</span> Some features are limited until
                you're verified.
              </p>
              <button className="ml-auto px-4 py-1.5 text-xs font-bold bg-white text-amber-800 rounded-full transition-all duration-300 shadow-sm border border-amber-200/80 hover:bg-amber-100 hover:shadow-md">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

// --- Redesigned Helper Components for a cleaner, more interactive UI ---

// Animated NavButton with an underline indicator
const NavButton = ({
  children,
  onClick,
  active = false,
  icon,
  highlight = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  icon?: React.ReactNode;
  highlight?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center gap-2 ${active ? 'text-white' : highlight ? 'text-purple-600' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}
  >
    {active && (
      <motion.div
        layoutId="nav-pill"
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md"
        style={{ borderRadius: 9999 }}
      />
    )}
    <span className="relative z-10">{icon}</span>
    <span className="relative z-10">{children}</span>
  </button>
);

// Simplified FeatureNavButton that builds on the new NavButton style
const FeatureNavButton = ({
  children,
  onClick,
  disabled = false,
  verified = true,
  active = false,
  icon,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  verified?: boolean;
  active?: boolean;
  icon?: React.ReactNode;
}) => (
  <div className="relative group">
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${active ? 'text-white' : 'text-slate-600 hover:bg-white hover:text-slate-900'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {active && (
        <motion.div
          layoutId="nav-pill"
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md"
          style={{ borderRadius: 9999 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
      {!verified && (
        <div className="relative z-10 ml-1.5 flex items-center justify-center w-4 h-4 bg-amber-400 rounded-full">
          {' '}
          <AlertCircle className="w-2.5 h-2.5 text-white" />{' '}
        </div>
      )}
    </button>
    {!verified && (
      <div className="absolute hidden group-hover:block w-64 p-3 bg-white text-slate-700 text-xs rounded-lg bottom-full mb-2 left-1/2 -translate-x-1/2 shadow-lg border border-slate-200 z-30 font-semibold text-center">
        {' '}
        <p>Account verification required for this feature.</p>{' '}
      </div>
    )}
  </div>
);

// More interactive MenuButton
const MenuButton = ({
  children,
  onClick,
  icon,
  danger = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm font-medium transition-all duration-200 group ${danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-700 hover:bg-slate-100'}`}
  >
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span className="flex-1">{children}</span>
  </button>
);

// Cleaner, more defined MobileNavButton
const MobileNavButton = ({
  children,
  onClick,
  active = false,
  disabled = false,
  danger = false,
}: {
  children: React.ReactNode;
  onClick: (e?: React.MouseEvent) => void;
  active?: boolean;
  disabled?: boolean;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex w-full items-center px-4 py-3 text-base font-semibold rounded-lg transition-all duration-200 ${
      disabled
        ? 'text-slate-400 bg-slate-50 cursor-not-allowed'
        : active
          ? 'bg-blue-500 text-white shadow-md'
          : danger
            ? 'text-red-500 hover:bg-red-50'
            : 'text-slate-700 hover:bg-slate-100'
    }`}
  >
    {children}
  </button>
);

export default Navbar;
