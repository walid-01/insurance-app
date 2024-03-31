import jwt from "jsonwebtoken";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function useAuth() {
  const userContext = useContext(UserContext);

  const login = (response) => {
    const { fetchUserData } = userContext;

    // const { token, firstName, lastName, role, address, phoneNumber, city } =
    //   response;

    const { token } = response;

    const decodedToken = jwt.decode(token);
    const date = new Date();
    date.setTime(decodedToken.exp * 1000);

    const expires = "expires=" + date;
    document.cookie = `token=${token}; ${expires}; path=/`;

    fetchUserData();
    // setUser({ firstName, lastName, role, address, phoneNumber, city });
  };

  const logout = () => {
    const { fetchUserData } = userContext;

    // Clear the token from cookie
    console.log("Logging Out...");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    fetchUserData();
    // setUser(null);
  };

  // const getToken = () => {};

  return { login, logout };
}
