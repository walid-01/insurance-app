"use client";
// UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    console.log("Stored User: ", storedUser);
  }, []);

  useEffect(() => {
    user
      ? window.localStorage.setItem("user", JSON.stringify(user))
      : window.localStorage.removeItem("user");
    console.log("User Changed: ", user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
