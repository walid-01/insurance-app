"use client";

import useServiceOrder from "@/hooks/useServiceOrder";
import { useState, useEffect } from "react";
import { formatDate } from "@/utils/DateFormats";

const MostRecentReportCard = () => {
  const { getOrders } = useServiceOrder();
  const [latestOrder, setLatestOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const loadOrders = async () => {
      const responseOrders = await getOrders();
      console.log(responseOrders[0]);
      setLatestOrder(responseOrders[0]);
    };

    loadOrders();
    setIsLoading(false);
  }, []);

  return (
    <div className="px-6 py-6 border-cyan-800 border-8 rounded-xl flex flex-col gap-2 w-full">
      {!isLoading ? (
        latestOrder ? (
          <>
            <h2 className="text-2xl mb-4">My Reports</h2>
            <div className="flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <h3 className="text-xl">Latest Report</h3>
                <p>{formatDate(latestOrder.issueDate)}</p>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex gap-2">
                  <p className="font-medium">Car: </p>
                  <p>{latestOrder.vehicleMakerAndModel}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Licensed: </p>
                  <p>{latestOrder.vehicleLicensePlate}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">From Company: </p>
                  <p>
                    {latestOrder.victimInsurance
                      ? latestOrder.victimInsurance.name
                      : "loading"}
                  </p>
                  <p>
                    {latestOrder.victimInsurance
                      ? latestOrder.victimInsurance.address
                      : "loading"}
                  </p>
                </div>
              </div>
              <p className="font-thin text-sm hover:underline w-fit">
                View More...
              </p>
            </div>
          </>
        ) : (
          <h3 className="text-2xl hover:underline">Click to view all orders</h3>
        )
      ) : (
        <>
          <h3 className="text-2xl">Latest Report</h3>
          <p>Loading...</p>
        </>
      )}
    </div>
  );
};

export default MostRecentReportCard;
