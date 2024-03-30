"use client";
import { createContext, useState, useEffect } from "react";
import fetchExpertData from "@/utils/auth/ExpertData";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const fetchUserData = async () => {
    try {
      const token = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="));
      if (!token) {
        console.log("No token found in cookies. User not logged in.");
        return; // Exit early if no token found
      }
      const tokenValue = token.split("=")[1];

      // Fetch Expert data using the fetchExpertData function
      const expertData = await fetchExpertData(tokenValue);
      setUser(expertData); // Set the fetched user data in the state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Call fetchUserData when the component mounts (i.e., when the app starts)
    fetchUserData();
  }, []); // Empty dependency array to run this effect only once, when the component mounts

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
