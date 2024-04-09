"use client";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import CitySelect from "@/components/CitySelect";

export default function InsuranceRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [name, setName] = useState("SAA");
  const [address, setAddress] = useState("SAA address");
  const [city, setCity] = useState("");
  const [userName, setUserName] = useState("saa1");
  const [password, setPassword] = useState("saa1");
  const [confirmPassword, setConfirmPassword] = useState("saa1");
  const [agencyCode, setAgencyCode] = useState("208");

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

      setError(registerResponse);
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="RegisterName" className="text-sm font-medium">
            Name:
          </label>
          <select
            required
            id="RegisterName"
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
        </div>
        <div className="flex flex-col">
          <label htmlFor="RegisterAddress" className="text-sm font-medium">
            Address:
          </label>
          <input
            required
            type="text"
            id="RegisterAddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="RegisterCity" className="text-sm font-medium">
            City:
          </label>
          <CitySelect city={city} setCity={setCity} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="RegisterUserName" className="text-sm font-medium">
            Username:
          </label>
          <input
            required
            type="text"
            id="RegisterUserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="RegisterPassword" className="text-sm font-medium">
            Password:
          </label>
          <input
            required
            type="password"
            id="RegisterPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="RegisterConfirmPassword"
            className="text-sm font-medium"
          >
            Confirm Password:
          </label>
          <input
            required
            type="password"
            id="RegisterConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="RegisterAgencyCode" className="text-sm font-medium">
            Agency Code:
          </label>
          <input
            required
            type="text"
            id="RegisterAgencyCode"
            value={agencyCode}
            onChange={(e) => setAgencyCode(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
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
      {/* {error && <p className="text-red-600 text-sm">{error}</p>} */}
    </>
  );
}
