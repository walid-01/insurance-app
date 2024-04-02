"use client";

import { useContext, useLayoutEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { redirect } from "next/navigation";
import useToken from "@/hooks/useToken";

export default function ProtectedRoute({ children, requiredRole }) {
  const { getRole } = useToken();
  const { user } = useContext(UserContext);

  useLayoutEffect(() => {
    const role = getRole();
    if (requiredRole === "none" && role) {
      redirect(`/${role}`);
    } else if (requiredRole === "expert") {
      if (!role) redirect("/auth/expert");
      else if (role === "insurance") redirect("/insurance");
    } else if (requiredRole === "insurance") {
      if (!role) redirect("/auth/insurance");
      else if (role === "expert") redirect("/expert");
    }
  }, [user]);
  return children;
}
