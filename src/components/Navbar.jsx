import React, { useState } from 'react';
import './navbar.css';
import { Link, NavLink } from 'react-router-dom';
import Logo from "../images/logo.png";
import { links } from '../data';
import { GoThreeBars } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri"
import { TbUserCircle } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [isAccountDropdownShowing, setIsAccountDropdownShowing] = useState(false);

  const toggleNav = () => {
    setIsNavShowing(prev => !prev);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownShowing(prev => !prev);
  };

  const { token, name, email } = useSelector(state => state.auth);
  
  const isLoggedIn = !!token;
  console.log(token);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    setIsAccountDropdownShowing(false);
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className='logo' onClick={() => setIsNavShowing(false)}>
          <img src={Logo} alt="nav-logo" />
        </Link>
        <ul className={`nav__links ${isNavShowing ? 'show__Nav' : 'hide__Nav'}`}>
          {links.map(({ name, path }, index) => (
            <li key={index}>
              <NavLink
                to={path}
                className={({ isActive }) => isActive ? 'active-nav' : ''}
                onClick={() => setIsNavShowing(false)}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
        

        <div className="account__dropdown">

        {isLoggedIn ? (
                          
                          <NavLink to="/admin" >
                            <button  className="account__toggle-btn">SELL
                            </button> 
                  </NavLink>

              ) : (
                <NavLink to="/login" onClick={toggleAccountDropdown}>
                     
                    </NavLink>
              )
        }
        
       
          <button className="account__toggle-btn" onClick={toggleAccountDropdown}>
            <TbUserCircle className='account__logo' />
            {isLoggedIn ? (name || email) : 'Account'}
          </button>
          {isAccountDropdownShowing && (
            <ul className="account__dropdown-menu">
              {isLoggedIn ? (
                <li>
                  <NavLink to="/" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/login" onClick={toggleAccountDropdown}>
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" onClick={toggleAccountDropdown}>
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
        {isLoggedIn && (
         <li>
         <NavLink to="/cart" >
         <RiShoppingCartFill/>
           Cart
         </NavLink>
       </li>
       
      )}
      {isLoggedIn && (
         <li>
         <NavLink to="/user-orders" >
            Buy Orders
         </NavLink>
         
       </li>
       
       
      )}
      {isLoggedIn && (
         <li>
         <NavLink to="/admin/orders-admin" >
            Sell Orders
         </NavLink>
         
       </li>
       
       
      )}
     
        
       
        <button className="nav__toggle-btn" onClick={toggleNav}>
          {isNavShowing ? <MdOutlineClose /> : <GoThreeBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
