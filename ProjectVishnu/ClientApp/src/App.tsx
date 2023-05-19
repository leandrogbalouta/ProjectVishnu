import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppRoutes from "./common/AppRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import ThemeContextProvider from "./components/contexts/Theme/ThemeContextProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <ChakraProvider>
            <AnimatePresence exitBeforeEnter>
              <AppRoutes />
            </AnimatePresence>
        </ChakraProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
