import React, { useEffect, useState } from "react";
import "./checkout.css";
// import "./checkout.module.css"
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  removeCartItem,
  checkout,
} from "../../redux/actions/cartActions";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { loadScript } from "react-razorpay";



const CheckOutPage = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate()

  console.log(address);
  console.log(paymentMethod);
  const cartItems = useSelector((state) => state.auth.cartItems);
  const dispatch = useDispatch();

  console.log(cartItems);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Get the submitted address from the form
    const submittedAddress = {
      name: event.target.name.value,
      address1: event.target.address1.value,
      city: event.target.city.value,
      state: event.target.state.value,
      zip: event.target.zip.value,
    };
    // Set the address in the state
    setAddress(submittedAddress);
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeCartItem(productId));
  };



  const calculateTotalAmount = (cartItems) => {
    if (cartItems.cart && cartItems.cart.products) {
      const amount = cartItems.cart.products.reduce(
        (total, item) => total + item.productId.price * item.count,
        0
      );
      setTotalAmount(amount);
    }
  };

  useEffect(() => {
    calculateTotalAmount(cartItems);
  }, [cartItems]);


 






  


  const handlePayment = async (totalAmount) => {
    try {
      const { data: { key } } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/payment/getkey`);
      const { data: { order } } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/payment/paynow`, { totalAmount });
  
      console.log(order);
  
      const options = {
        key: key,
        amount: order.totalAmount,
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: `${process.env.REACT_APP_SERVER_URL}/api/payment/payment-verification`,
        prefill: {
          name: "Gaurav Kumar",
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#3399cc"
        },
        handler: function (response) {
          alert("Payment Successful!");
          const data = {
            address,
            products: cartItems.cart.products,
            paymentMethod,
            totalAmount
          };
          try {
      
            const token = localStorage.getItem('token');
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
      
      
            axios.post(`${process.env.REACT_APP_SERVER_URL}/api/place-order-cod`, data, config)
              .then(async (response) => {
      
                await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/delete-cart`, config)
                  .then(() => {
                    console.log("cart cleared");
                  })
                alert("Order placed")
                toast.success("Order  placed")
                console.log('Success-->Checkout response:', response.data);

                
      
             
      
              })
              .catch(error => {
                console.error('Error during checkout:', error);
              });

              const paymentReference = response.razorpay_payment_id;
              window.location.href = `http://localhost:3000/paymentsuccess?reference=${paymentReference}`;
    
          } catch (error) {
            console.log("placing order failed" + error);
          }
          console.log(response);
        }
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
     
      
  
    } catch (error) {
      console.log("Error in payment gateway: " + error);
    }
  };
  

  const handlePlaceOrder = async () => {
    
    const data = {
      address,
      products: cartItems.cart.products,
      paymentMethod,
      totalAmount
    };
    try {

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };


      axios.post(`${process.env.REACT_APP_SERVER_URL}/api/place-order-cod`, data, config)
        .then(async (response) => {

          await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/delete-cart`, config)
            .then(() => {
              console.log("cart cleared");
            })
          alert("Order placed")
          toast.success("Order  placed")
          console.log('Success-->Checkout response:', response.data);
          navigate("/")




        })
        .catch(error => {
          console.error('Error during checkout:', error);
        });
    } catch (error) {
      console.log("placing order failed" + error);
    }
  };





const renderAddressForm = () => {
  if (!address) {
    return (
      <>
        {/* <h2>Shipping Address</h2> */}
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" />
          </Form.Group>
          <Form.Group controlId="address1">
            <Form.Label>Address Line 1:</Form.Label>
            <Form.Control type="text" name="address1" />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City:</Form.Label>
            <Form.Control type="text" name="city" />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State:</Form.Label>
            <Form.Control type="text" name="state" />
          </Form.Group>
          <Form.Group controlId="zip">
            <Form.Label>Zip Code:</Form.Label>
            <Form.Control type="text" name="zip" />
          </Form.Group>
          <Button className="btn" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
};

const changeAdress = () => {
  setAddress("")
}

return (
  <div className="check-outcontainer">
    <Row>
      <Col md={6}>
        <h2>Shipping Address</h2>

        {renderAddressForm()}

        {address && (
          <div>
            <p>Name: {address.name}</p>
            <p>Address: {address.address1}</p>
            <p>City: {address.city}</p>
            <p>State: {address.state}</p>
            <p>Zip Code: {address.zip}</p>
            <button className="btn" onClick={changeAdress}>Change adress</button>
          </div>
        )}
      </Col>
      <Col md={6}>
        <h2>Product List</h2>
        <ul>
          {cartItems &&
            cartItems.cart &&
            cartItems.cart.products &&
            cartItems.cart.products.map((item, index) => (
              <li key={index}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={3}>
                        <Card.Img
                          src={`${process.env.REACT_APP_SERVER_URL}/${item.productId.imageUrl}`}
                          className="item-image"
                          alt="Product"
                        />
                      </Col>
                      <Col md={6}>
                        <Card.Title>{item.productId.name}</Card.Title>
                        <Card.Text>{"₹ " + item.productId.price}</Card.Text>
                        <Card.Text className="quantity-line">
                          {"quantity: " + item.count}
                        </Card.Text>
                      </Col>
                      <Col md={3}>
                        <Card.Text>
                          Amount: ₹ {item.count * item.productId.price}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </li>
            ))}
        </ul>
        <h2>Total Amount: ₹ {totalAmount}</h2>
        
        <div>
          
          <Form.Group>
            <div className="radio">
              <Form.Check
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Cash On Delivery"
              />
            </div>
            <div className="radio">
              <Form.Check
                type="radio"
                id="paynow"
                name="paymentMethod"
                value="paynow"
                checked={paymentMethod === "Paid"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Pay Now"
              />
            </div>
          </Form.Group>
        </div>
        {address && (
        <div>
        {paymentMethod === "cod" ? (
          <Button className="btn" id="makeOrder" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        ) : (
          <Button className="btn" id="paymentButton" onClick={() => handlePayment(totalAmount)}>
            Proceed to Pay
          </Button>
        )} 
        </div> 
        )}
      </Col>
    </Row>
    
    <ToastContainer />
  </div>
);
};

export default CheckOutPage;
