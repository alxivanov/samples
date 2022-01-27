import { LogLevel } from "@azure/msal-browser";
export const msalConfig = {
  auth: {
    tenantId: "a000b00a-a00c-b00c-d00e-f000g00a0000", // Your tenant ID goes here
    clientId: "a00b000c-de0f-00g0-hh0i-0000j000000k", // Your client (application) ID goes here
    authority: "https://login.microsoftonline.com/a000b00a-a00c-b00c-d00e-f000g00a0000", // Replace the last part with your tenant ID
    redirectUri: "http://localhost:3000/admin/quiz", // Must be the same in Azure AD portal, can be replace with an environment variable: process.env.REACT_APP_REDIRECT_URL
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};
export const protectedResources = {
  quizApi: {
    path: "/admin/",
    scopes: ["api://c0000def-ab0c-0000-b00d-000f000000b0/CTF.Quiz.Manage"],
  },
};
export const appRoles = {
  Admin: "Admin",
};