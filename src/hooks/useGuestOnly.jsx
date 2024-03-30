"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const useGuestOnly = () => {
  useEffect(() => {
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (token) {
      // If token exists, redirect the user away from the login/register route
      redirect("/expert"); // Redirect to home page or any other route
    }
  }, []);

  return null; // This hook doesn't render anything
};

export default useGuestOnly;
