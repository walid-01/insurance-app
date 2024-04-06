"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function expert() {
  const userContext = useContext(UserContext);
  const { logout } = useAuth(userContext);
  return (
    <div>
      <h1>Expert Home Page, Logged In</h1>
      <Link href="/expert/profile">My Profile</Link>
      <br />
      <Link href="/expert/reports">Reports</Link>
      <br />
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}
