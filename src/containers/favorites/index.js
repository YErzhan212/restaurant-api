import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as favoriteActions from '../../actions/favoriteActions';
import * as restaurantActions from '../../actions/restaurantActions';
import * as authActions from '../../actions/authActions';
import { Input, Modal, Form } from 'antd';
import './favorites.css';
import Navbar from '../../components/navbar'

function Favorites(props) {

   const [formData, setFormData] = useState({
      restaurantId: ` `
   })
   const [modal, setModal] = useState(false)

   useEffect(() => {
      async function fetchData() {
         await props.favoriteActions.getFavorites()
      }
      fetchData()
   }, [props.favoriteActions])

   const showModal = () => {
      setModal(true)
   };
  
   const handleOk = (e) => {
      console.log(e)
      setModal(false);
      props.favoriteActions.addFavorites(formData)
   };
  
   const handleCancel = e => {
      console.log(e);
      setModal(false)
   };

   const onChange = e => {
      const {value, name} = e.target
      setFormData(prev => ({
         ...prev,
         [name]: value
      })) 
   }

   const favoriteItem = props.favorite.map((item, i) => {
      return (
         <div key={i} className="favorites">
            <p>{item.id}</p>
            <p>{props.id}</p>
            <p>{item.restaurantId}</p>
         </div>
      )
   })

   return (
      <div className="favorites__wrapper">
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
            >
               <Form.Item
                  label="ID Ресторана"
                  rules={[
                     {
                        required: true,
                        message: 'Пожалуйста введите ID ресторана!',
                     },
                  ]}
               >
                  <Input name="restaurantId" onChange={onChange}/>
               </Form.Item>
            </Form>    
         </Modal>
         <div className="favorites__blog container">
            {favoriteItem}
         </div>   
         <button onClick={showModal}>add</button>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.favorite.error,
   favorite: state.favorite.favorites,
   restaurant: state.restaurant.restaurants,
   id: state.auth.user.id
})

const mapDispatchToProps = dispatch => ({
   favoriteActions: bindActionCreators(favoriteActions, dispatch),
   restaurantActions: bindActionCreators(restaurantActions, dispatch),
   authtActions: bindActionCreators(authActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (Favorites)
