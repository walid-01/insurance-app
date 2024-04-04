"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function insurance() {
  const userContext = useContext(UserContext);
  const { logout } = useAuth(userContext);
  return (
    <div>
      <h1>Insurance Home Page, Logged In</h1>
      <Link href="/insurance/profile">My Profile</Link>
      <br />
      <Link href="/insurance/new-service-order">
        Create a new service order
      </Link>
      <br />
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}
