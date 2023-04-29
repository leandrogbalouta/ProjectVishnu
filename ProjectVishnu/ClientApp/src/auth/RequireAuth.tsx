import { useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import GetConta from "../common/GetConta";
import useAuth from './useAuth';

interface Params {
  allowedRoles?: string[];
}

const RequireAuth = ({ allowedRoles }: Params) => {
  const location = useLocation();
  const { conta, setConta } = useAuth();
  useEffect(() => {
    // Detect if token still valid
    const cnt = GetConta();
    if (cnt) return setConta(cnt);
    
    localStorage.removeItem("DKMToken");
    setConta(undefined);
  }, [location]);
  return allowedRoles?.find((role) => conta?.tipoDeUser === role) ? (
    <Outlet />
  ) : conta?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
