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
      userId: props.user.id,
      restaurantId: ``,
      orderdate: ` `,
      guest: ` `
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

   const onChangeHandler = e => {
      setForm({ text: e.target.value })
   }


   const orders = props.order?.orders?.map((item, i) => {
      return (
         <div key={i}>
            <p>{item.userId}</p>
            <p>{item.restaurantId}</p>
            <p>{item.orderdate}</p>
            <p>{item.guest}</p>
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
            <label>Введите дату:</label>
            <Input name="text" onChange={onChangeHandler}/>
            <label>Количество Гостей:</label>
            <Input name="text" onChange={onChangeHandler}/>
         </Modal>
            {orders}
         <button onClick={showModal}>add</button>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.restaurant.error,
   error: state.order.error,
   order: state.order.orders,
   user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
   orderActions: bindActionCreators(orderActions, dispatch),
   authActions: bindActionCreators(authActions, dispatch),
   authActions: bindActionCreators(restaurantActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps) (Order);
