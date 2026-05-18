function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}

export default AdminDashboard;
import React, { useState } from 'react';
import { Search, Plus, Truck, Clock, CheckCircle } from 'lucide-react';

export default function DeliveryAdminDashboard() {
  // Local state - sirf memory mein data rahega
  const [orders, setOrders] = useState([
    { 
      id: 'ORD-001', 
      customer: 'Priya Sharma', 
      address: '42 Marine Drive, Mumbai', 
      status: 'pending', 
      driver: null 
    },
    { 
      id: 'ORD-002', 
      customer: 'Rajesh Kumar', 
      address: '15 Bandra West, Mumbai', 
      status: 'assigned', 
      driver: 'Vikram Singh' 
    },
    { 
      id: 'ORD-003', 
      customer: 'Anaya Patel', 
      address: '89 Park Street, Kolkata', 
      status: 'in-transit', 
      driver: 'Arjun Das' 
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Status update function
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
  };

  // Driver assign function
  const assignDriver = (orderId, driverName) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, driver: driverName, status: 'assigned' }
        : order
    ));
  };

  // Search filter
  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Delivery Dashboard</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search orders..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '1.5rem',
          border: '1px solid #ddd',
          borderRadius: '6px'
        }}
      />

      {/* Orders Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Address</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Driver</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{order.id}</td>
                <td style={{ padding: '12px' }}>{order.customer}</td>
                <td style={{ padding: '12px', fontSize: '13px', color: '#666' }}>{order.address}</td>
                <td style={{ padding: '12px' }}>
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    style={{
                      padding: '6px',
                      borderRadius: '4px',
                      border: '1px solid #ddd',
                      backgroundColor: 
                        order.status === 'pending' ? '#fef3c7' :
                        order.status === 'assigned' ? '#dbeafe' :
                        order.status === 'in-transit' ? '#e9d5ff' :
                        '#d1fae5'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td style={{ padding: '12px' }}>
                  {order.driver || 'Not assigned'}
                </td>
                <td style={{ padding: '12px' }}>
                  {!order.driver ? (
                    <button
                      onClick={() => assignDriver(order.id, 'Vikram Singh')}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#0ea5e9',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Assign
                    </button>
                  ) : (
                    <button
                      onClick={() => assignDriver(order.id, null)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}