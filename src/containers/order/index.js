import React, { useEffect, useState } from 'react';
import * as orderActions from '../../actions/orderActions';
import * as authActions from '../../actions/authActions';
import * as restaurantActions from '../../actions/restaurantActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Card, Col, Input, Modal } from 'antd';

function Order(props) {

   const { Meta } = Card;

   const [modal, setModal] = useState(false)
   const [form, setForm] = useState({
      userId: ` `,
      restaurantId: ` `,
      orderdate: ` `,
      guest: ' ',
   })

   useEffect(() => {
      async function fetchData() {
         await props.orderActions.getOrder()
      }
      fetchData()
   }, [props.orderActions, form])

   const showModal = () => {
      setModal(true)
   };
  
   const handleOk = (e) => {
      console.log(e)
      setModal(false);
      props.orderActions.addOrder(form)
   };
  
   const handleCancel = e => {
      console.log(e);
      setModal(false)
   };

   const onChangeHandlerOrderDate = (value) => {
      setForm (prev => ({
         ...prev,
         orderdate: value
      }))
   }

   const onChangeHandlerGuest = (value) => {
      setForm (prev => ({
         ...prev,
         guest: value
      }))
   }

   const onChangeHandlerUserId = (value) => {
      setForm (prev => ({
         ...prev,
         userId: value
      }))
   }

   const onChangeHandlerRestaurantId = (value) => {
      setForm (prev => ({
         ...prev,
         restaurantId: value
      }))
   }

   const orders = props.order?.orders?.map((item, i) => {
      return (
         <Col span={6}>
            <Meta id={item.id}/>
            <Meta title={item.userId}/>
         </Col>
      )
   })

   return (
      <div>
         <Modal
            title="Забронировать"
            visible={modal}
            onOk={handleOk}
            onCancel={handleCancel}
         >
         <label>guest</label>
         <Input name="text" onChange={onChangeHandlerGuest}/>
         <label>orderdate</label>
         <Input name="text" onChange={onChangeHandlerOrderDate}/>
         <label>userId</label>
         <Input name="text" onChange={onChangeHandlerUserId}/>
         <label>restaurantId</label>
         <Input name="text" onChange={onChangeHandlerRestaurantId}/>
         </Modal>
            {orders}
         <button onClick={showModal}>add</button>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.restaurant.error,
   error: state.order.error,
   restaurant: state.restaurant.restaurants,
   order: state.order.orders,
   user: state.auth.user.id
})

const mapDispatchToProps = dispatch => ({
   orderActions: bindActionCreators(orderActions, dispatch),
   authActions: bindActionCreators(authActions, dispatch),
   authActions: bindActionCreators(restaurantActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps) (Order);
