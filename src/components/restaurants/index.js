import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import Footer from '../footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './restaurants.css';
import * as restaurantActions from "../../actions/restaurantActions";
import * as orderActions from '../../actions/orderActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Pagination, Input, Modal } from 'antd';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Restaurants(props) {

   const [searchReq, setSearchReq] = useState("")
   const [search, setSearch] = useState({
      query: ``,
      page: 1
   })
   const [modalOrder, setOrder] = useState(false)
   const [formOrder, setFormOrder] = useState({
      orderdate: ``,
      guest: ``,
   })

   useEffect(() => {
      async function fetchData() {
         await props.restaurantActions.getRestaurant()
      }
      fetchData()
   }, [props.restaurantActions, search])

   const onChangePage = e => {
      setSearch(prev => ({
          ...prev,
          page: e
      }))
      props.restaurantActions.getRestaurant({ query: search.query, page: e })
   }

   // const showModal = () => {
   //    setOrder(true)
   // };
  
   // const handleOk = e => {
   //    console.log(e);
   //    setOrder(false);
   //    props.orderActions.addOrder(formOrder);
   // };
  
   // const handleCancel = e => {
   //    console.log(e);
   //    setOrder(false)
   // };

   // const onChangeHandler = e => {
   //    setFormOrder({ text: e.target.value })
   // }

   const searchHandler = (e) => {
      setSearchReq(e.target.value)
      props.restaurantActions.getRestaurant({query: e.target.value, page: search.page})
   }

   const data = props.restaurant?.restaurants?.map((item, i) => {
      return (
         <div key={i} className="container__restaurants">
            <div className="image__restaurants">
               <img alt="image-restaurant" src={`http://localhost:5000/${item.image}`}/>
            </div>
            <div className="information">
               <Link to={`/restaurants/${item.id}`}>{item.name}</Link>
               <p>{`Adress: ${item.location}`}</p>
               <p>{`Amount of Place: ${item.amountOfPlace}`}</p>
               <p>{`Phone: ${item.phone}`}</p>
                  <div className="btns">
                     <button >Order</button>
                     <button>Favorite</button>
                  </div>
            </div>
         </div>
      )
   })

   return (
      <div className="restaurants-wrapper">
         <Navbar />
            {/* <Modal
               title="Забронировать"
               visible={modalOrder}
               onOk={handleOk}
               onCancel={handleCancel}
            >  
               <label>Введите дату:</label>
               <Input onChange={onChangeHandler}/>
               <label>Количество Гостей:</label>
               <Input onChange={onChangeHandler}/>
            </Modal> */}
            <div className="content">
               <Container>
                  <Input
                     style={{ marginTop: `20px` }}
                     placeholder={`Search for Restaurants...`}
                     onChange={searchHandler}
                     size="large"
                  />
                     {data}
                  <Pagination
                     className="pagination"
                     onChange={onChangePage}
                     current={search.page}
                     pageSize={3} 
                     total={Number(props.restaurant.total)}
                  />
               </Container>
            </div>
         <Footer/>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.restaurant.error,
   restaurant: state.restaurant.restaurants,
   order: state.order.orders
})

const mapDispatchToProps = dispatch => ({
   restaurantActions: bindActionCreators(restaurantActions, dispatch),
   orderActions: bindActionCreators(orderActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (Restaurants);
