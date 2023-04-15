import react from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages";
import Custom404 from "../pages/404";
import FolhasDePonto from "../pages/folha-de-ponto/FolhasDePontoList";
import Funcionarios from "../pages/funcionarios/FuncionariosList";
import FuncionarioCreation from "../pages/funcionarios/FuncionariosCreation";
import Funcionario from "../pages/funcionarios/Funcionario";
import Obras from "../pages/obras/ObrasList";
import ObraCreation from "../pages/obras/ObraCreation";
import Obra from "../pages/obras/Obra";
import FolhaDePonto from "../pages/folha-de-ponto/FolhaDePonto";
import { Admin } from "../pages/Admin";
import Login from "../pages/Login";

const AppRoutes = createBrowserRouter([
  {
    path: "*",
    element: <Custom404 />,
  },
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/funcionarios",
    element: <Funcionarios />,
  },
  {
    path: "/obras",
    element: <Obras />,
  },
  {
    path: "/funcionarios/:id",
    element: <Funcionario />,
  },
  {
    path: "/funcionarios/create",
    element: <FuncionarioCreation />,
  },
  {
    path: "/obras/:codigo",
    element: <Obra />,
  },
  {
    path: "/obras/create",
    element: <ObraCreation />,
  },
  {
    path: "/obras/:codigo/folha-de-ponto/:data",
    element: <FolhaDePonto />,
  },
  {
    path: "/folha-de-ponto/:mercado/:data",
    element: <FolhaDePonto />,
  },
  {
    path: "folha-de-ponto",
    element: <FolhasDePonto />,
  },
]);
export default AppRoutes;
