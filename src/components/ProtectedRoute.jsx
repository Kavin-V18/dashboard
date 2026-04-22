

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuth = useSelector(s => s.auth.isAuthenticated);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

