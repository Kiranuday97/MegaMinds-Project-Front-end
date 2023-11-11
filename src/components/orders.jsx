import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, ListGroup, Image } from "react-bootstrap";
import "../pages/home/Home.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const userToken = useSelector((state) => state.auth.token);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/fetchorders`,
        config
      );

      const data = response.data;
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders" + error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container className="order-container">
      <h2>Your orders</h2>
     
        {orders.map((order, index) => (
          <ListGroup.Item key={index}>
            {order.products.map((item, itemIndex) => (
              <div key={itemIndex} className="check-list">
                <Image
                  src={`${process.env.REACT_APP_SERVER_URL}/${item.imageUrl}`}
                  className="item-image"
                  alt="Product"
                />
                <div>
                  <h4>{item.name}</h4>
                  <p>{"₹ " + item.price}</p>
                  <p className="quantity-line">{"quantity: " + item.quantity}</p>
                </div>
                <div className="amount-div">
                  <h4>Amount: ₹ {item.quantity * item.price}</h4>
                </div>
              </div>
              
            ))}
          </ListGroup.Item>
          
        ))}
      
    </Container>
  );
};

export default Orders;
