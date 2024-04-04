"use client";

import { useState, useEffect } from "react";
import CitySelect from "@/components/CitySelect";
import getExperts from "@/utils/GetExperts";
import getInsurances from "@/utils/GetInsurances";
import submitOrder from "@/utils/ServiceOrder";
import { useRouter } from "next/navigation";

const ReportForm = () => {
  const router = useRouter();
  // Individual state variables for each form field
  const [experts, setExperts] = useState([]);
  const [associatedExpertID, setAssociatedExpertID] = useState("");
  const [victimFullName, setVictimFullName] = useState("waa liid");
  const [victimPolicyNumber, setVictimPolicyNumber] = useState("500");
  const [victimCity, setVictimCity] = useState("");
  const [vehicleMakerAndModel, setVehicleMakerAndModel] = useState("VW up");
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState("1234511523");
  const [vehicleType, setVehicleType] = useState("type");
  const [vehicleSeriesNumber, setVehicleSeriesNumber] = useState("IDK123456");
  const [vehicleGenre, setVehicleGenre] = useState("genre");
  const [vehicleWeight, setVehicleWeight] = useState("1500");
  // const [vehicleColor, setVehicleColor] = useState("gris");
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
          // vehicleColor,
          atFaultInsurance: parseInt(atFaultInsurance),
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
          // vehicleColor,
          atFaultInsurance: null,
          atFaultFullName: null,
          atFaultPolicyNumber: null,
          atFaultCity: null,
        };

    const done = await submitOrder(obj);
    console.log(done);
    if (done) router.push("/insurance");

    // Reset form state after submission (optional)
    // setAssociatedExpertID("");
    // setVictimFullName("");
    // setVictimPolicyNumber("");
    // setVictimCity("");
    // setVehicleMakerAndModel("");
    // setVehicleLicensePlate("");
    // setVehicleType("");
    // setVehicleSeriesNumber("");
    // setVehicleGenre("");
    // setVehicleWeight("");
    // setVehicleColor("");
    // setAtFaultExists(false);
    // setAtFaultInsurance("");
    // setAtFaultFullName("");
    // setAtFaultPolicyNumber("");
    // setAtFaultCity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Accident Report Form</h2>
      <div>
        <label htmlFor="associatedExpertID">Associated Expert:</label>
        <select
          id="associatedExpertID"
          name="associatedExpertID"
          value={associatedExpertID}
          onChange={(event) => setAssociatedExpertID(event.target.value)}
          required
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
      </div>
      <div>
        <label htmlFor="victimFullName">Victim Full Name:</label>
        <input
          required
          type="text"
          id="victimFullName"
          name="victimFullName"
          value={victimFullName}
          onChange={(event) => setVictimFullName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="victimPolicyNumber">Victim Policy Number:</label>
        <input
          required
          type="text"
          id="victimPolicyNumber"
          name="victimPolicyNumber"
          value={victimPolicyNumber}
          onChange={(event) => setVictimPolicyNumber(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="victimCity">Victim City:</label>
        <CitySelect city={victimCity} setCity={setVictimCity} />
      </div>
      <div>
        <label htmlFor="vehicleMakerAndModel">Vehicle Maker and Model:</label>
        <input
          required
          type="text"
          id="vehicleMakerAndModel"
          name="vehicleMakerAndModel"
          value={vehicleMakerAndModel}
          onChange={(event) => setVehicleMakerAndModel(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="vehicleLicensePlate">Vehicle License Plate:</label>
        <input
          required
          type="text"
          id="vehicleLicensePlate"
          name="vehicleLicensePlate"
          value={vehicleLicensePlate}
          onChange={(event) => setVehicleLicensePlate(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="vehicleType">Vehicle Type:</label>
        <input
          required
          type="text"
          id="vehicleType"
          name="vehicleType"
          value={vehicleType}
          onChange={(event) => setVehicleType(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="vehicleSeriesNumber">Vehicle Series Number:</label>
        <input
          required
          type="text"
          id="vehicleSeriesNumber"
          name="vehicleSeriesNumber"
          value={vehicleSeriesNumber}
          onChange={(event) => setVehicleSeriesNumber(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="vehicleGenre">Vehicle Genre:</label>
        <input
          required
          type="text"
          id="vehicleGenre"
          name="vehicleGenre"
          value={vehicleGenre}
          onChange={(event) => setVehicleGenre(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="vehicleWeight">Vehicle Weight:</label>
        <input
          required
          type="number"
          id="vehicleWeight"
          name="vehicleWeight"
          value={vehicleWeight}
          onChange={(event) => setVehicleWeight(Number(event.target.value))}
        />
      </div>
      {/* <div>
        <label htmlFor="vehicleColor">Vehicle Color:</label>
        <input
          required
          type="text"
          id="vehicleColor"
          name="vehicleColor"
          value={vehicleColor}
          onChange={(event) => setVehicleColor(event.target.value)}
        />
      </div> */}
      <div>
        <input
          type="checkbox"
          id="atFaultExists"
          checked={atFaultExists}
          onChange={(event) => setAtFaultExists(event.target.checked)}
        />
        <label htmlFor="atFaultExists">At-Fault Party Involved</label>
      </div>
      {atFaultExists && ( // Conditionally render these fields only if atFaultExists is true
        <>
          <div>
            <label htmlFor="atFaultInsurance">At-Fault Insurance:</label>
            <select
              id="atFaultInsurance"
              name="atFaultInsurance"
              value={atFaultInsurance}
              onChange={(event) => setAtFaultInsurance(event.target.value)}
              required
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
          </div>
          <div>
            <label htmlFor="atFaultFullName">At-Fault Full Name:</label>
            <input
              type="text"
              id="atFaultFullName"
              name="atFaultFullName"
              value={atFaultFullName}
              onChange={(event) => setAtFaultFullName(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="atFaultPolicyNumber">At-Fault Policy Number:</label>
            <input
              type="text"
              id="atFaultPolicyNumber"
              name="atFaultPolicyNumber"
              value={atFaultPolicyNumber}
              onChange={(event) => setAtFaultPolicyNumber(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="atFaultCity">At-Fault City:</label>
            <CitySelect city={atFaultCity} setCity={setAtFaultCity} />
          </div>
        </>
      )}
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportForm;
