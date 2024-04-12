"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";

export default function ExpertAuthLayout({ children, login, register }) {
  const [showRegister, setShowRegister] = useState(false); // State to control login/register visibility

  const handleSwitch = () => {
    setShowRegister(!showRegister);
  };

  return (
    <>
      <ProtectedRoute requiredRole={null}>
        {children}
        <div className="flex p-10 flex-col justify-center w-full h-5/6 bg-cover bg-no-repeat bg-center bg-[url('/images/auth-bg.png')]">
          <div className="w-2/5 px-8 py-10 my-10 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white bg-opacity-80">
            {!showRegister ? login : register}
            <p className="text-center mt-5">
              {!showRegister
                ? "New to the platform? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => handleSwitch()}
                className="text-cyan-900 font-medium hover:underline"
              >
                {!showRegister ? "Register" : "Login"}
              </button>{" "}
              now.
            </p>
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}
