import { useState } from "react";
import jwt from "jsonwebtoken";

export default function useAuth() {
  const [token, setToken] = useState(null);

  const login = (receivedToken) => {
    // Save the token in cookie
    setToken(receivedToken);

    const decodedToken = jwt.decode(receivedToken);

    const date = new Date();
    date.setTime(decodedToken.exp * 1000);
    const expires = "expires=" + date;
    document.cookie = `token=${receivedToken}; ${expires}; path=/`;
  };

  const logout = () => {
    // Clear the token from state and cookie
    console.log("Logging Out...");
    setToken(null);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return { token, login, logout };
}
