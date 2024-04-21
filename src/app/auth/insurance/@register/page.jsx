"use client";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import CitySelect from "@/components/CitySelect";

export default function InsuranceRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agencyCode, setAgencyCode] = useState("");

  const { insuranceRegister } = useAuth();

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
      const registerResponse = await insuranceRegister(
        name,
        address,
        parseInt(city),
        userName,
        password,
        parseInt(agencyCode)
      );

      // console.log(registerResponse);
    } catch (error) {
      console.log("Unkown login error:", error);
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
        <select
          required
          id="RegisterName"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
        >
          <option value="" disabled>
            Select agency name
          </option>
          <option value="SAA">SAA</option>
          <option value="CAAT">CAAT</option>
          <option value="CASH Assurances">CASH Assurances</option>
          <option value="CAAR">CAAR</option>
          <option value="CNMA">CNMA</option>
          <option value="CIAR">CIAR</option>
          <option value="TRUST Algerie">TRUST Algerie</option>
          <option value="Alliance Assurances">Alliance Assurances</option>
          <option value="Salama Assurances">Salama Assurances</option>
          <option value="GIG">GIG</option>
          <option value="GAM">GAM</option>
          <option value="AXA Assurances">AXA Assurances</option>
        </select>
        <input
          required
          type="text"
          id="RegisterAddress"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
        />
        <CitySelect city={city} setCity={setCity} />
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
          type="text"
          id="RegisterAgencyCode"
          placeholder="Agency Code"
          value={agencyCode}
          onChange={(e) => setAgencyCode(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
        />
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
