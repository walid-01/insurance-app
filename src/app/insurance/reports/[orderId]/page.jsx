"use client";

import useServiceOrder from "@/hooks/useServiceOrder";
import { useLayoutEffect, useState } from "react";
import { notFound } from "next/navigation";
import ExpertiseReportForm from "@/components/ExpertiseReportForm";

export default function ReportPage({ params }) {
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
                  <li>Insurance: {order.atFaultInsurance}</li>
                </ul>
              </>
            )}
            {order.expertiseReport !== null ? (
              <h1 className="text-red-500">
                TO DO: ADD EXPERTISE REPORT FIELDS
              </h1>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(!isFormOpen)}
                >
                  {!isFormOpen ? "Create Report" : "Close"}
                </button>
                {isFormOpen && <ExpertiseReportForm serviceOrderId={orderId} />}
              </>
            )}
          </div>
        )}
      </div>
    );
}
