import React, { useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([
    {
      id: "#2001",
      customer: "Rahul Sharma",
      driver: "Not Assigned",
      amount: "₹450",
      status: "Pending",
    },
    {
      id: "#2002",
      customer: "Priya Verma",
      driver: "Aman",
      amount: "₹799",
      status: "Out for Delivery",
    },
    {
      id: "#2003",
      customer: "Amit Singh",
      driver: "Rohit",
      amount: "₹299",
      status: "Delivered",
    },
  ]);

  const drivers = ["Aman", "Rohit", "Karan", "Suresh"];

  const assignDriver = (id, driverName) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, driver: driverName }
        : order
    );

    setOrders(updatedOrders);
  };

  const updateStatus = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status: status }
        : order
    );

    setOrders(updatedOrders);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Out for Delivery":
        return "bg-blue-500";
      case "Delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-black text-white p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">
          QuickDeliver Admin
        </h1>

        <button className="bg-red-500 px-4 py-2 rounded-lg">
          Logout
        </button>
      </nav>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold">
            {orders.length}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Pending Orders</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {
              orders.filter(
                (o) => o.status === "Pending"
              ).length
            }
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          <h2 className="text-gray-500">Delivered Orders</h2>
          <p className="text-3xl font-bold text-green-500">
            {
              orders.filter(
                (o) => o.status === "Delivered"
              ).length
            }
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">

          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Assign Driver</th>
              <th className="p-4 text-left">Update Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-4">{order.id}</td>

                <td className="p-4">
                  {order.customer}
                </td>

                <td className="p-4">
                  {order.driver}
                </td>

                <td className="p-4">
                  {order.amount}
                </td>

                <td className="p-4">
                  <span
                    className={`text-white px-3 py-1 rounded-full text-sm ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Assign Driver */}
                <td className="p-4">
                  <select
                    className="border p-2 rounded-lg"
                    onChange={(e) =>
                      assignDriver(
                        order.id,
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Select Driver
                    </option>

                    {drivers.map((driver) => (
                      <option key={driver}>
                        {driver}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Update Status */}
                <td className="p-4">
                  <select
                    className="border p-2 rounded-lg"
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Change Status
                    </option>

                    <option>
                      Pending
                    </option>

                    <option>
                      Out for Delivery
                    </option>

                    <option>
                      Delivered
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;