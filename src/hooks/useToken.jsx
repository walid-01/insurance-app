import jwt from "jsonwebtoken";

export default function useToken() {
  const getToken = () => {
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (!token) {
      console.log("No token found in cookies. User not logged in.");

      return null; // Exit early if no token found
    }
    return token.split("=")[1];
  };

  const getRole = () => {
    const token = getToken();
    if (token) return jwt.decode(token).role;
    return null;
  };

  return { getToken, getRole };
}
