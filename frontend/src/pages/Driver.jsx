import React, { useState } from "react";

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: "#1001",
      customer: "Rahul Sharma",
      address: "Delhi, India",
      phone: "9876543210",
      amount: "₹450",
      status: "Pending",
    },
    {
      id: "#1002",
      customer: "Priya Verma",
      address: "Mumbai, India",
      phone: "9123456780",
      amount: "₹799",
      status: "Picked Up",
    },
    {
      id: "#1003",
      customer: "Amit Singh",
      address: "Jaipur, India",
      phone: "9988776655",
      amount: "₹299",
      status: "Delivered",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Picked Up":
        return "bg-blue-500";
      case "Out for Delivery":
        return "bg-purple-500";
      case "Delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status === "Pending"
  ).length;
  const deliveredOrders = orders.filter(
    (o) => o.status === "Delivered"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <nav className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">QuickDeliver</h1>
        <button className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600">
          Logout
        </button>
      </nav>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Pending Orders</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {pendingOrders}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Delivered Orders</h2>
          <p className="text-3xl font-bold text-green-500">
            {deliveredOrders}
          </p>
        </div>
      </div>

      {/* Orders */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{order.id}</h2>

              <span
                className={`text-white px-3 py-1 rounded-full text-sm ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <p>
                <strong>Customer:</strong> {order.customer}
              </p>

              <p>
                <strong>Address:</strong> {order.address}
              </p>

              <p>
                <strong>Phone:</strong> {order.phone}
              </p>

              <p>
                <strong>Amount:</strong> {order.amount}
              </p>
            </div>

            {/* Status Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-5">
              <button
                onClick={() => updateStatus(order.id, "Pending")}
                className="bg-yellow-500 text-white py-2 rounded-lg hover:opacity-90"
              >
                Pending
              </button>

              <button
                onClick={() => updateStatus(order.id, "Picked Up")}
                className="bg-blue-500 text-white py-2 rounded-lg hover:opacity-90"
              >
                Picked Up
              </button>

              <button
                onClick={() =>
                  updateStatus(order.id, "Out for Delivery")
                }
                className="bg-purple-500 text-white py-2 rounded-lg hover:opacity-90"
              >
                Out Delivery
              </button>

              <button
                onClick={() => updateStatus(order.id, "Delivered")}
                className="bg-green-500 text-white py-2 rounded-lg hover:opacity-90"
              >
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDashboard;