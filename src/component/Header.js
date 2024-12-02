import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import logo from './commerce-bank-logo.png'; 
import './Header.css'; 

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="custom-navbar"> 
        <Container>
        <img src={logo} alt="Logo" className="logo" />
          <Link to="/Login" className="navbar-brand">
            <Button variant="outline-light" className="logout-button">Logout</Button> 
          </Link>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;
