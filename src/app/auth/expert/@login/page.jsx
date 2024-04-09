"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function ExpertLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("walid");
  const [password, setPassword] = useState("walid23");

  const { expertLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await expertLogin(userName, password);
      console.log(result);
      setError(result);
    } catch (err) {
      console.log("Unkown login error:", err);
      setError("Unkown login error:" + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="LoginUserName" className="text-sm font-medium">
            Username:
          </label>
          <input
            required
            type="text"
            id="LoginUserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="LoginPassword" className="text-sm font-medium">
            Password:
          </label>
          <input
            required
            type="password"
            id="LoginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyan-700 text-white py-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-800 disabled:bg-gray-400"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      {/* {error && <p className="text-red-600 text-sm">{error}</p>} */}
    </>
  );
}
