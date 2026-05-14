const SESSION_KEY = "lendsqr:authenticated";

export function setAuthenticatedSession() {
  sessionStorage.setItem(SESSION_KEY, "true");
}

export function clearAuthenticatedSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAuthenticatedSession() {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}
