import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

interface Params {
    allowedRoles? : string[]
}

const RequireAuth = ( {allowedRoles} : Params) => {
    const { conta } = useAuth()
    const location = useLocation()
    console.log(allowedRoles);

    return(
        allowedRoles?.find(role => conta?.tipoDeUser === role)
            ? <Outlet /> 
            : conta?.username
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequireAuth