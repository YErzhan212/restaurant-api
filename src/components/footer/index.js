import React from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function Footer() {
   return (
      <div className="footer">
            <Container>
               <div className="footer-blog">
                  <NavLink to={`/`} className="footer-nav">
                     RESTAURANT
                  </NavLink>
                  <div className="social-icon">
                     <a href="#" className="link-social-media"><FaInstagram /></a>
                     <a href="#" className="link-social-media"><FaFacebook /></a>
                     <a href="#" className="link-social-media"><FaTwitter /></a>
                     <a href="https://github.com/YErzhan212" className="link-social-media"><FaGithub /></a>
                  </div>
               </div>
            </Container>
         </div>
   )
}

export default Footer