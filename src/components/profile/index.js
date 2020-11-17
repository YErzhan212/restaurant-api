import React from 'react';
import Navbar from '../navbar/index';
import './profile.css';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../footer/index'


function Profile() {

   return (
      <div className="profile-wrapper">
         <Navbar />
         <Container>
            <Row>
               <Col sm={8} className="col__main">
                  <div className="inner__profile">
                     <h4>Вы вошли в личный кабинет</h4>
                  </div>
                  <div className="user__info">
                     Имя: Пользавателя
                  </div>
                  <div className="user__image">
                     dsa
                  </div>
               </Col>
               <Col sm={4} className="col__settings">sm=4</Col>
            </Row>
         </Container>
         <Footer />   
      </div>
   )
}

export default Profile
