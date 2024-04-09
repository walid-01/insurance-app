"use client";

import { UserContext } from "@/context/UserContext";
import { useContext, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import ConfirmationPopup from "@/components/ConfirmationPopup";

export default function Expert() {
  const userContext = useContext(UserContext);
  const { logout } = useAuth(userContext);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleLogoutConfirm = () => {
    setIsConfirmationOpen(false); // Close the popup
    logout(); // Perform the logout
  };

  const handleLogoutCancel = () => {
    setIsConfirmationOpen(false); // Close the popup
  };

  return (
    <>
      <div>
        <h1>Expert Home Page, Logged In</h1>
        <Link href="/expert/profile">My Profile</Link>
        <br />
        <Link href="/expert/reports">Reports</Link>
        <br />
        <button onClick={() => setIsConfirmationOpen(true)}>Log Out</button>
      </div>
      {isConfirmationOpen && (
        <ConfirmationPopup
          message="Are you sure you want to log out?"
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
      )}
    </>
  );
}
