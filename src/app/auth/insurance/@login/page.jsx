"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function InsuranceLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { insuranceLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await insuranceLogin(userName, password);
      console.log(result);
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
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        {error && (
          <div className="text-red-800 bg-red-100 h-10 flex items-center justify-center">
            <p className="text-sm">{error}</p>
          </div>
        )}
        <div className="flex flex-col">
          <input
            required
            type="text"
            id="LoginUserName"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <input
          required
          type="password"
          id="LoginPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-cyan-700 text-white py-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-800 disabled:bg-gray-400"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
}
