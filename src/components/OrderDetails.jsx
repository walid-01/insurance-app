import useServiceOrder from "@/hooks/useServiceOrder";
import { useLayoutEffect, useState } from "react";
import { notFound } from "next/navigation";
import ExpertiseReportForm from "@/components/ExpertiseReportForm";
import useToken from "@/hooks/useToken";
import { formatDate } from "@/utils/DateFormats";

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
      <div className="space-y-4 flex flex-col m-auto w-1/2">
        {order && (
          <div className="space-y-4">
            <p>
              <span className="font-bold">Issue Date:</span>{" "}
              {formatDate(order.issueDate)}
            </p>
            <div className="w-full flex justify-between">
              <div className="w-1/2">
                <div className="space-y-2 mb-4">
                  <p className="font-bold">Victim Details:</p>
                  <ul>
                    <li>Full Name: {order.victimFullName}</li>
                    <li>Policy Number: {order.victimPolicyNumber}</li>
                    <li>City: {order.victimCity}</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">Victim Insurance:</p>
                  <ul>
                    <li>Name: {order.victimInsurance.name}</li>
                    <li>Agency Code: {order.victimInsurance.agencyCode}</li>
                    <li>Address: {order.victimInsurance.address}</li>
                    <li>City: {order.victimInsurance.city}</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-2 w-1/2">
                <p className="font-bold">Victim Vehicle Details:</p>
                <ul>
                  <li>Maker & Model: {order.vehicleMakerAndModel}</li>
                  <li>License Plate: {order.vehicleLicensePlate}</li>
                  <li>Type: {order.vehicleType}</li>
                  <li>Series Number: {order.vehicleSeriesNumber}</li>
                  <li>Genre: {order.vehicleGenre}</li>
                  <li>Weight: {order.vehicleWeight}</li>
                </ul>
              </div>
            </div>
            {order.atFaultInsurance && (
              <div className="space-y-2">
                <p className="font-bold">At Fault Party Details:</p>
                <ul>
                  <li>Full Name: {order.atFaultFullName}</li>
                  <li>Policy Number: {order.atFaultPolicyNumber}</li>
                  <li>City: {order.atFaultCity}</li>
                  <li className="space-y-2">
                    <span className="font-bold">Insurance:</span>
                    <ul>
                      <li>Name: {order.atFaultInsurance.name}</li>
                      <li>Agency Code: {order.atFaultInsurance.agencyCode}</li>
                      <li>Address: {order.atFaultInsurance.address}</li>
                      <li>City: {order.atFaultInsurance.city}</li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
            {order.expertiseReport !== null ? (
              <>
                <div className="space-y-2">
                  <h2 className="font-bold">Expertise Report</h2>
                  <ul>
                    <li>Reference: {order.expertiseReport.reference}</li>
                    <li>Incident: {order.expertiseReport.incident}</li>
                    <li>
                      Incident Date:
                      {new Date(
                        order.expertiseReport.incidentDate
                      ).toLocaleString()}
                    </li>
                    <li>
                      Vehicle Condition Before Incident:
                      {order.expertiseReport.vehicleConditionBeforeIncident}
                    </li>
                    <li>Impact Point: {order.expertiseReport.impactPoint}</li>
                    <li>Damaged Point: {order.expertiseReport.damagedPoint}</li>
                    <li>
                      Paint and Additions Cost:
                      {order.expertiseReport.paintAndAdditions}
                    </li>
                    <li>
                      Labor Description:
                      {order.expertiseReport.laborDescription}
                    </li>
                    <li>Labor Cost: {order.expertiseReport.laborCost}</li>
                    <li>
                      Damaged Part Total Cost Before Reduction:
                      {order.expertiseReport.damagePartTotalCostBeforeReduction}
                    </li>
                    <li>
                      Damaged Part Total Percentage:
                      {order.expertiseReport.reduction}%
                    </li>
                    <li>
                      Damaged Part Total Reduction Cost:
                      {order.expertiseReport.damagePartTotalReductionCost}
                    </li>
                    <li>
                      Damaged Part Total Cost After Reduction:
                      {order.expertiseReport.damagePartTotalCostAfterReduction}
                    </li>
                    <li>Total Cost: {order.expertiseReport.total}</li>
                  </ul>
                  <h3 className="font-bold">Damaged Parts</h3>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="border border-gray-300">Part Name</th>
                        <th className="border border-gray-300">Part Price</th>
                        <th className="border border-gray-300">Repairable</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.expertiseReport.damagedParts.map((part, index) => (
                        <tr key={index} className="border border-gray-300">
                          <td className="border border-gray-300 px-2 py-1">
                            {part.partName}
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            {part.partPrice}
                          </td>
                          <td className="border border-gray-300 px-2 py-1">
                            {part.isRepairable ? "Yes" : "No"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {role === "insurance" ? (
                  <>
                    <div className="space-y-2">
                      <p className="font-bold">Associated Expert Details:</p>
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
                      <p>
                        <span className="font-bold">State: </span>Awaiting
                        insurance response
                      </p>
                    ) : order.expertiseReport.state === 1 ? (
                      <p>
                        <span className="font-bold">
                          State:
                          <span className="text-green-700"> Accepted </span>
                        </span>
                        by insurance
                      </p>
                    ) : (
                      <p>
                        <span className="font-bold">
                          State:
                          <span className="text-red-600"> Rejected </span>
                        </span>
                        by insurance
                      </p>
                    )}
                    {order.expertiseReport.state === 0 && (
                      <div className="space-x-2">
                        <button
                          type="button"
                          onClick={async () => {
                            await reportRespond(order.expertiseReport.id, true);
                            loadOrderById();
                          }}
                          className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await reportRespond(
                              order.expertiseReport.id,
                              false
                            );
                            loadOrderById();
                          }}
                          className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {order.expertiseReport.state === 0 ? (
                      <p className="font-bold">
                        State: Awaiting insurance response
                      </p>
                    ) : order.expertiseReport.state === 1 ? (
                      <p>
                        <span className="font-bold">
                          State:
                          <span className="text-green-700"> Accepted </span>
                        </span>
                        by insurance
                      </p>
                    ) : (
                      <p>
                        <span className="font-bold">
                          State:
                          <span className="text-red-600"> Rejected </span>
                        </span>
                        by insurance
                      </p>
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
                      className={`${
                        !isFormOpen
                          ? "bg-cyan-700 text-white focus:ring-cyan-800 hover:bg-cyan-800"
                          : "bg-gray-300 text-gray-700 focus:ring-gray-500 hover:bg-gray-400"
                      } px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300 ease-in-out`}
                    >
                      {!isFormOpen ? "Create Report" : "Close"}
                    </button>
                    {isFormOpen && (
                      <ExpertiseReportForm serviceOrderId={orderId} />
                    )}
                  </>
                ) : (
                  <p className="font-bold">State: Awaiting Expertise Report</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
}
