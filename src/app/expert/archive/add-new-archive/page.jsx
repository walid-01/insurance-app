"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationPopup from "@/components/ConfirmationPopup";
import useArchive from "@/hooks/useArchive";

function AddArchiveForm() {
  const { submitArchive } = useArchive();
  const router = useRouter();

  const [error, setError] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [reference, setReference] = useState("");
  const [incident, setIncident] = useState("");
  const [incidentDate, setIncidentDate] = useState(new Date());
  const [vehicleConditionBeforeIncident, setVehicleConditionBeforeIncident] =
    useState("");
  const [impactPoint, setImpactPoint] = useState("");
  const [damagedPoint, setDamagedPoint] = useState("");
  const [paintAndAdditions, setPaintAndAdditions] = useState();
  const [laborDescription, setLaborDescription] = useState("");
  const [laborCost, setLaborCost] = useState();
  const [reduction, setReduction] = useState();

  const [damagedParts, setDamagedParts] = useState([
    {
      partName: "",
      partPrice: "",
      isRepairable: false,
    },
  ]);

  const [victimFullName, setVictimFullName] = useState("");
  const [victimPolicyNumber, setVictimPolicyNumber] = useState("");

  const [victimInsuranceName, setVictimInsuranceName] = useState("");
  const [victimInsuranceAddress, setVictimInsuranceAddress] = useState("");
  const [victimInsuranceCode, setVictimInsuranceCode] = useState("");

  const [vehicleMakerAndModel, setVehicleMakerAndModel] = useState("");
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleSeriesNumber, setVehicleSeriesNumber] = useState("");
  const [vehicleGenre, setVehicleGenre] = useState("");
  const [vehicleWeight, setVehicleWeight] = useState("");

  const [atFaultExists, setAtFaultExists] = useState(false);
  const [atFaultFullName, setAtFaultFullName] = useState("");
  const [atFaultPolicyNumber, setAtFaultPolicyNumber] = useState("");
  const [atFaultInsuranceName, setAtFaultInsuranceName] = useState("");
  const [atFaultInsuranceCode, setAtFaultInsuranceCode] = useState("");
  const [atFaultInsuranceAddress, setAtFaultInsuranceAddress] = useState("");

  const handleAddDamagedPart = () => {
    setDamagedParts([
      ...damagedParts,
      {
        partName: "",
        partPrice: "",
        isRepairable: false,
      },
    ]);
  };

  const handleRemoveDamagedPart = (index) => {
    if (index > 0) {
      setDamagedParts(damagedParts.filter((part, i) => i !== index));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsConfirmationOpen(true);
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
  };

  const handleConfirm = async () => {
    setIsConfirmationOpen(false);

    const reportData = {
      reference,
      incident,
      incidentDate,
      vehicleConditionBeforeIncident,
      impactPoint,
      damagedPoint,
      paintAndAdditions: parseInt(paintAndAdditions),
      laborDescription,
      laborCost: parseInt(laborCost),
      damagedParts,
      reduction: parseInt(reduction),
      victimFullName,
      victimPolicyNumber,
      victimInsuranceName,
      victimInsuranceAddress,
      atFaultFullName,
      atFaultPolicyNumber,
      atFaultInsuranceName,
      victimInsuranceCode: parseInt(victimInsuranceCode),
      atFaultInsuranceCode: parseInt(atFaultInsuranceCode),
      atFaultInsuranceAddress,
      vehicleMakerAndModel,
      vehicleLicensePlate,
      vehicleType,
      vehicleSeriesNumber,
      vehicleGenre,
      vehicleWeight: parseInt(vehicleWeight),
    };

    console.log(reportData);

    const response = await submitArchive(reportData);
    if (response) {
      router.push(`/expert/archive`);
    }
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div className="w-full xl:w-1/2 md:w-2/3 m-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex w-full gap-4">
          <input
            autoComplete="off"
            required
            type="text"
            id="reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            placeholder="Reference"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-1/4"
          />
          <input
            autoComplete="off"
            required
            type="text"
            id="incident"
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
            placeholder="Incident"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-3/4"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="incidentDate">Incident Date</label>
          <input
            autoComplete="off"
            required
            type="datetime-local"
            id="incidentDate"
            value={incidentDate.toISOString().slice(0, 16)} // Format for datetime-local input
            onChange={(e) => setIncidentDate(new Date(e.target.value))}
            placeholder="Incident Date"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-6">
          <p className="text-lg font-medium">Victim</p>
          <div className="flex flex-col gap-4">
            <p className="text-md font-medium border-b">Victim Information</p>
            <input
              required
              type="text"
              id="victimFullName"
              name="victimFullName"
              value={victimFullName}
              onChange={(event) => setVictimFullName(event.target.value)}
              placeholder="Full Name"
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
            <input
              required
              type="text"
              id="victimPolicyNumber"
              name="victimPolicyNumber"
              value={victimPolicyNumber}
              onChange={(event) => setVictimPolicyNumber(event.target.value)}
              placeholder="Policy Number"
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-md font-medium border-b">
              Victim&apos;s Insurance Information
            </p>
            <input
              required
              type="text"
              id="victimInsuranceName"
              name="victimInsuranceName"
              value={victimInsuranceName}
              onChange={(event) => setVictimInsuranceName(event.target.value)}
              placeholder="Insurance Name"
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
            <input
              required
              type="text"
              id="victimInsuranceAddress"
              name="victimInsuranceAddress"
              value={victimInsuranceAddress}
              onChange={(event) =>
                setVictimInsuranceAddress(event.target.value)
              }
              placeholder="Insurance Address"
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
            <input
              required
              type="number"
              id="victimInsuranceCode"
              name="victimInsuranceCode"
              value={victimInsuranceCode}
              onChange={(event) => setVictimInsuranceCode(event.target.value)}
              placeholder="Agency Code"
              className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-md font-medium border-b">
              Victim&apos;s Vehicle Information
            </p>

            <input
              autoComplete="off"
              required
              type="text"
              id="vehicleMakerAndModel"
              value={vehicleMakerAndModel}
              onChange={(e) => setVehicleMakerAndModel(e.target.value)}
              placeholder="Maker And Model"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
            <div className="w-full flex gap-4">
              <input
                autoComplete="off"
                required
                type="text"
                id="vehicleLicensePlate"
                value={vehicleLicensePlate}
                onChange={(e) => setVehicleLicensePlate(e.target.value)}
                placeholder="License Plate"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-1/2"
              />
              <input
                autoComplete="off"
                required
                type="text"
                id="vehicleSeriesNumber"
                value={vehicleSeriesNumber}
                onChange={(e) => setVehicleSeriesNumber(e.target.value)}
                placeholder="Series Number"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-1/2"
              />
            </div>
            <div className="w-full flex gap-4">
              <input
                autoComplete="off"
                required
                type="text"
                id="vehicleType"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                placeholder="Type"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-1/3"
              />
              <input
                autoComplete="off"
                required
                type="text"
                id="vehicleGenre"
                value={vehicleGenre}
                onChange={(e) => setVehicleGenre(e.target.value)}
                placeholder="Genre"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-1/3"
              />
              <input
                autoComplete="off"
                required
                type="number"
                id="vehicleWeight"
                value={vehicleWeight}
                onChange={(e) => setVehicleWeight(e.target.value)}
                placeholder="Weight"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-1/3"
              />
            </div>
            <input
              autoComplete="off"
              required
              type="text"
              id="vehicleConditionBeforeIncident"
              value={vehicleConditionBeforeIncident}
              onChange={(e) =>
                setVehicleConditionBeforeIncident(e.target.value)
              }
              placeholder="Vehicle Condition Before Incident"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
            <div className="w-full flex gap-4">
              <input
                autoComplete="off"
                required
                type="text"
                id="impactPoint"
                value={impactPoint}
                onChange={(e) => setImpactPoint(e.target.value)}
                placeholder="Impact Point"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-1/2"
              />
              <input
                autoComplete="off"
                required
                type="text"
                id="damagedPoint"
                value={damagedPoint}
                onChange={(e) => setDamagedPoint(e.target.value)}
                placeholder="Damaged Point"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-1/2"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-6">
          <p className="text-lg font-medium">At fault Information</p>
          <div className="flex gap-2">
            <input
              autoComplete="off"
              type="checkbox"
              id="atFaultExists"
              checked={atFaultExists}
              onChange={(e) => setAtFaultExists(e.target.checked)}
            />
            <label htmlFor="atFaultExists">I have at-fault information</label>
          </div>
          {atFaultExists && (
            <>
              <input
                required
                type="text"
                id="atFaultFullName"
                name="atFaultFullName"
                value={atFaultFullName}
                onChange={(event) => setAtFaultFullName(event.target.value)}
                placeholder="Full Name"
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
              />
              <input
                required
                type="text"
                id="atFaultPolicyNumber"
                name="atFaultPolicyNumber"
                value={atFaultPolicyNumber}
                onChange={(event) => setAtFaultPolicyNumber(event.target.value)}
                placeholder="Policy Number"
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
              />
              <input
                required
                type="text"
                id="atFaultInsuranceName"
                name="atFaultInsuranceName"
                value={atFaultInsuranceName}
                onChange={(event) =>
                  setAtFaultInsuranceName(event.target.value)
                }
                placeholder="Insurance Name"
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
              />
              <input
                required
                type="number"
                id="atFaultInsuranceCode"
                name="atFaultInsuranceCode"
                value={atFaultInsuranceCode}
                onChange={(event) =>
                  setAtFaultInsuranceCode(event.target.value)
                }
                placeholder="Agency Code"
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
              />
              <input
                required
                type="text"
                id="atFaultInsuranceAddress"
                name="atFaultInsuranceAddress"
                value={atFaultInsuranceAddress}
                onChange={(event) =>
                  setAtFaultInsuranceAddress(event.target.value)
                }
                placeholder="Insurance Address"
                className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
              />
            </>
          )}
        </div>

        <div className="flex flex-col gap-4 border border-gray-300 rounded-md p-6">
          <p className="text-lg font-medium">Parts</p>
          {damagedParts.map((part, index) => (
            <div key={index} className="flex gap-4">
              <input
                autoComplete="off"
                required
                type="text"
                id={`partName${index}`}
                value={part.partName}
                onChange={(e) =>
                  setDamagedParts((prevParts) =>
                    prevParts.map((p, i) =>
                      i === index ? { ...p, partName: e.target.value } : p
                    )
                  )
                }
                placeholder="Part Name"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-1/2"
              />
              <input
                autoComplete="off"
                required
                type="number"
                id={`partPrice${index}`}
                value={part.partPrice}
                onChange={(e) =>
                  setDamagedParts((prevParts) =>
                    prevParts.map((p, i) =>
                      i === index
                        ? { ...p, partPrice: e.target.valueAsNumber }
                        : p
                    )
                  )
                }
                placeholder="Part Price"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 w-2/6"
              />
              <div className="w-1/6 flex items-center justify-center gap-2">
                <input
                  autoComplete="off"
                  type="checkbox"
                  id={`isRepairable${index}`}
                  checked={part.isRepairable}
                  onChange={(e) =>
                    setDamagedParts((prevParts) =>
                      prevParts.map((p, i) =>
                        i === index
                          ? { ...p, isRepairable: e.target.checked }
                          : p
                      )
                    )
                  }
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
                />
                <label htmlFor={`isRepairable${index}`}>Repairable?</label>
              </div>
              {index > 0 && ( // Only show the "Remove" button for parts other than the first one
                <button
                  type="button"
                  onClick={() => handleRemoveDamagedPart(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDamagedPart}
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 hover:bg-blue-600"
          >
            Add Another Damaged Part
          </button>
        </div>
        <div className="border border-gray-300 rounded-md p-6">
          <p className="mb-4 text-lg font-medium">Other</p>
          <div className="flex flex-col gap-4">
            <input
              autoComplete="off"
              required
              type="number"
              id="paintAndAdditions"
              value={paintAndAdditions}
              onChange={(e) => setPaintAndAdditions(e.target.value)}
              placeholder="Paint & Additions Cost"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
            <input
              autoComplete="off"
              required
              type="text"
              id="laborDescription"
              value={laborDescription}
              onChange={(e) => setLaborDescription(e.target.value)}
              placeholder="Labor Description"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
            <input
              autoComplete="off"
              required
              type="number"
              id="laborCost"
              value={laborCost}
              onChange={(e) => setLaborCost(e.target.value)}
              placeholder="Labor Cost"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="reduction">Car Reduction in Value Percentage</label>
          <input
            autoComplete="off"
            required
            type="number"
            id="reduction"
            value={reduction}
            onChange={(e) => {
              // setReduction(e.target.value);
              const inputValue = e.target.value;

              // Check if the input value is empty or a valid number between 0 and 100
              if (
                inputValue === "" ||
                (Number(inputValue) >= 0 && Number(inputValue) <= 100)
              ) {
                setReduction(inputValue);
              }
            }}
            placeholder="[0-100] %"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 hover:bg-green-600"
        >
          Create Report
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
      {isConfirmationOpen && (
        <ConfirmationPopup
          message="Are you sure you want to create the report?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default AddArchiveForm;
