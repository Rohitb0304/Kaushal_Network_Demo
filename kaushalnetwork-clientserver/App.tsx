import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

// Pages and Components
import CompanyUserLogin from './pages/Auth/CompanyUserLogin';
import NotFoundPage from './pages/NotFoundPage';
import CompanyUserSignup from './pages/CompanyUserSignup';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import Register from './pages/Auth/Register';
import Buzz from './pages/Naviation_pages/Buzz';
import NetworkPage from './pages/Naviation_pages/Network_Page';
import CompanyDetails from './pages/CompanyDetails';
import AdminView from './pages/Admin/AdminView';
import SuperadminLogin from './pages/Admin/Superadmin/SuperadminLogin';
import AdminDashboard from './pages/Admin/Dashboard/SuperAdminDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import TenderForm from './components/tender/TenderForm';
import CompanyView from './pages/CompanyView';
import ExternalRedirect from './components/ExternalRedirect';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute.js';
import ContactUs from './pages/Auth/components/ContactUs.tsx';
import TermsOfUse from './components/TermsOfUse.tsx';
import PrivacyOfPolicy from './components/PrivacyOfPolicy.tsx';
import Shipping from './components/Shipping.tsx';
import Cancellation from './components/Cancellation.tsx';
import Complaint from './components/Complaint.tsx';
import FAQs from './components/FAQs.tsx';
import AboutUs from './components/AboutUs.tsx'; // Import the AboutUs component

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
          Cookies.remove('auth_token');
          Cookies.remove('admin_view');
          navigate('/');
        }
      } catch (err) {
        console.error('Invalid token:', err);
        Cookies.remove('auth_token');
        Cookies.remove('admin_view');
        navigate('/');
      }
    }
  }, [location.pathname]);

  // Only hide the navbar on the exact /admin/dashboard route
  const hideNavbar = location.pathname === '/superadmin/dashboard';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="mt-4 bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<CompanyUserLogin />} />
          <Route path="/signup" element={<CompanyUserSignup />} />
          <Route path="/register" element={<Register />} />

          {/* Redirect Buzz route to external website */}
          <Route path="/buzz" element={<ExternalRedirect to="https://buzzin.rjctcsccs.org/" />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
          <Route path="/tender/create" element={<TenderForm />} />
          <Route path="/company-view" element={<CompanyView />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin-view"
            element={
              <ProtectedAdminRoute>
                <AdminView />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/superadmin/dashboard" element={<AdminDashboard />} />
          <Route path="/superadmin/login" element={<SuperadminLogin />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyOfPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/refund" element={<Cancellation />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/about" element={<AboutUs />} /> {/* The new About Us route */}

          {/* Catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
