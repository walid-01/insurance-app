import useServiceOrder from "@/hooks/useServiceOrder";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmationPopup from "@/components/ConfirmationPopup";

function ExpertiseReportForm({ serviceOrderId }) {
  const { submitExpertiseReport } = useServiceOrder();
  const router = useRouter();

  const [error, setError] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [reference, setReference] = useState("");
  const [incident, setIncident] = useState("");
  const [incidentDate, setIncidentDate] = useState(new Date()); // Set initial value to current date
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
      partPrice: null,
      isRepairable: false,
    },
  ]);

  const handleAddDamagedPart = () => {
    setDamagedParts([
      ...damagedParts,
      {
        partName: "",
        partPrice: null,
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

    if (!serviceOrderId) {
      console.error("No Service Order Id");
      setError("No Service Order Id");
      return;
    }

    setIsConfirmationOpen(true); // Open the confirmation popup before submitting
  };

  const handleConfirm = async () => {
    setIsConfirmationOpen(false); // Close the popup after confirmation

    const reportData = {
      reference,
      incident,
      incidentDate,
      vehicleConditionBeforeIncident,
      impactPoint,
      damagedPoint,
      paintAndAdditions,
      laborDescription,
      laborCost,
      damagedParts,
      reduction: parseInt(reduction),
      serviceOrderId,
    };

    console.log(reportData);

    const response = await submitExpertiseReport(reportData);
    if (response) {
      // Check for successful response
      router.push(`/expert/reports`);
    }
  };

  const handleCancel = () => {
    setIsConfirmationOpen(false); // Close the popup on cancel
  };

  return (
    <>
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
          />
        </div>
        <div className="flex flex-col">
          <input
            autoComplete="off"
            required
            type="text"
            id="vehicleConditionBeforeIncident"
            value={vehicleConditionBeforeIncident}
            onChange={(e) => setVehicleConditionBeforeIncident(e.target.value)}
            placeholder="Vehicle Condition Before Incident"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
        <div className="flex w-full gap-4">
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
    </>
  );
}

export default ExpertiseReportForm;
