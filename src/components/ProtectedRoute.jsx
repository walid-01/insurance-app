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
    if (requiredRole && !role) redirect(`/auth/${requiredRole}`);
    else if (requiredRole === null && role) redirect(`/${role}`);
    else if (role && role !== requiredRole) redirect("/" + role);
  }, [user]);
  return children;
}
