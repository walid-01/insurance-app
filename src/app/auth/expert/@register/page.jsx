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
      <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="RegisterFirstname" className="text-sm font-medium">
            Firstname:
          </label>
          <input
            required
            type="text"
            id="RegisterFirstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="RegisterLastname" className="text-sm font-medium">
            Lastname:
          </label>
          <input
            required
            type="text"
            id="RegisterLastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
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
          <label htmlFor="RegisterPhoneNumber" className="text-sm font-medium">
            Phone Number:
          </label>
          <input
            required
            type="tel"
            id="RegisterPhoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
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
