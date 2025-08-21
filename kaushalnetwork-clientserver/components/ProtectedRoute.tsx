import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = Cookies.get('auth_token');

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded: { exp?: number } = jwtDecode(token);

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      Cookies.remove('auth_token');
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch (err) {
    Cookies.remove('auth_token');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
