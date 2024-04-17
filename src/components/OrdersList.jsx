import React, { useState, useEffect } from "react";
import useServiceOrder from "@/hooks/useServiceOrder";
import useToken from "@/hooks/useToken";
import ServiceOrderCard from "@/components/ServiceOrderCard";
import ImageTitle from "./ImageTitle";

export default function OrdersList() {
  const { getOrders } = useServiceOrder();
  const { getRole } = useToken();

  const role = getRole();

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all"); // Default filter is set to "all"
  const [subFilter, setSubFilter] = useState("all"); // Default sub-filter is set to "all"
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    loadOrders();
  }, [filter]); // Reload orders when filter changes

  const loadOrders = async () => {
    const responseOrders = await getOrders();
    setOrders(responseOrders);
  };

  const filterOrders = (order) => {
    if (filter === "all") return true;
    if (filter === "awaiting") return order.expertiseReport === null;
    if (filter === "finished") return order.expertiseReport !== null;
    return false;
  };

  const subFilterOrders = (order) => {
    if (subFilter === "all") return true;
    if (subFilter === "accepted") return order.expertiseReport.state === 1;
    if (subFilter === "rejected") return order.expertiseReport.state === -1;
    if (subFilter === "awaiting") return order.expertiseReport.state === 0;
    return false;
  };

  const searchByCar = (order) => {
    if (!searchTerm) return true; // If search term is empty, show all orders
    const carInfo = order.vehicleMakerAndModel.toLowerCase();
    return carInfo.includes(searchTerm.toLowerCase());
  };

  return (
    <>
      <ImageTitle imgName="car-inspection.jpg" titleText="Reports" />
      <div className="w-full flex justify-between">
        <div>
          <div className="flex gap-4 mb-4">
            <button
              className={`${
                filter === "all" ? "bg-cyan-900" : "bg-gray-300"
              } text-white px-4 py-2 rounded-md`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`${
                filter === "awaiting" ? "bg-cyan-900" : "bg-gray-300"
              } text-white px-4 py-2 rounded-md`}
              onClick={() => setFilter("awaiting")}
            >
              Awaiting Reports
            </button>
            <button
              className={`${
                filter === "finished" ? "bg-cyan-900" : "bg-gray-300"
              } text-white px-4 py-2 rounded-md`}
              onClick={() => setFilter("finished")}
            >
              Finished Reports
            </button>
          </div>
          {filter === "finished" && (
            <div className="flex gap-4 mb-4">
              <button
                className={`${
                  subFilter === "all" ? "bg-cyan-900" : "bg-gray-300"
                } text-white px-4 py-2 rounded-md`}
                onClick={() => setSubFilter("all")}
              >
                All
              </button>
              <button
                className={`${
                  subFilter === "accepted" ? "bg-cyan-900" : "bg-gray-300"
                } text-white px-4 py-2 rounded-md`}
                onClick={() => setSubFilter("accepted")}
              >
                Accepted By Insurance
              </button>
              <button
                className={`${
                  subFilter === "rejected" ? "bg-cyan-900" : "bg-gray-300"
                } text-white px-4 py-2 rounded-md`}
                onClick={() => setSubFilter("rejected")}
              >
                Rejected By Insurance
              </button>
              <button
                className={`${
                  subFilter === "awaiting" ? "bg-cyan-900" : "bg-gray-300"
                } text-white px-4 py-2 rounded-md`}
                onClick={() => setSubFilter("awaiting")}
              >
                Awaiting Insurance Response
              </button>
            </div>
          )}
        </div>
        {/* Search input field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search For Cars"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 mb-10">
        {orders.length > 0 ? (
          orders
            .filter(filterOrders)
            .filter(filter === "finished" ? subFilterOrders : () => true)
            .filter(searchByCar) // Apply search filter
            .map((order) => (
              <ServiceOrderCard key={order.id} order={order} role={role} />
            ))
        ) : (
          <p>Nothing to show</p>
        )}
        {orders.length > 0 &&
          orders
            .filter(filterOrders)
            .filter(filter === "finished" ? subFilterOrders : () => true)
            .filter(searchByCar).length === 0 && ( // Apply search filter
            <p>No matching results</p>
          )}
      </div>
    </>
  );
}
