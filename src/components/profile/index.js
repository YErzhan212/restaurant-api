import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import Navbar from '../navbar/index';
import Footer from '../footer/index'
import { Container, Row, Col } from 'react-bootstrap';
import './profile.css';

function Profile(props) {

   const logout = () => {
      props.authActions.logOut(props.history)
   }

   const user = props.auth?.user?.map((item, i) => {
      return (
         <div key={i}>
            <h3>{item.name}</h3>
            <h3>{item.email}</h3>
         </div>
      )
   })

   return (
      <div style={{ backgroundColor: `#d1d1d1d1`, height: `900px`}}>
         <div className="profile-wrapper">
            <Navbar />
            <Container>
               <Row className="row">
                  <Col sm={5} className="col__main">
                     <div className="inner__profile">
                        <h4>Вы вошли в личный кабинет</h4>
                     </div>
                     <div className="user__info">
                        {user}
                     </div>
                     {/* <div className="user__image">
                        <div className="avatar"></div>
                        <Button type="dashed" style={{ marginLeft: `60px` }}>Загрузить фото</Button>
                     </div> */}
                  </Col>
                  <Col sm={2} className="col__settings">
                     <div className="settings">
                        <a href="/order" >брони</a>
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
   user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
   authActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (Profile)
