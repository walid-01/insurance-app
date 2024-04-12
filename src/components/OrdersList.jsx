"use client";

import useServiceOrder from "@/hooks/useServiceOrder";
import { useState, useEffect } from "react";
import ServiceOrderCard from "@/components/ServiceOrderCard";
import useToken from "@/hooks/useToken";
import ImageTitle from "./ImageTitle";

export default function OrdersList() {
  const { getOrders } = useServiceOrder();
  const { getRole } = useToken();

  const role = getRole();

  const [orders, setOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [awaitingOrders, setAwaitingOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setAwaitingOrders([]);
    setFinishedOrders([]);

    const responseOrders = await getOrders();
    setOrders(responseOrders);

    // console.log(responseOrders);

    responseOrders.map((order) =>
      order.expertiseReport === null
        ? setAwaitingOrders((prevOrders) => [...prevOrders, order])
        : setFinishedOrders((prevOrders) => [...prevOrders, order])
    );
  };

  return (
    <>
      <ImageTitle imgName="car-inspection.jpg" titleText="Reports" />
      <div>
        <h1 className="text-2xl font-medium text-cyan-900 mb-5">
          Orders Awaiting For Reports
        </h1>
        <div className="flex flex-col gap-6 mb-10">
          {awaitingOrders.length > 0 ? (
            awaitingOrders.map((order) => (
              <ServiceOrderCard order={order} role={role} />
            ))
          ) : (
            <p>Nothing to show</p>
          )}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-medium text-cyan-900 mb-5">
          Finished Reports
        </h1>
        <div className="flex flex-col gap-6 mb-8">
          {finishedOrders.length > 0 ? (
            finishedOrders.map((order) => (
              <ServiceOrderCard order={order} role={role} />
            ))
          ) : (
            <p>Nothing to show</p>
          )}
        </div>
      </div>
    </>
  );
}
