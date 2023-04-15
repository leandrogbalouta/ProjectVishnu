import { RouterProvider, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import AppRoutes from "./common/AppRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import ThemeContextProvider from "./components/contexts/Theme/ThemeContextProvider";
import {
  ContaContext,
  ContaContextProvider,
} from "./components/contexts/ContaContext";
import { useState } from "react";
import Role from "./common/Role";
import IConta from './common/Interfaces/IConta';

function App() {
  const [conta, setConta] = useState<IConta | undefined>();
  return (
    <ThemeContextProvider>
      <ChakraProvider>
        <AnimatePresence exitBeforeEnter>
          <ContaContextProvider value={{conta, setConta}}>
            <Layout>
              <RouterProvider router={AppRoutes} />
            </Layout>
          </ContaContextProvider>
        </AnimatePresence>
      </ChakraProvider>
    </ThemeContextProvider>
  );
}
export default App;
