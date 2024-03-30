import jwt from "jsonwebtoken";

export default function useAuth(userContext) {
  const login = (response) => {
    const { setUser } = userContext;

    const { token, firstName, lastName, role, address, phoneNumber, city } =
      response;

    const decodedToken = jwt.decode(token);
    const date = new Date();
    date.setTime(decodedToken.exp * 1000);

    const expires = "expires=" + date;
    document.cookie = `token=${token}; ${expires}; path=/`;

    setUser({ firstName, lastName, role, address, phoneNumber, city });
  };

  const logout = () => {
    const { setUser } = userContext;
    // Clear the token from state and cookie
    console.log("Logging Out...");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
  };

  // const getToken = () => {};

  return { login, logout };
}
