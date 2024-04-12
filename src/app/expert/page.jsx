"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import Link from "next/link";
import getRandomSalutation from "@/utils/RandomSalutation";
import MostRecentReportCard from "@/components/MostRecentReportCard";
import PlaceHolderCard from "@/components/PlaceHolderCard";
import ImageTitle from "@/components/ImageTitle";

export default function Expert() {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  // Example usage:
  const randomSalutation = getRandomSalutation();

  return (
    <>
      <ImageTitle
        imgName="2023-BMW-3-Series-6.png"
        titleText={`${randomSalutation} ${user.firstName} ${user.lastName}!`}
        // imgStyle=""
        // titleStyle=""
      />
      <div className="grid grid-cols-2 gap-4">
        <Link href="/expert/reports">
          <MostRecentReportCard />
        </Link>
        <PlaceHolderCard />
        <PlaceHolderCard />
        <PlaceHolderCard />
      </div>
    </>
  );
}
