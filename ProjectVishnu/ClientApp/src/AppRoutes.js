import { Counter } from "./components/Counter";
import { Funcionarios } from "./components/Funcionarios";
import { Obras } from "./components/Obras";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/funcionarios',
    element: <Funcionarios />
    },
    {
      path: '/obras',
      element: <Obras />
    }
];

export default AppRoutes;
