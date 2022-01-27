import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap-custom.scss";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig, protectedResources } from "./authConfig";
export const msalInstance = new PublicClientApplication(msalConfig);
const accounts = msalInstance.getAllAccounts();
if (accounts.length == 1) {
  const account = accounts[0];
  if (account?.tenantId === msalConfig.auth.tenantId) {
    msalInstance.setActiveAccount(account);
  }
} else if (accounts.length > 1) {
  accounts.forEach((account) => {
    if (account?.tenantId === msalConfig.auth.tenantId) {
      msalInstance.setActiveAccount(account);
    }
  });
}
function loginRedirect() {
  try {
    const loginRequest = {
      scopes: protectedResources.quizApi.scopes,
    };
    msalInstance.loginRedirect(loginRequest);
  } catch (err) {
    console.log(err);
  }
}
msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  } else if (event.eventType === EventType.ACQUIRE_TOKEN_FAILURE) {
    if (event.error?.name === "InteractionRequiredAuthError" && window.location.pathname.startsWith(protectedResources.quizApi.path)) {
      loginRedirect();
    } else {
      console.log("ACQUIRE_TOKEN_FAILURE");
    }
  } else if (event.eventType === EventType.LOGIN_FAILURE) {
    if (event.error?.name === "BrowserAuthError" && window.location.pathname.startsWith(protectedResources.quizApi.path)) {
      loginRedirect();
    } else {
      console.log("LOGIN FAILURE");
    }
  } else {
    console.log("Callback finished");
  }
});
msalInstance
  .handleRedirectPromise()
  .then(() => {
    if (window.location.pathname.startsWith(protectedResources.quizApi.path)) {
      const account = msalInstance.getActiveAccount();
      if (!account) {
        loginRedirect();
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
ReactDOM.render(
  <React.StrictMode>
    <App pca={msalInstance} />
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();