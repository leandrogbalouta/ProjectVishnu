import { RouterProvider } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import AppRoutes from "./common/AppRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import ThemeContextProvider from "./components/contexts/Theme/ThemeContextProvider";
import { ContaContextProvider } from "./components/contexts/Conta/ContaContextProvider";

function App() {
  return (
    <ThemeContextProvider>
      <ChakraProvider>
        <AnimatePresence exitBeforeEnter>
          <ContaContextProvider>
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
