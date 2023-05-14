import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

interface Params {
  allowedRoles: string[];
}

export const RequireRole = ({ allowedRoles }: Params) => {
  const conta = useAuth();
  const isAllowed: boolean = !!allowedRoles?.find(
    (role) => conta?.role === role
  );
  return isAllowed ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};
