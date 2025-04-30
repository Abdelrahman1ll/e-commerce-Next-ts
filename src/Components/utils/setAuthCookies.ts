
import Cookies from "js-cookie";

export function setAuthCookies(token: string, userData: object): void {
  if (token && userData) {
    // Clear existing cookies if any
    Cookies.remove("authToken");
    Cookies.remove("userData");

    Cookies.set("authToken", token, {
      expires: 30, 
      path: "/",
    });
    Cookies.set("userData", JSON.stringify(userData), {
      expires: 30, 
      path: "/",
    });
  }
}
