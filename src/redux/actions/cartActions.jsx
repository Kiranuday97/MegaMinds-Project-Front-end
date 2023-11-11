// Redux/actions/cartActions.js
import axios from 'axios';
import { FETCH_CART_ITEMS_SUCCESS, REMOVE_CART_ITEM_SUCCESS, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from './actionTypes';

// Action to fetch cart items
export const fetchCartItems = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Fetch cart items from the server
      const response = await axios.get('http://localhost:4000/api/cart', config);
      const items = response.data;

      // Dispatch the success action with the fetched cart items
      dispatch({
        type: FETCH_CART_ITEMS_SUCCESS,
        payload: items,
      });
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
};


// Action to remove a cart item
export const removeCartItem = (productId) => {
  return async (dispatch) => {
    try {
      // Send request to remove the cart item
      await axios.delete(`http://localhost:4000/api/cart/${productId}`);

      // Dispatch the success action with the removed product ID
      dispatch({
        type: REMOVE_CART_ITEM_SUCCESS,
        payload: productId,
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
};

// Action to perform the checkout
export const checkout = (cartItems) => {
  return async (dispatch) => {
    try {
      // Send request to the payment gateway or perform any other necessary steps
      // You can include the cart items and any other relevant data in the request

      // Dispatch the success action upon successful checkout
      dispatch({
        type: CHECKOUT_SUCCESS,
      });
    } catch (error) {
      // Dispatch the failure action if there was an error during checkout
      dispatch({
        type: CHECKOUT_FAILURE,
        payload: error.message,
      });
    }
  };
};
