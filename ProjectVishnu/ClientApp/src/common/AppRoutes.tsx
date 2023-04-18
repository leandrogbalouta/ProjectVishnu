import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Custom404 from "../pages/404";
import { Admin, CriarUtilizador, CriarMercado } from "../pages/admin";
import Login from "../pages/Login";
import RequireAuth from "../auth/RequireAuth";
import Unauthorized from "../pages/Unauthorized";
import Layout from "../components/Layout";
import { FolhaDePonto, FolhasDePonto } from "../pages/folha-de-ponto";
import {
  Funcionario,
  FuncionarioCreation,
  Funcionarios,
} from "../pages/funcionarios/";
import { ObraCreation, Obra, Obras } from "../pages/obras";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="*" element={<Custom404 />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="admin" element={<Admin />} />
          <Route path="admin/criar-utilizador" element={<CriarUtilizador />} />
          <Route path="admin/criar-mercado" element={<CriarMercado />} />
          <Route element={<RequireAuth allowedRoles={["user", "admin"]} />}>
            <Route path="funcionarios" element={<Funcionarios />} />
            <Route
              path="funcionarios/create"
              element={<FuncionarioCreation />}
            />
            <Route path="funcionarios/:id" element={<Funcionario />} />
            <Route path="obras" element={<Obras />} />
            <Route path="obras/create" element={<ObraCreation />} />
            <Route path="obras/:codigo" element={<Obra />} />
            <Route
              path="obras/folha-de-ponto/:data"
              element={<FolhaDePonto />}
            />
            <Route path="folha-de-ponto" element={<FolhasDePonto />} />
            <Route
              path="folha-de-ponto/:mercado/:data"
              element={<FolhaDePonto />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
