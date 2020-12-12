import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import Footer from '../footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './restaurants.css';
import * as restaurantActions from "../../actions/restaurantActions";
import * as orderActions from '../../actions/orderActions';
import * as favoriteActions from '../../actions/favoriteActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input, Modal, Form, Pagination } from 'antd';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Restaurants(props) {

   const [searchReq, setSearchReq] = useState("")
   const [search, setSearch] = useState({
      query: ``,
      page: 1
   })
   const [modalOrder, setOrder] = useState(false)
   const [modalFavorites, setModalFavorites] = useState(false)
   const [formOrder, setFormOrder] = useState({
      restaurantId: ` `,
      orderdate: ` `,
      guest: ` `,
   })
   const [formFavorites, setFormFavorites] = useState({
      restaurantId: ` `
   })

   useEffect(() => {
      async function fetchData() {
         await props.restaurantActions.getRestaurant()
      }
      fetchData()
   }, [props.restaurantActions, search])

   // const onChangePage = e => {
   //    setSearch(prev => ({
   //        ...prev,
   //        page: e
   //    }))
   //    props.restaurantActions.getRestaurant({ query: search.query, page: e })
   // }

      // Функционал для ORDER
   const showModalOrder = () => {
      setOrder(true) 
   };
  
   const handleOkOrder = e => {
      console.log(e);
      setOrder(false);
      props.orderActions.addOrder(formOrder);
   };
  
   const handleCancelOrder = e => {
      console.log(e);
      setOrder(false)
   };

   const onChangeOrder = e => {
      const {value, name} = e.target
      setFormOrder(prev => ({
         ...prev,
         [name]: value
      }))
   }

      // функционал для FAVORITES
   const showModalFavorites = () => {
      setModalFavorites(true)
   };

   const handleOkFavorites = e => {
      console.log(e);
      setModalFavorites(false);
      props.favoriteActions.addFavorites(formFavorites)
   };

   const handleCancelFavorites = e => {
      console.log(e);
      setModalFavorites(false)
   };

   const onChangeFavorites = (e) => {
      setFormFavorites({ restaurantId: e.target.value })
   }

   // функционал для ПОИСКОВИКА
   const searchHandler = (e) => {
      setSearchReq(e.target.value)
      props.restaurantActions.getRestaurant({ query: e.target.value, page: search.page })
   }

   const data = props.restaurant?.restaurants?.map((item, i) => {
      return (
         <div key={i} className="container__restaurants">
            <div className="image__restaurants">
               <img alt="image-restaurant" src={`http://localhost:5000/${item.image}`}/>
            </div>
            <div className="information">
               <Link to={`/restaurants/${item.id}`}>{item.name}</Link>
               <p>{`Адрес: ${item.location}`}</p>
               <p>{`Свободные места: ${item.amountOfPlace}`}</p>
               <p>{`Тел. : ${item.phone}`}</p>
                  <div className="btns">
                     <span onClick={showModalOrder}>ЗАКАЗАТЬ</span>
                     <span onClick={showModalFavorites}>ИЗБРАННЫЕ</span>
                  </div>
            </div>
         </div>
      )
   })

   return (
      <div className="restaurants-wrapper">
         <Navbar />
                        {/* Модалка для Заказа */}
            <Modal
               title="Забронировать"
               visible={modalOrder}
               onOk={handleOkOrder}
               onCancel={handleCancelOrder}
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
                  <Input name="restaurantId" onChange={onChangeOrder} />
                  </Form.Item>
               <Form.Item
                  label="Укажите дату и время"
                  rules={[
                     {
                        required: true,
                        message: 'Пожалуйста введите дату прихода!',
                     },
                  ]}
               >
                  <Input name="orderdate" onChange={onChangeOrder} />
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
                  <Input name="guest" onChange={onChangeOrder} />
                </Form.Item>
            </Form>    
            </Modal>
                              {/* Модалка для FAVORITES */}
            <Modal
               title="Добавить в Избранные"
               visible={modalFavorites}
               onOk={handleOkFavorites}
               onCancel={handleCancelFavorites}
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
                     <Input name="restaurantId" onChange={onChangeFavorites} />
                  </Form.Item>
               </Form>    
            </Modal>
            <div className="content">
               <Container>
                  <Input
                     className="input__form"
                     placeholder={`Search for Restaurants...`}
                     onChange={searchHandler}
                     size="large"
                  />
                     {data}
                     {/* <Pagination onChange={onChangePage} current={search.page} pageSize={5} total={Number(props.restaurant.total)}/> */}
               </Container>
            </div>
         <Footer/>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.restaurant.error,
   restaurant: state.restaurant.restaurants,
   order: state.order.orders,
   favorite: state.favorite.favorites,
})

const mapDispatchToProps = dispatch => ({
   restaurantActions: bindActionCreators(restaurantActions, dispatch),
   orderActions: bindActionCreators(orderActions, dispatch),
   favoriteActions: bindActionCreators(favoriteActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (Restaurants);
