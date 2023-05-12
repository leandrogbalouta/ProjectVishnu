import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export const RequireAuth = () => {
  const location = useLocation();
  const conta = useAuth();
  
  return conta ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
