import axios from "axios";
import React, { useEffect, useState } from "react";
import "./orderlist.css"

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/orders-list');
      const data =  response.data;
      console.log(data);
      setOrders(data);

    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="list-container"> 
      <h2>Admin Orders</h2>

      <div className="order-list-container">
      {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Item</th>
                <th>Address</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    <img src={`http://localhost:4000/${order.products[0].imageUrl}`} alt="" />
                  </td>
                  <td>
                    <p>{order.address.name}</p>
                    <p>{order.address.address1}</p>
                    <p>{order.address.city}</p>
                    <p>{order.address.state}</p>
                    <p>{order.address.zip}</p>
                  </td>
                  <td>{order.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
    </div>
 
  );
};

export default AdminOrders;
