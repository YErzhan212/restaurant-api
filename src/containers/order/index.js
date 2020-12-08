import React, { useEffect, useState } from 'react';
import * as orderActions from '../../actions/orderActions';
import * as authActions from '../../actions/authActions';
import * as restaurantActions from '../../actions/restaurantActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Modal } from 'antd';

function Order(props) {

   const [modal, setModal] = useState(false)
   const [form, setForm] = useState({
      userId: props.user,
      restaurant: props.restaurant,
      orderdate: ` `,
      guest: ' ',
   })

   useEffect(() => {
      async function fetchData() {
         await props.orderActions.getOrder()
      }
      fetchData()
   }, [props.orderActions])

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

   const onChangeHandlerOrderDate = e => {
      setForm({ orderdate: e.target.value })
   }

   const onChangeHandlerGuest = e => {
      setForm({ guest: e.target.value }) 
   }


   const orders = props.order.map((item, i) => {
      return (
         <div key={i} style={{ marginLeft: `20px` }}>
            <p>{form.userId}</p>
            <p>{item.orderdate}</p>
            <p>{item.guest}</p>
            <div style={{ height: `500px`, width: `600px` }}>{form.restaurant}</div>
         </div>
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
         <label>orderdate</label>
         <Input name="orderdate" onChange={onChangeHandlerOrderDate}/>
         <label>guest</label>
         <Input name="guest" onChange={onChangeHandlerGuest}/>
         </Modal>
            {orders}
         <button onClick={showModal}>add</button>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.restaurant.error,
   error: state.order.error,
   restaurant: state.restaurant.restaurants.id,
   order: state.order.orders,
   user: state.auth.user.id
})

const mapDispatchToProps = dispatch => ({
   orderActions: bindActionCreators(orderActions, dispatch),
   authActions: bindActionCreators(authActions, dispatch),
   restaurantActions: bindActionCreators(restaurantActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps) (Order);
