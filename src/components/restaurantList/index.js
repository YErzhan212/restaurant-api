import React, {useState, useEffect} from 'react';
import * as restaurantActions from "../../actions/restaurantActions";
import * as reviewActions from '../../actions/reviewActions';
import * as orderActions from '../../actions/orderActions';
import * as authActions from '../../actions/authActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import './styleRestaurant.css'
import { Container, Button } from 'react-bootstrap';
import Navbar from '../navbar';
import Footer from '../footer';
import {  Input, Modal } from 'antd';

function RestaurantList(props) {

   const [restaurantList] = useState({
      image: props.restaurant
   })

   console.log(restaurantList)
   const [addReviews, setAddReviews] = useState({
      text: ' ',
   })

   useEffect(() => {
      async function fetchReview() {
         await props.reviewActions.getReview()
      }
      fetchReview()
   }, [props.reviewActions])

   const onChangeHandler = e => {
      setAddReviews({ text: e.target.value })
   }

   const addReview = e => {
      console.log(e)
      props.reviewActions.addReview(addReviews)
   }
   
   // const restaurant = props.restaurant?.restaurants?.map((restaurantList, i) => {
   //    return(
   //       <div key={i}>
   //          <div>
   //             <img alt="image-restaurant" src={`http://localhost:5000/${restaurantList?.image}`}/>
   //          </div>
   //          <div>
   //             <p>{`Adress: ${restaurantList?.location}`}</p>
   //             <p>{`Avarage Check: ${restaurantList?.averageBill}`}</p>
   //             <p>{`Amount of Place: ${restaurantList?.amountOfPlace}`}</p>
   //             <p>{`Kitchens: ${restaurantList?.kitchens}`}</p>
   //             <p>{`Rate: ${restaurantList?.rate}`}</p>
   //          </div>
   //       </div>
   //    )
   // })

   const review = props.reviews.map((item, i) => {
      return (
         <div key={i} className="reviews">
            <h4>{item.userId}</h4>
            <p>{item.text}</p>
            <p>{item.restaurantId}</p>
         </div>
      )
   })

   return (
      <div style={{ backgroundColor: `#d1d1d1d1`, backgroundPosition: `fixed`}}>
         <Navbar/>
         <div className="global__wrapper">
            <div>
               <div>
                  <img alt="image-restaurant" src={`http://localhost:5000/${restaurantList?.image}`}/>
               </div>
               <div>
                  <p>{`Adress: ${restaurantList?.location}`}</p>
                  <p>{`Avarage Check: ${restaurantList?.averageBill}`}</p>
                  <p>{`Amount of Place: ${restaurantList?.amountOfPlace}`}</p>
                  <p>{`Kitchens: ${restaurantList?.kitchens}`}</p>
                  <p>{`Rate: ${restaurantList?.rate}`}</p>
               </div>
            </div>
            <div className="review__wrapper">
               <Container>
                  <div className="review__blog">
                     <h3>отзывы наших клиентов</h3>
                     {review}
                     <div className="add__review">
                        <h5 style={{ color: `#fff` }}>Сообщение:</h5>
                        <textarea
                           name="comment"
                           placeholder="Введите сообщение..."
                           onChange={onChangeHandler}
                           className="text__area"
                           cols="80"
                           rows="6"
                           maxLength="60"
                        />
                        <Button
                           onClick={addReview}
                           style={{ marginBottom: `50px` }}
                        >
                              Добавить Отзыв
                        </Button>   
                     </div>
                  </div>
               </Container>
            </div>
         </div>
         <Footer/>
      </div>   
   )
}

const mapStateToProps = state => ({
   error: state.restaurant.error,
   restaurant: state.restaurant.restaurants.image,
   reviews: state.review.reviews,
   user: state.auth.user.name
})

const mapDispatchToProps = dispatch => ({
   restaurantActions: bindActionCreators(restaurantActions, dispatch),
   reviewActions: bindActionCreators(reviewActions, dispatch),
   authActions: bindActionCreators(authActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (RestaurantList);
