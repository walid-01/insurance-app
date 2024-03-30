"use client";
import useGuestOnly from "@/hooks/useGuestOnly";

export default function ExpertAuthLayout({ children, login, register }) {
  useGuestOnly(); // Redirect logged-in users away from the login page
  return (
    <>
      <div>{children}</div>
      <div className="flex">
        <div>{login}</div>
        <div>{register}</div>
      </div>
    </>
  );
}
