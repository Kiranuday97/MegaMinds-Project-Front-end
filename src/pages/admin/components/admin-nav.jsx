import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../admin.css"

const AdminNavbar = () => {
  return (
    <Navbar variant="dark" expand="lg" className='admin-nav'>
      <Navbar.Brand href="/admin">Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Link to="/admin" style={{ textDecoration: 'none', color : "white" }}>
          Add Products
          </Link>
          <Link to="/admin/orders-admin" style={{ textDecoration: 'none' }}>
          View Orders
          </Link>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
