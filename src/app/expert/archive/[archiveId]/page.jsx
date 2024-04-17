"use client";
import useArchive from "@/hooks/useArchive";
import { useLayoutEffect, useState } from "react";
import { notFound } from "next/navigation";
import { formatDate } from "@/utils/DateFormats";
import { formatCurrency } from "@/utils/CurrencyFormats";

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
              <span className="font-bold text-lg text-cyan-900">
                Expert Name:{" "}
              </span>
              {file.expertName}
            </p>
            <div className="flex w-full justify-between">
              <p>
                <span className="font-bold text-lg text-cyan-900">
                  Issue Date:{" "}
                </span>
                {formatDate(file.incidentDate)}
              </p>
              <p className="w-1/3">
                <span className="font-bold text-lg text-cyan-900">
                  Reference:{" "}
                </span>
                {file.reference}
              </p>
            </div>
            <div className="w-full flex justify-between">
              <div className="w-1/3">
                <div className="space-y-2 mb-4">
                  <p className="font-bold text-lg text-cyan-900">
                    Victim Details:
                  </p>
                  <ul className="flex flex-col gap-1">
                    <li>Full Name: {file.victimFullName}</li>
                    <li>Policy Number: {file.victimPolicyNumber}</li>
                    <li>Insurance Name: {file.victimInsuranceName}</li>
                    <li>Insurance Address: {file.victimInsuranceAddress}</li>
                    <li>Agency Code: {file.victimInsuranceCode}</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-lg text-cyan-900">
                    At Fault Party Details:{" "}
                  </p>
                  <ul className="flex flex-col gap-1">
                    <li>
                      Full Name:{" "}
                      {file.atFaultFullName ? file.atFaultFullName : "//"}
                    </li>
                    <li>
                      Policy Number:{" "}
                      {file.atFaultPolicyNumber
                        ? file.atFaultPolicyNumber
                        : "//"}
                    </li>
                    <li>
                      Insurance Name:{" "}
                      {file.atFaultInsuranceName
                        ? file.atFaultInsuranceName
                        : "//"}
                    </li>
                    <li>
                      Agency Code:{" "}
                      {file.atFaultInsuranceCode
                        ? file.atFaultInsuranceCode
                        : "//"}
                    </li>
                    <li>
                      Insurance Address:{" "}
                      {file.atFaultInsuranceAddress
                        ? file.atFaultInsuranceAddress
                        : "//"}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-2 w-1/3">
                <p className="font-bold text-lg text-cyan-900">
                  Vehicle Details:
                </p>
                <ul className="flex flex-col gap-1">
                  <li>Maker & Model: {file.vehicleMakerAndModel}</li>
                  <li>License Plate: {file.vehicleLicensePlate}</li>
                  <li>Type: {file.vehicleType}</li>
                  <li>Series Number: {file.vehicleSeriesNumber}</li>
                  <li>Genre: {file.vehicleGenre}</li>
                  <li>Weight: {file.vehicleWeight}Kg</li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-lg text-cyan-900">Damage Details:</p>
              <ul className="flex flex-col gap-1">
                <li>
                  Vehicle Condition Before Incident:{" "}
                  {file.vehicleConditionBeforeIncident}
                </li>
                <li>Impact Point: {file.impactPoint}</li>
                <li>Damaged Point: {file.damagedPoint}</li>
                <li>Damaged Parts: </li>
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
                          {formatCurrency(part.partPrice)}
                        </td>
                        {part.isRepairable ? (
                          <td className="border border-gray-300 px-2 py-1 text-red-700">
                            Yes
                          </td>
                        ) : (
                          <td className="border border-gray-300 px-2 py-1 text-green-700">
                            No
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <li className="flex justify-between">
                  <p>Damaged Parts Total Cost Before Reduction: </p>
                  <p>
                    {formatCurrency(file.damagePartTotalCostBeforeReduction)}
                  </p>
                </li>
                <li className="flex justify-between">
                  Reduction Percentage: {file.reduction}%
                </li>
                <li className="flex justify-between">
                  <p>Damaged Parts Total Reduction Cost: </p>
                  <p>{formatCurrency(file.damagePartTotalReductionCost)}</p>
                </li>
                <li className="flex justify-between">
                  <p>Damaged Parts Total Cost After Reduction: </p>
                  <p>
                    {formatCurrency(file.damagePartTotalCostAfterReduction)}
                  </p>
                </li>
                <li className="flex justify-between">
                  <p>Paint and Additions Cost: </p>
                  <p>{formatCurrency(file.paintAndAdditions)}</p>
                </li>
                <li className="flex justify-between">
                  Labor Description: {file.laborDescription}
                </li>
                <li className="flex justify-between">
                  <p>Labor Cost: </p>
                  <p>{formatCurrency(file.laborCost)}</p>
                </li>
                <li className="flex justify-between">
                  <p className="font-bold text-lg">Total: </p>
                  <p>{formatCurrency(file.total)}</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
}
