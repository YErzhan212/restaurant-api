import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import Navbar from '../navbar/index';
import Footer from '../footer/index'
import { Container, Row, Col } from 'react-bootstrap';
import './profile.css';

function Profile(props) {

   const [userData] = useState({
      name: props.name
   })

   const logout = () => {
      props.authActions.logOut(props.history)
   }

   console.log(userData)

   return (
      <div style={{ backgroundColor: `#0f0f0fd1`, height: `900px`}}>
         <div className="profile-wrapper">
            <Navbar />
            <Container>
               <Row className="row">
                  <Col sm={5} className="col__main">
                     <div className="inner__profile">
                        <h4>Вы вошли в личный кабинет</h4>
                     </div>
                     <div className="user__info">
                        <span>здравствуйте,</span>
                        <h2>{userData.name}!</h2>
                        <p style={{ marginTop: `30px` }}>Здесь вы можете управлять настройками своего аккаунта.</p>
                        <p>Бронировать столики</p> 
                        <p><td>Следить за новинками</td>Ваших любимых ресторанов,<td>в разделе Избранные</td></p>
                     </div>
                  </Col>
                  <Col sm={2} className="col__settings">
                     <div className="settings">
                        <a href="/order" >забронировать</a>
                        <a href="/favorites" >избранные</a>
                        <a href="/dashboard" >панель управления</a>
                        <a href="#" >настройки</a>
                        <span onClick={() => logout()}>выйтий из системы</span>
                     </div>
                  </Col>
               </Row>
            </Container>
            <Footer />   
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.auth.error,
   name: state.auth.user.name,
})

const mapDispatchToProps = dispatch => ({
   authActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (Profile)
