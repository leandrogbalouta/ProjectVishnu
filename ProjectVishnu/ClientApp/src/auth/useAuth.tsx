import { useContext } from "react";
import { ContaContext } from "../components/contexts/Conta/ContaContext"

const useAuth = () => {
    return useContext(ContaContext)
}

export default useAuth