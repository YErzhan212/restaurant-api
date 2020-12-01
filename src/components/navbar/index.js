import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { SET_CURRENT_USER, SIGN_IN, SIGN_UP, SIGN_UP_SUCCESS } from '../../actions/types';

// if(localStorage.length > 0) {
//   document.getElementById("#auth__user").style.display = "block"
// }

function Navbar() {

  return (
    <div className="nav-ponel-wrapper">
      <Container>
        <div className="nav-ponel">
          <NavLink className="nav-ponel-logo" to="/">
            RESTAURANT
          </NavLink>
          <div className="navbar">
            <Link to="/" className="link">Home</Link>
            <Link to="#" className="link">About Us</Link>
            <Link to="#" className="link">Contacts</Link> 
            <Link to="/profile" className="link" id="auth__user">Profile</Link> 
          </div>
        </div>
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
   error: state.auth.error,
   isLoading: state.auth.isLoading
})

const mapDispatchToProps = dispatch => ({
   authActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (Navbar)