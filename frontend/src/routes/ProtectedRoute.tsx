import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/storage';

export function ProtectedRoute() {
  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
