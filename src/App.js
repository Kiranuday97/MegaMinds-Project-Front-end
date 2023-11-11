import "./App.css";
import { BrowserRouter, Routes , Route} from "react-router-dom";



import Navbar from "./components/Navbar";
import AdminNavbar from "./pages/Seller/components/admin-nav";
import Home from "./pages/home/Home";
import About from "./pages/about/AboutPage";
import Contact from "./pages/contact/Contact";
import notFound from "./pages/notFound/notFound";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminPage from "./pages/Seller/Sell";
import Cart from "./pages/cart/Cart"
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setName } from './redux/actions/authActions';
import CheckOutPage from "./pages/checkOut/Checkout";
import OrdersAdmin from "./pages/Seller/components/ordersAdmin"
import Orders from "./components/orders"
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";




function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedName = localStorage.getItem('name');
    if (storedToken && storedName) {
      dispatch(setToken(storedToken));
      dispatch(setName(storedName));
    }
  }, [])

  const isOnAdminPage = window.location.pathname.startsWith('/admin');
  return (
    <BrowserRouter>
     {isOnAdminPage ? <AdminNavbar/> : <Navbar/>}
     
    <Routes>
    <Route path="/admin" element={<AdminPage/>}/>

      <Route index element={<Home/>} />
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/*" element={<notFound/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<CheckOutPage/>}  />
      <Route path="/admin/orders-admin" element={<OrdersAdmin/>}/>
      <Route path="/user-orders" element={<Orders/>} />
      <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
    </Routes>
    

    <Footer/>

    </BrowserRouter>
    
   
  );
}

export default App;
