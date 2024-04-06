"use client";

import useServiceOrder from "@/hooks/useServiceOrder";
import { useState, useEffect } from "react";

export default function Reports() {
  const { getOrders } = useServiceOrder();

  const [orders, setOrders] = useState({});
  useEffect(() => {
    loadOrders();
  });

  const loadOrders = async () => {
    const responseOrders = await getOrders();
    setOrders(responseOrders);
  };
  return (
    <>
      <h1>Reports</h1>
      <div>{orders.id}</div>
    </>
  );
}
