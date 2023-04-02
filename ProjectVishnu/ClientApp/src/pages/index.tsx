import logo from "../img/logo.jpg";
import { msalConfig } from "../auth/b2cPolicies";
import { PublicClientApplication, EventType, InteractionType } from "@azure/msal-browser";
import { AuthenticationResult } from "@azure/msal-common/dist/response/AuthenticationResult";
import { EventPayload } from "@azure/msal-browser/dist/event/EventMessage";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";

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

  function WelcomeUser() {
    const { accounts } = useMsal();
    const username = accounts[0].username;

    return <p>Welcome, {username}</p>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
        <WelcomeUser />
      </MsalAuthenticationTemplate>
      <img src={logo} alt="" className="mx-auto my-12 sm:w-1/2 rounded-xl" />
    </div>
  );
}
