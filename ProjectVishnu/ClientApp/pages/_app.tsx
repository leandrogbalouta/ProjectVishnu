import React, { useEffect } from "react";
import "../styles/site.css";
import Layout from "../components/Layout";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import ThemeContextProvider from "../components/ThemeContextWrapper";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </ThemeContextProvider>
  );
}
