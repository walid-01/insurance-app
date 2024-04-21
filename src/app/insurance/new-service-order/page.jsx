"use client";

import { useState, useEffect } from "react";
import CitySelect from "@/components/CitySelect";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import useServiceOrder from "@/hooks/useServiceOrder";

const ReportForm = () => {
  const { getExperts, getInsurances } = useUser();
  const { submitOrder } = useServiceOrder();

  const router = useRouter();
  const [experts, setExperts] = useState([]);
  const [associatedExpertID, setAssociatedExpertID] = useState("");
  const [victimFullName, setVictimFullName] = useState("");
  const [victimPolicyNumber, setVictimPolicyNumber] = useState("");
  const [victimCity, setVictimCity] = useState("");
  const [vehicleMakerAndModel, setVehicleMakerAndModel] = useState("");
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleSeriesNumber, setVehicleSeriesNumber] = useState("");
  const [vehicleGenre, setVehicleGenre] = useState("");
  const [vehicleWeight, setVehicleWeight] = useState("");
  const [atFaultExists, setAtFaultExists] = useState(false);
  const [insurances, setInsurances] = useState([]);
  const [atFaultInsurance, setAtFaultInsurance] = useState("");
  const [atFaultFullName, setAtFaultFullName] = useState("");
  const [atFaultPolicyNumber, setAtFaultPolicyNumber] = useState("");
  const [atFaultCity, setAtFaultCity] = useState("");

  useEffect(() => {
    // Fetch experts when component mounts
    async function fetchData() {
      try {
        setExperts(await getExperts());
        setInsurances(await getInsurances());
      } catch (error) {
        console.error("Error fetching experts:", error);
      }
    }
    fetchData();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Implement form submission logic here (e.g., send data to backend)
    const obj = atFaultExists
      ? {
          associatedExpertID: parseInt(associatedExpertID),
          victimFullName,
          victimPolicyNumber,
          victimCity: parseInt(victimCity),
          vehicleMakerAndModel,
          vehicleLicensePlate,
          vehicleType,
          vehicleSeriesNumber,
          vehicleGenre,
          vehicleWeight: parseInt(vehicleWeight),
          atFaultInsuranceID: parseInt(atFaultInsurance),
          atFaultFullName,
          atFaultPolicyNumber,
          atFaultCity,
        }
      : {
          associatedExpertID: parseInt(associatedExpertID),
          victimFullName,
          victimPolicyNumber,
          victimCity: parseInt(victimCity),
          vehicleMakerAndModel,
          vehicleLicensePlate,
          vehicleType,
          vehicleSeriesNumber,
          vehicleGenre,
          vehicleWeight: parseInt(associatedExpertID),
          atFaultInsuranceID: null,
          atFaultFullName: null,
          atFaultPolicyNumber: null,
          atFaultCity: null,
        };

    const done = await submitOrder(obj);
    console.log(done);
    if (done) router.push("/insurance/reports");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 flex flex-col w-1/2 m-auto"
    >
      <h2 className="text-2xl font-semibold mb-4">Accident Report Form</h2>
      <select
        id="associatedExpertID"
        name="associatedExpertID"
        value={associatedExpertID}
        onChange={(event) => setAssociatedExpertID(event.target.value)}
        required
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
      >
        <option value="" disabled>
          Select an expert
        </option>
        {experts.map((expert) => (
          <option key={expert.id} value={expert.id}>
            {`${expert.firstName} ${expert.lastName} ${expert.address}`}
          </option>
        ))}
      </select>
      <input
        placeholder="Victim's Full Name"
        required
        type="text"
        id="victimFullName"
        name="victimFullName"
        value={victimFullName}
        onChange={(event) => setVictimFullName(event.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
      />

      <input
        placeholder="Victim's Policy Number"
        required
        type="text"
        id="victimPolicyNumber"
        name="victimPolicyNumber"
        value={victimPolicyNumber}
        onChange={(event) => setVictimPolicyNumber(event.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
      />
      <CitySelect city={victimCity} setCity={setVictimCity} />

      <input
        placeholder="Vehicle Maker and Model"
        required
        type="text"
        id="vehicleMakerAndModel"
        name="vehicleMakerAndModel"
        value={vehicleMakerAndModel}
        onChange={(event) => setVehicleMakerAndModel(event.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
      />
      <input
        placeholder="Vehicle License Plate"
        required
        type="text"
        id="vehicleLicensePlate"
        name="vehicleLicensePlate"
        value={vehicleLicensePlate}
        onChange={(event) => setVehicleLicensePlate(event.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
      />
      <input
        placeholder="Vehicle Type"
        required
        type="text"
        id="vehicleType"
        name="vehicleType"
        value={vehicleType}
        onChange={(event) => setVehicleType(event.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
      />
      <input
        placeholder="Vehicle Series Number"
        required
        type="text"
        id="vehicleSeriesNumber"
        name="vehicleSeriesNumber"
        value={vehicleSeriesNumber}
        onChange={(event) => setVehicleSeriesNumber(event.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
      />
      <input
        placeholder="Vehicle Genre"
        required
        type="text"
        id="vehicleGenre"
        name="vehicleGenre"
        value={vehicleGenre}
        onChange={(event) => setVehicleGenre(event.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
      />
      <input
        placeholder="Vehicle Weight (KG)"
        required
        type="number"
        id="vehicleWeight"
        name="vehicleWeight"
        value={vehicleWeight}
        onChange={(event) => setVehicleWeight(Number(event.target.value))}
        className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
      />
      <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-6">
        <div>
          <input
            type="checkbox"
            id="atFaultExists"
            checked={atFaultExists}
            onChange={(event) => setAtFaultExists(event.target.checked)}
            className="mr-2"
          />
          <label htmlFor="atFaultExists" className="text-lg font-medium">
            At-Fault Party Involved
          </label>
        </div>
        {atFaultExists && ( // Conditionally render these fields only if atFaultExists is true
          <>
            <select
              id="atFaultInsurance"
              name="atFaultInsurance"
              value={atFaultInsurance}
              onChange={(event) => setAtFaultInsurance(event.target.value)}
              required
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            >
              <option value="" disabled>
                Select an insurance
              </option>
              {insurances.map((insurance) => (
                <option key={insurance.id} value={insurance.id}>
                  {`${insurance.name}, ${insurance.address}, ${insurance.city}`}
                </option>
              ))}
            </select>
            <input
              required
              type="text"
              id="atFaultFullName"
              name="atFaultFullName"
              value={atFaultFullName}
              onChange={(event) => setAtFaultFullName(event.target.value)}
              placeholder="At-Fault Full Name"
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
            <input
              required
              type="text"
              id="atFaultPolicyNumber"
              name="atFaultPolicyNumber"
              value={atFaultPolicyNumber}
              onChange={(event) => setAtFaultPolicyNumber(event.target.value)}
              placeholder="At-Fault Policy Number"
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
            <CitySelect city={atFaultCity} setCity={setAtFaultCity} />
          </>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-cyan-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-800 transition-colors duration-300 ease-in-out hover:bg-cyan-800"
      >
        Submit Report
      </button>
    </form>
  );
};

export default ReportForm;
