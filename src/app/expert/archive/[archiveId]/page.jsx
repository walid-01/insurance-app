"use client";
import useArchive from "@/hooks/useArchive";
import { useLayoutEffect, useState } from "react";
import { notFound } from "next/navigation";
import { formatDate } from "@/utils/DateFormats";

export default function ArchiveFilePage({ params }) {
  const { getArchiveById } = useArchive();
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);

  const loadFileById = async () => {
    const response = await getArchiveById(params.archiveId);
    console.log(response);
    if (response === 404) {
      setStatus(404);
      return;
    }
    setFile(response);
    setStatus(200);
  };

  useLayoutEffect(() => {
    loadFileById();
  }, []);

  if (status === 404) return notFound();
  else if (status === 200)
    return (
      <div className="space-y-4 flex flex-col m-auto w-1/2">
        {file && (
          <div className="space-y-4">
            <p>
              <span className="font-bold">Expert Name: </span>
              {file.expertName}
            </p>
            <div className="flex w-full justify-between">
              <p>
                <span className="font-bold">Issue Date: </span>
                {formatDate(file.incidentDate)}
              </p>
              <p className="w-1/3">
                <span className="font-bold">Reference: </span>
                {file.reference}
              </p>
            </div>
            <div className="w-full flex justify-between">
              <div className="w-1/3">
                <div className="space-y-2 mb-4">
                  <p className="font-bold">Victim Details:</p>
                  <ul>
                    <li>Full Name: {file.victimFullName}</li>
                    <li>Policy Number: {file.victimPolicyNumber}</li>
                    <li>Insurance Name: {file.victimInsuranceName}</li>
                    <li>Insurance Address: {file.victimInsuranceAddress}</li>
                    <li>Insurance Code: {file.victimInsuranceCode}</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-bold">At Fault Party Details:</p>
                  <ul>
                    <li>Full Name: {file.atFaultFullName}</li>
                    <li>Policy Number: {file.atFaultPolicyNumber}</li>
                    <li>Insurance Name: {file.atFaultInsuranceName}</li>
                    <li>Insurance Code: {file.atFaultInsuranceCode}</li>
                    <li>Insurance Address: {file.atFaultInsuranceAddress}</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-2 w-1/3">
                <p className="font-bold">Vehicle Details:</p>
                <ul>
                  <li>Maker & Model: {file.vehicleMakerAndModel}</li>
                  <li>License Plate: {file.vehicleLicensePlate}</li>
                  <li>Type: {file.vehicleType}</li>
                  <li>Series Number: {file.vehicleSeriesNumber}</li>
                  <li>Genre: {file.vehicleGenre}</li>
                  <li>Weight: {file.vehicleWeight}</li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-bold">Damage Details:</p>
              <ul>
                <li>
                  Vehicle Condition Before Incident:{" "}
                  {file.vehicleConditionBeforeIncident}
                </li>
                <li>Impact Point: {file.impactPoint}</li>
                <li>Damaged Point: {file.damagedPoint}</li>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="border border-gray-300">Part Name</th>
                      <th className="border border-gray-300">Part Price</th>
                      <th className="border border-gray-300">Repairable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {file.damagedParts.map((part, index) => (
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
                <li>Paint and Additions Cost: {file.paintAndAdditions}</li>
                <li>Labor Description: {file.laborDescription}</li>
                <li>Labor Cost: {file.laborCost}</li>
                <li>
                  Damage Part Total Cost Before Reduction:{" "}
                  {file.damagePartTotalCostBeforeReduction}
                </li>
                <li>Reduction: {file.reduction}</li>
                <li>
                  Damage Part Total Reduction Cost:{" "}
                  {file.damagePartTotalReductionCost}
                </li>
                <li>
                  Damage Part Total Cost After Reduction:{" "}
                  {file.damagePartTotalCostAfterReduction}
                </li>
                <li>
                  <span className="font-bold">Total: </span>
                  {file.total}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
}
