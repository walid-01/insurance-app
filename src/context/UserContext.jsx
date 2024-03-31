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
      const { address, city, firstName, lastName, phoneNumber, role } =
        await fetchExpertData(tokenValue);
      setUser({ address, city, firstName, lastName, phoneNumber, role }); // Set the fetched user data in the state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Call fetchUserData when the component mounts (i.e., when the app starts)
    fetchUserData();
  }, []); // Empty dependency array to run this effect only once, when the component mounts

  useEffect(() => {
    // Log the user state whenever it changes
    console.log("User state updated:", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
}
