import React from "react";
import analytics from "./../img/analytics.svg";
import { msalConfig } from "../auth/b2cPolicies";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { AuthenticationResult } from "@azure/msal-common/dist/response/AuthenticationResult";
import { EventPayload } from "@azure/msal-browser/dist/event/EventMessage";
export default function Home() {
  function isAuthenticationResult(
    payload: EventPayload
  ): payload is AuthenticationResult {
    return (payload as AuthenticationResult)?.account !== undefined;
  }
  /**
   * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
   * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
   */
  const msalInstance = new PublicClientApplication(msalConfig);

  // Default to using the first account if no account is active on page load
  if (
    !msalInstance.getActiveAccount() &&
    msalInstance.getAllAccounts().length > 0
  ) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  msalInstance.addEventCallback((event) => {
    if (
      (event.eventType === EventType.LOGIN_SUCCESS ||
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
        event.eventType === EventType.SSO_SILENT_SUCCESS) &&
      isAuthenticationResult(event.payload) && // type guard
      event.payload.account
    ) {
      msalInstance.setActiveAccount(event.payload.account);
    }
  });
  

  return (
    <div className="w-full h-full flex flex-col">
      <p className="text-2xl sm:text-3xl sm:mt-10 sm:ml-10">Bem-vindo.</p>
      <img src={analytics} alt="" className="mx-auto sm:w-1/2" />
    </div>
  );
}
