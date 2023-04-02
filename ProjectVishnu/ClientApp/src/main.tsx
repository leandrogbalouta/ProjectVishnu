import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
// MSAL configuration
const configuration: Configuration = {
  auth: {
    // TODO hide this or smt
    clientId: "b7b0a9e6-8a1c-4f64-8528-1b832afcdc2c",
    authority:
      "https://login.microsoftonline.com/2d7758c3-c939-469f-bb61-4a743170a94a",

  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
const publicClientApplication = new PublicClientApplication(configuration);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={publicClientApplication}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
