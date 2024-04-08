import useServiceOrder from "@/hooks/useServiceOrder";
import React, { useState } from "react";

function ExpertiseReportForm({ serviceOrderId }) {
  const { submitExpertiseReport } = useServiceOrder();

  const [error, setError] = useState(null);

  const [reference, setReference] = useState("");
  const [incident, setIncident] = useState("");
  const [incidentDate, setIncidentDate] = useState(new Date()); // Set initial value to current date
  const [vehicleConditionBeforeIncident, setVehicleConditionBeforeIncident] =
    useState("");
  const [impactPoint, setImpactPoint] = useState("");
  const [damagedPoint, setDamagedPoint] = useState("");
  const [paintAndAdditions, setPaintAndAdditions] = useState(0);
  const [laborDescription, setLaborDescription] = useState("");
  const [laborCost, setLaborCost] = useState(0);

  const [damagedParts, setDamagedParts] = useState([
    {
      partName: "",
      partPrice: 0,
      reduction: 0,
      isRepairable: false,
    },
  ]);

  const handleAddDamagedPart = () => {
    setDamagedParts([
      ...damagedParts,
      {
        partName: "",
        partPrice: 0,
        reduction: 0,
        expertiseReportID: 0,
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
      serviceOrderId,
      damagedParts,
    };

    const response = await submitExpertiseReport(reportData);
    console.log(response);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          placeholder="Reference"
        />
        <input
          required
          type="text"
          value={incident}
          onChange={(e) => setIncident(e.target.value)}
          placeholder="Incident"
        />
        <input
          required
          type="datetime-local"
          value={incidentDate.toISOString().slice(0, 16)} // Format for datetime-local input
          onChange={(e) => setIncidentDate(new Date(e.target.value))}
          placeholder="Incident Date"
        />
        <input
          required
          type="text"
          value={vehicleConditionBeforeIncident}
          onChange={(e) => setVehicleConditionBeforeIncident(e.target.value)}
          placeholder="Vehicle Condition Before Incident"
        />
        <input
          required
          type="text"
          value={impactPoint}
          onChange={(e) => setImpactPoint(e.target.value)}
          placeholder="Impact Point"
        />
        <input
          required
          type="text"
          value={damagedPoint}
          onChange={(e) => setDamagedPoint(e.target.value)}
          placeholder="Damaged Point"
        />
        <input
          required
          type="number"
          value={paintAndAdditions}
          onChange={(e) => setPaintAndAdditions(e.target.value)}
          placeholder="Paint & Additions Cost"
        />
        <input
          required
          type="text"
          value={laborDescription}
          onChange={(e) => setLaborDescription(e.target.value)}
          placeholder="Labor Description"
        />
        <input
          required
          type="number"
          value={laborCost}
          onChange={(e) => setLaborCost(e.target.value)}
          placeholder="Labor Cost"
        />
        {damagedParts.map((part, index) => (
          <fieldset key={index}>
            <legend>Damaged Part {index + 1}</legend>
            <input
              required
              type="text"
              value={part.partName}
              onChange={(e) =>
                setDamagedParts((prevParts) =>
                  prevParts.map((p, i) =>
                    i === index ? { ...p, partName: e.target.value } : p
                  )
                )
              }
              placeholder="Part Name"
            />
            <input
              required
              type="number"
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
            />
            <input
              required
              type="number"
              value={part.reduction}
              onChange={(e) =>
                setDamagedParts((prevParts) =>
                  prevParts.map((p, i) =>
                    i === index
                      ? { ...p, reduction: e.target.valueAsNumber }
                      : p
                  )
                )
              }
              placeholder="Reduction"
            />
            <input
              type="checkbox"
              checked={part.isRepairable}
              onChange={(e) =>
                setDamagedParts((prevParts) =>
                  prevParts.map((p, i) =>
                    i === index ? { ...p, isRepairable: e.target.checked } : p
                  )
                )
              }
            />
            <label htmlFor="isRepairable">Is Repairable?</label>
            {index > 0 && ( // Only show the "Remove" button for parts other than the first one
              <button
                type="button"
                onClick={() => handleRemoveDamagedPart(index)}
              >
                Remove
              </button>
            )}
          </fieldset>
        ))}

        <button type="button" onClick={handleAddDamagedPart}>
          Add Damaged Part
        </button>

        <button type="submit">Create Report</button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
}

export default ExpertiseReportForm;
