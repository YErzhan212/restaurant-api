import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './navbar.css';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form, FormControl } from 'react-bootstrap';

function Navbar() {

    return (
      <div className="nav-ponel-wrapper">
        <Container>
          <div className="nav-ponel">
            <NavLink className="nav-ponel-logo" to="/">
              RESTAURANT
            </NavLink>
            <div className="navbar">
              <Link to="#" className="link">Home</Link>
              <Link to="#" className="link">About Us</Link>
              <Link to="#" className="link">Contacts</Link> 
              <Link to="/profile" className="link">Profile</Link> 
            </div>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
          </div>
        </Container>
      </div>
    )
  }

export default Navbar
