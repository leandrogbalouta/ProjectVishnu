import react from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages";
import Custom404 from "../pages/404";
import FolhasDePonto from "../pages/folha-de-ponto";
import FolhaDePonto from "../pages/folha-de-ponto";
import Funcionarios from "../pages/funcionarios";
import FuncionarioCreation from "../pages/funcionarios/create";
import Funcionario from "../pages/funcionarios/[id]";
import Obras from "../pages/obras";
import ObraCreation from "../pages/obras/create";
import Obra from "../pages/obras/[codigo]";

const AppRoutes = createBrowserRouter([
  {
    path: "*",
    element: <Custom404/>
  },
  {
    path: "/",
    element: <Home />,
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