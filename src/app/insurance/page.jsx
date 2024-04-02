"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import useAuth from "@/hooks/useAuth";

export default function insurance() {
  const userContext = useContext(UserContext);
  const { logout } = useAuth(userContext);
  return (
    <div>
      <h1>Insurance Home Page, Logged In</h1>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}
