"use client";
import { useState } from "react";
import PostExpertLogin from "@/utils/auth/ExpertLogin";
import useAuth from "@/hooks/useAuth";

export default function ExpertLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("lid");
  const [password, setPassword] = useState("walid23");

  const { login } = useAuth();

  // useEffect(() => {
  //   console.log("Use Effect is running..., User: ", user);
  //   // Redirect if user is already authenticated
  //   if (user) {
  //     redirect("/expert");
  //   }
  // }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await PostExpertLogin(userName, password);
      // console.log(response);
      login(response);
    } catch (err) {
      if (err.message === "User not found") {
        console.log("Invalid username or password");
        setError("Invalid username or password");
      } else {
        console.log("Unkown login error:", err);
        setError("Unkown login error:" + err);
      }
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
