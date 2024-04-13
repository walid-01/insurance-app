"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import Link from "next/link";
import getRandomSalutation from "@/utils/RandomSalutation";
import MostRecentReportCard from "@/components/MostRecentReportCard";
import PlaceHolderCard from "@/components/PlaceHolderCard";
import ImageTitle from "@/components/ImageTitle";

export default function Insurance() {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  const randomSalutation = getRandomSalutation();
  return (
    <div>
      <ImageTitle
        imgName="2023-BMW-3-Series-6.png"
        titleText={`${randomSalutation}!`}
        // imgStyle=""
        // titleStyle=""
      />
      <div className="grid grid-cols-2 gap-4">
        <Link href="/insurance/reports">
          <MostRecentReportCard />
        </Link>
        <Link
          className="w-full h-full flex items-center justify-center border-cyan-800 border-8 rounded-xl min-h-64 hover:underline"
          href="/insurance/new-service-order"
        >
          <h2 className="text-2xl mb-4">Create New Order</h2>
        </Link>
        {/* <PlaceHolderCard />
        <PlaceHolderCard /> */}
      </div>
    </div>
  );
}
