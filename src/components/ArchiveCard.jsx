"use client";
import Link from "next/link";
import { formatDate } from "@/utils/DateFormats";

export default function ArchiveCard({ file }) {
  console.log(file);
  return (
    <div className="px-6 py-6 border-cyan-800 border-4 rounded-md flex flex-col gap-2 w-full">
      <Link href={`/expert/archive/${file.id}`}>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-2">
            <p className="font-medium">Date: </p>
            <p>{formatDate(file.incidentDate)}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-medium">Car: </p>
            <p>{file.vehicleMakerAndModel}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-medium">Licensed: </p>
            <p>{file.vehicleLicensePlate}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-medium">From Company: </p>
            <p>{file.victimInsuranceName}</p>
            <p>{file.victimInsuranceAddress}</p>
          </div>
        </div>
        <p className="font-thin text-sm hover:underline w-fit mt-2">
          View More...
        </p>
      </Link>
    </div>
  );
}
