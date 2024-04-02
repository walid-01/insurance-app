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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="LoginUserName">Username:</label>
          <input
            required
            type="text"
            id="LoginUserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="LoginPassword">Password:</label>
          <input
            required
            type="password"
            id="LoginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
}
