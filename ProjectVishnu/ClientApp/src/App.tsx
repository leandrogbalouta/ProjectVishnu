import {
  RouterProvider,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import AppRoutes from "./common/AppRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import ThemeContextProvider from "./components/contexts/Theme/ThemeContextProvider";

function App() {
  return (
    <ThemeContextProvider>
      <ChakraProvider>
        <AnimatePresence exitBeforeEnter>
          <Layout>
            <RouterProvider router={AppRoutes} />
          </Layout>
        </AnimatePresence>
      </ChakraProvider>
    </ThemeContextProvider>
  );
}
export default App;
