"use client";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import CitySelect from "@/components/CitySelect";

export default function ExpertRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [firstname, setFirstname] = useState("wa");
  const [lastname, setLastname] = useState("lid");
  const [userName, setUserName] = useState("walid");
  const [password, setPassword] = useState("walid23");
  const [confirmPassword, setConfirmPassword] = useState("walid23");
  const [phoneNumber, setPhoneNumber] = useState(5);
  const [address, setAddress] = useState("walid23");
  const [city, setCity] = useState("");

  const { expertRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const registerResponse = await expertRegister(
        firstname,
        lastname,
        userName,
        password,
        phoneNumber.toString(),
        address,
        parseInt(city)
      );

      console.log(registerResponse);
      setError(registerResponse);
    } catch (error) {
      console.log("Unkown login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="RegisterFirstname">Firstname:</label>
          <input
            required
            type="text"
            id="RegisterFirstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterLastname">Lastname:</label>
          <input
            required
            type="text"
            id="RegisterLastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterUserName">Username:</label>
          <input
            required
            type="text"
            id="RegisterUserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterPassword">Password:</label>
          <input
            required
            type="password"
            id="RegisterPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterConfirmPassword">Confirm Password:</label>
          <input
            required
            type="password"
            id="RegisterConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterPhoneNumber">Phone Number:</label>
          <input
            required
            type="tel"
            id="RegisterPhoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterAddress">Address:</label>
          <input
            required
            type="text"
            id="RegisterAddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterCity">City:</label>
          <CitySelect city={city} setCity={setCity} />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
}
