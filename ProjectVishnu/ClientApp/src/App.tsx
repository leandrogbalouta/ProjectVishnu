import { RouterProvider, useLocation } from "react-router-dom";
import { MsalProvider, useMsal } from '@azure/msal-react';
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import AppRoutes from "./common/AppRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import ThemeContextProvider from "./components/contexts/Theme/ThemeContextProvider";

function App() {
  const { instance } = useMsal();
  return (
    
    <ThemeContextProvider>
      <ChakraProvider>
        <AnimatePresence exitBeforeEnter>
          <Layout>
            <MsalProvider instance={instance}>
              <RouterProvider router={AppRoutes} />
            </MsalProvider>
          </Layout>
        </AnimatePresence>
      </ChakraProvider>
    </ThemeContextProvider>
  );
}
export default App;
