"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import CitySelect from "@/components/CitySelect";

export default function ExpertRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
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
    } catch (error) {
      console.log("Unknown login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        {error && (
          <div className="text-red-800 bg-red-100 h-10 flex items-center justify-center">
            <p className="text-sm">{error}</p>
          </div>
        )}
        <div className="flex justify-between w-full gap-4">
          <input
            required
            type="text"
            id="RegisterFirstname"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="rounded-md border w-1/2 border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
          <input
            required
            type="text"
            id="RegisterLastname"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="rounded-md border w-1/2 border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <input
          required
          type="text"
          id="RegisterUserName"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
        />
        <input
          required
          type="password"
          id="RegisterPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
        />
        <input
          required
          type="password"
          id="RegisterConfirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
        />
        <input
          required
          type="tel"
          id="RegisterPhoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
        />
        <div className="flex justify-between w-full gap-4">
          <input
            required
            type="text"
            id="RegisterAddress"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="rounded-md border w-3/5 border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
          <CitySelect
            city={city}
            setCity={setCity}
            placeholder="City"
            className="w-2/5"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyan-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-800 disabled:bg-gray-400 transition-colors duration-300 ease-in-out hover:bg-cyan-800"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </>
  );
}
