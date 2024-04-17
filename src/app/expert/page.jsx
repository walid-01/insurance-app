"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import Link from "next/link";
import getRandomSalutation from "@/utils/RandomSalutation";
import MostRecentReportCard from "@/components/MostRecentReportCard";
import ImageTitle from "@/components/ImageTitle";

export default function Expert() {
  const userContext = useContext(UserContext);
  const { user } = userContext;

  const randomSalutation = getRandomSalutation();

  return (
    <>
      <ImageTitle
        imgName="2023-BMW-3-Series-6.png"
        titleText={`${randomSalutation} ${user.firstName} ${user.lastName}!`}
      />
      <div className="grid grid-cols-2 gap-4">
        <Link href="/expert/reports">
          <MostRecentReportCard />
        </Link>
        <Link
          className="w-full h-full flex items-center justify-center border-cyan-800 border-8 rounded-xl min-h-64"
          href="/expert/archive"
        >
          <h3 className="text-2xl hover:underline">Archive</h3>
        </Link>
      </div>
    </>
  );
}
