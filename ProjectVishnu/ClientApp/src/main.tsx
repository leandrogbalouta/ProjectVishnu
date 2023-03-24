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
  },
};
const pca = new PublicClientApplication(configuration);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
