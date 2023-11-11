// authActions.js

import { LOGIN_SUCCESS, LOGOUT, SET_TOKEN, SET_NAME } from './actionTypes';

export const loginSuccess = (token, name, email) => {
  localStorage.setItem('token', token);
  localStorage.setItem('name', name);

  return {
    type: LOGIN_SUCCESS,
    payload: { token, name, email },
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');

  return {
    type: LOGOUT,
  };
};

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

export const setName = (name) => ({
  type: SET_NAME,
  payload: name,
});


