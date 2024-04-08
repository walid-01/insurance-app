"use client";

import useServiceOrder from "@/hooks/useServiceOrder";
import { useLayoutEffect, useState } from "react";
import { notFound } from "next/navigation";
import ExpertiseReportForm from "@/components/ExpertiseReportForm";
import useToken from "@/hooks/useToken";

export default function OrderDetails({ params }) {
  const { getRole } = useToken();
  const { reportRespond } = useServiceOrder();
  const role = getRole();

  const orderId = params.orderId;
  const { getOrderById } = useServiceOrder();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadOrderById = async () => {
    const response = await getOrderById(orderId);
    console.log(response);
    if (response === 404) {
      setStatus(404);
      return;
    }
    setOrder(response);
    setStatus(200);
  };

  useLayoutEffect(() => {
    loadOrderById();
  }, []);

  if (status === 404) return notFound();
  else if (status === 200)
    return (
      <div>
        <h1>Report for Service Order {orderId}</h1>
        {order && (
          <div>
            <p>Issue Date: {order.issueDate}</p>
            <p>Victim Details:</p>
            <ul>
              <li>Full Name: {order.victimFullName}</li>
              <li>Policy Number: {order.victimPolicyNumber}</li>
              <li>City: {order.victimCity}</li>
            </ul>
            <p>Victim Insurance:</p>
            <ul>
              <li>Name: {order.victimInsurance.name}</li>
              <li>Agency Code: {order.victimInsurance.agencyCode}</li>
              <li>Address: {order.victimInsurance.address}</li>
              <li>City: {order.victimInsurance.city}</li>
            </ul>
            <p>Victim Vehicle Details:</p>
            <ul>
              <li>Maker & Model: {order.vehicleMakerAndModel}</li>
              <li>License Plate: {order.vehicleLicensePlate}</li>
              <li>Type: {order.vehicleType}</li>
              <li>Series Number: {order.vehicleSeriesNumber}</li>
              <li>Genre: {order.vehicleGenre}</li>
              <li>Weight: {order.vehicleWeight}</li>
            </ul>
            {order.atFaultInsurance && (
              <>
                <p>At Fault Party Details:</p>
                <ul>
                  <li>Full Name: {order.atFaultFullName}</li>
                  <li>Policy Number: {order.atFaultPolicyNumber}</li>
                  <li>City: {order.atFaultCity}</li>
                  <li>
                    Insurance:
                    <ul>
                      <li>Name: {order.atFaultInsurance.name}</li>
                      <li>Agency Code: {order.atFaultInsurance.agencyCode}</li>
                      <li>Address: {order.atFaultInsurance.address}</li>
                      <li>City: {order.atFaultInsurance.city}</li>
                    </ul>
                  </li>
                </ul>
              </>
            )}
            {order.expertiseReport !== null ? (
              <>
                <div>
                  <h2>Expertise Report</h2>
                  <ul>
                    <li>Reference: {order.expertiseReport.reference}</li>
                    <li>Incident: {order.expertiseReport.incident}</li>
                    <li>
                      Incident Date:{" "}
                      {new Date(
                        order.expertiseReport.incidentDate
                      ).toLocaleString()}
                    </li>
                    <li>
                      Vehicle Condition Before Incident:{" "}
                      {order.expertiseReport.vehicleConditionBeforeIncident}
                    </li>
                    <li>Impact Point: {order.expertiseReport.impactPoint}</li>
                    <li>Damaged Point: {order.expertiseReport.damagedPoint}</li>
                    <li>
                      Paint and Additions Cost:{" "}
                      {order.expertiseReport.paintAndAdditions}
                    </li>
                    <li>
                      Labor Description:{" "}
                      {order.expertiseReport.laborDescription}
                    </li>
                    <li>Labor Cost: {order.expertiseReport.laborCost}</li>
                    <li>
                      Damaged Part Total Cost Before Reduction:{" "}
                      {order.expertiseReport.damagePartTotalCostBeforeReduction}
                    </li>
                    <li>
                      Damaged Part Total Percentage:{" "}
                      {order.expertiseReport.damagePartTotalPercentage}%
                    </li>
                    <li>
                      Damaged Part Total Reduction Cost:{" "}
                      {order.expertiseReport.damagePartTotalReductionCost}
                    </li>
                    <li>
                      Damaged Part Total Cost After Reduction:{" "}
                      {order.expertiseReport.damagePartTotalCostAfterReduction}
                    </li>
                    <li>Total Cost: {order.expertiseReport.total}</li>
                  </ul>
                  <h3>Damaged Parts</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Part Name</th>
                        <th>Part Price</th>
                        <th>Reduction</th>
                        <th>Repairable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.expertiseReport.damagedParts.map((part, index) => (
                        <tr key={index}>
                          <td>{part.partName}</td>
                          <td>{part.partPrice}</td>
                          <td>{part.reduction}%</td>
                          <td>{part.isRepairable ? "Yes" : "No"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {role === "insurance" ? (
                  <>
                    <div>
                      <p>Associated Expert Details:</p>
                      <ul>
                        <li>
                          Full Name :
                          {order.associatedExpert.firstName +
                            " " +
                            order.associatedExpert.lastName}
                        </li>
                        <li>Address: {order.associatedExpert.address}</li>
                        <li>
                          Phone Number: {order.associatedExpert.phoneNumber}
                        </li>
                        {/* <li>
                        City: {order.associatedExpert.city}
                      </li> */}
                      </ul>
                    </div>
                    {order.expertiseReport.state === 0 ? (
                      <p>State: Awaiting insurance response</p>
                    ) : order.expertiseReport.state === 1 ? (
                      <p>State: Accepted by insurance</p>
                    ) : (
                      <p>State: Rejected by insurance</p>
                    )}
                    {order.expertiseReport.state === 0 && (
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            reportRespond(order.expertiseReport.id, true)
                          }
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            reportRespond(order.expertiseReport.id, false)
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {order.expertiseReport.state === 0 ? (
                      <p>State: Awaiting insurance response</p>
                    ) : order.expertiseReport.state === 1 ? (
                      <p>State: Accepted by insurance</p>
                    ) : (
                      <p>State: Rejected by insurance</p>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {role === "expert" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(!isFormOpen)}
                    >
                      {!isFormOpen ? "Create Report" : "Close"}
                    </button>
                    {isFormOpen && (
                      <ExpertiseReportForm serviceOrderId={orderId} />
                    )}
                  </>
                ) : (
                  <p>State: Awaiting Expertise Report</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
}
