"use client";
import { createContext, useState, useEffect } from "react";
import useUser from "@/hooks/useUser";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const { getUserData } = useUser();

  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setIsUserLoading(true);

      const user = await getUserData();
      setUser(user); // Set the fetched user data in the state

      setIsUserLoading(false);
    } catch (error) {
      if (error.message === "User not found") {
        console.log("Error: Invalid Token, logging out...");
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return fetchUserData();
      }
      console.error("Unhandled error: ", error);
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    // Call fetchUserData when the component mounts (i.e., when the app starts)
    fetchUserData();
  }, []); // Empty dependency array to run this effect only once, when the component mounts

  // For test only
  useEffect(() => {
    // Log the user state whenever it changes
    console.log("User state updated:", user);
  }, [user]);

  // For test only
  useEffect(() => {
    // Log the user state whenever it changes
    console.log("User is loading changed to: ", isUserLoading);
  }, [isUserLoading]);

  return (
    <UserContext.Provider value={{ user, isUserLoading, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
}
