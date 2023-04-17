import { Route, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
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
import RequireAuth from "../auth/RequireAuth";
import Unauthorized from "../pages/Unauthorized";

const AppRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Routes> 
      <Route element={<RequireAuth/>}>
        <Route path="*" element={<Custom404/>}/>
        <Route path="/" element={<Home/>}>
          <Route path="unauthorized" element={<Unauthorized/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="admin" element={<Admin/>}/>
          <Route path="funcionarios/" element={<Funcionarios/>}>
            <Route path=":id" element={<Funcionario/>} />
            <Route path="create" element={<FuncionarioCreation/>} />
          </Route>
          <Route path="obras" element={<Obras/>}>
            <Route path="create" element={<ObraCreation/>}/>
            <Route path=":codigo" element={<Obra/>}>
              <Route path="folha-de-ponto/:data" element={<FolhaDePonto/>}/>
            </Route>
          </Route>
          <Route path="folha-de-ponto" element={<FolhasDePonto/>}>
            <Route path=":mercado/:data" element={<FolhaDePonto/>}/>
          </Route>
        </Route>
      </Route>
      
    </Routes>
  )
)

export default AppRoutes;
