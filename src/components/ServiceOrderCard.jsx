"use client";
import Link from "next/link";
import { formatDate } from "@/utils/DateFormats";

export default function ServiceOrderCard({ order, role }) {
  return (
    <div className="px-6 py-6 border-cyan-800 border-4 rounded-md flex flex-col gap-2 w-full">
      <Link href={`/${role}/reports/${order.id}`}>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex gap-2">
            <p className="font-medium">Date: </p>
            <p>{formatDate(order.issueDate)}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-medium">Car: </p>
            <p>{order.vehicleMakerAndModel}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-medium">Licensed: </p>
            <p>{order.vehicleLicensePlate}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-medium">From Company: </p>
            <p>
              {order.victimInsurance ? order.victimInsurance.name : "loading"}
            </p>
            <p>
              {order.victimInsurance
                ? order.victimInsurance.address
                : "loading"}
            </p>
          </div>
        </div>
        <p className="font-thin text-sm hover:underline w-fit mt-2">
          View More...
        </p>
      </Link>
    </div>
  );
}
