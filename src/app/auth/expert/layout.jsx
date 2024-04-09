"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function ExpertAuthLayout({ children, login, register }) {
  return (
    <>
      <ProtectedRoute requiredRole={null}>
        {children}
        <div className="flex w-full justify-around">
          <div className="w-2/5 px-8 py-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            {login}
          </div>
          <div className="relative w-1">
            <div className="h-full border-l-2 border-cyan-800 border-opacity-50"></div>
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white text-xl font-medium py-4 text-gray-700">
              OR
            </p>
          </div>
          <div className="w-2/5 px-8 py-4 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            {register}
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}
