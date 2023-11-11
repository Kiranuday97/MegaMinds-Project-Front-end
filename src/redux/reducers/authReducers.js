// Redux/reducers/authReducers.js
import { LOGIN_SUCCESS, LOGOUT, SET_TOKEN, SET_NAME, FETCH_CART_ITEMS_SUCCESS, REMOVE_CART_ITEM_SUCCESS, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token') || null,
  name: localStorage.getItem('name') || null,
  email: null,
  cartItems: [],
  checkoutSuccess: false,
  checkoutError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { token, name, email } = action.payload;
      return {
        ...state,
        token,
        name,
        email,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        name: null,
        email: null,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case FETCH_CART_ITEMS_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case REMOVE_CART_ITEM_SUCCESS:
      const updatedCartItems = state.cartItems.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        checkoutSuccess: true,
        checkoutError: null,
      };
    case CHECKOUT_FAILURE:
      return {
        ...state,
        checkoutSuccess: false,
        checkoutError: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
