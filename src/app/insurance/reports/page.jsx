"use client";

import useServiceOrder from "@/hooks/useServiceOrder";
import { useState, useEffect } from "react";
import ServiceOrderCard from "@/components/ServiceOrderCard";

export default function Reports() {
  const { getOrders } = useServiceOrder();

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
      <h1>Reports</h1>
      <div>
        <h1>Orders awaiting for reports</h1>
        {awaitingOrders.length > 0 ? (
          awaitingOrders.map((order) => <ServiceOrderCard order={order} />)
        ) : (
          <p>Nothing to show</p>
        )}
      </div>
      <div>
        <h1>Finished Reports</h1>
        {finishedOrders.length > 0 ? (
          finishedOrders.map((order) => <ServiceOrderCard order={order} />)
        ) : (
          <p>Nothing to show</p>
        )}
      </div>
    </>
  );
}
