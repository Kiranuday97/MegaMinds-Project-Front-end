import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartItems();
  }, []);

  const userToken = useSelector((state) => state.auth.token);

  const fetchCartItems = async () => {
    try {
      const token = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/cart`, token);
      const items = response.data;
      setCartItems(items);
      calculateTotalAmount(items);
      console.log(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(productId);
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/cart/${productId}`, config);
      const updatedItems = cartItems.cart.products.filter((item) => item.productId._id !== productId);
      setCartItems({ ...cartItems, cart: { products: updatedItems } });
      calculateTotalAmount({ ...cartItems, cart: { products: updatedItems } });
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const incrementCount = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/cart-update-quantity/${productId}/increment`, null, config);

      await fetchCartItems();
    } catch (error) {
      console.error('Error incrementing item from cart:', error);
    }
  };

  const decrementCount = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/cart-update-quantity/${productId}/decrement`, null, config);

      fetchCartItems();
    } catch (error) {
      console.error('Error decrementing item from cart:', error);
    }
  };

  const Checkout = () => {
    // Perform any necessary actions before navigating to the checkout page
    Navigate('/checkout'); // Navigate to the checkout page
  };

  const calculateTotalAmount = (items) => {
    const amount = items.cart.products.reduce((total, item) => total + item.productId.price * item.count, 0);
    setTotalAmount(amount);
  };

  return (
    <>
      <h2>Cart</h2>

      <div className="cart-container">
        {cartItems && cartItems.cart && cartItems.cart.products && cartItems.cart.products.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems &&
                cartItems.cart &&
                cartItems.cart.products &&
                cartItems.cart.products.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={`${process.env.REACT_APP_SERVER_URL}/${item.productId.imageUrl}`} alt={item.productId.name} className="item-image" />
                    </td>
                    <td>{item.productId.name}</td>
                    <td>Rs. {item.productId.price}</td>
                    <td>qty: {item.count}</td>
                    <td>
                      <div className='cart-button-div'>
                      <button className="increment-button btn" onClick={() => incrementCount(item.productId._id)}>
                        +
                      </button>
                      <button className="decrement-button btn" onClick={() => decrementCount(item.productId._id)}>
                        -
                      </button>
                      <button className="remove-button btn" onClick={() => removeFromCart(item.productId._id)}>
                        Remove
                      </button>
                      </div>

                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {(totalAmount !== 0) && (
      <p>Total Amount: {totalAmount}</p>)}
     
      {(totalAmount !== 0) && (
         <li>
         <Link to="/checkout" >
         <button  className="place-order-button btn" >
        Checkout
      </button>
          
         </Link>
       </li>
      )}
    </>
  );
};

export default Cart;
