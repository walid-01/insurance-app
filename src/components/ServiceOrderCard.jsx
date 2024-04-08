"use client";
import Link from "next/link";

export default function ServiceOrderCard({ order, role }) {
  return (
    <Link href={`/${role}/reports/${order.id}`}>
      <div>
        <p>{order.vehicleMakerAndModel}</p>
        <p>{order.victimInsurance.name}</p>
        <p>{order.victimInsurance.address}</p>
        <p>{order.issueDate}</p>
      </div>
    </Link>
  );
}
