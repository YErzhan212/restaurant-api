import React, { useEffect, useState } from 'react';
import * as orderActions from '../../actions/orderActions';
import * as authActions from '../../actions/authActions';
import * as restaurantActions from '../../actions/restaurantActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Modal, Form } from 'antd';
import './order.css';
import Navbar from '../../components/navbar'

function Order(props) {

   const [modal, setModal] = useState(false)
   const [form, setForm] = useState({
      userId: props.user,
      restaurantId: ` `,
      orderdate: ` `,
      guest: ' ',
   })

   console.log(form.name)

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

   const onChange = e => {
      const {value, name} = e.target
      setForm(prev => ({
         ...prev,
         [name]: value
      }))
   }

   const orders = props.order.map((item, i) => {
      return (
         <div key={i} className="order__content">
            <span>
               Ваш ID: {form.userId}
            </span>
            <span>
               Дата и время прихода: {item.orderdate}
            </span>
            <span>
               Количество Гостей: {item.guest}
            </span>
            <span>
               Ресторан: {item.restaurantId}
            </span>
         </div>
      )
   })

   return (
      <div className="order__wrapper">
         <Navbar/>
         <Modal
            title="Забронировать"
            visible={modal}
            onOk={handleOk}
            onCancel={handleCancel}
         >
            <Form
               labelCol={{ span: 8 }}
               wrapperCol={{ span: 14 }}
               layout="horizontal"
               // initialValues={{ size: componentSize }}
               // onValuesChange={onFormLayoutChange}
               // size={componentSize}
            >
               <Form.Item
                  label="ID Ресторана"
                  rules={[
                     {
                        required: true,
                        message: 'Пожалуйста введите дату прихода!',
                     },
                  ]}
               >
                  <Input name="restaurantId" onChange={onChange} />
                  </Form.Item>
               <Form.Item
                  label="Укажите дату"
                  rules={[
                     {
                        required: true,
                        message: 'Пожалуйста введите дату прихода!',
                     },
                  ]}
               >
                  <Input name="orderdate" onChange={onChange} />
                </Form.Item>
                <Form.Item
                  label="Количество Гостей"
                  rules={[
                     {
                        required: true,
                        message: 'Пожалуйста введите количетсво гостей!',
                     },
                  ]}
               >
                  <Input name="guest" onChange={onChange} />
                </Form.Item>
            </Form>    
         </Modal>
         <h2>Рестораны которые Вы забронировали:</h2>
            <div className="order__info">
               {orders}
            </div>
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
   restaurantActions: bindActionCreators(restaurantActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps) (Order);
