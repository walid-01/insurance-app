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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="RegisterName">Name:</label>
          <select
            required
            id="RegisterName"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label htmlFor="RegisterAgencyCode">Agency Code:</label>
          <input
            required
            type="text"
            id="RegisterAgencyCode"
            value={agencyCode}
            onChange={(e) => setAgencyCode(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
}
