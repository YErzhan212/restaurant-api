import React, {useState, useEffect} from 'react';
import * as restaurantActions from "../../actions/restaurantActions";
import * as reviewActions from '../../actions/reviewActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import './styleRestaurant.css'
import { Container, Button } from 'react-bootstrap';
import Navbar from '../navbar';
import Footer from '../footer';

function RestaurantList(props) {

   const [restaurantList, setRestaurantList] = useState({})
   const [addReviews, setAddReviews] = useState({
      text: '',
   })

   // useEffect(() => {
   //    async function fetchData() {
   //       await props.restaurantActions.getRestaurant()
   //    }
   //    fetchData()
   // }, [props.restaurantActions])

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

   const deleteReview = item => {
      props.reviewActions.deleteReview(item.id)
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
            <span onClick={() => deleteReview(item)}>Удалить Отзыв</span>
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
                     {review}
                     <div className="add__review">
                        <h5>Сообщение:</h5>
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
   restaurant: state.restaurant.restaurants,
   reviews: state.review.reviews
})

const mapDispatchToProps = dispatch => ({
   restaurantActions: bindActionCreators(restaurantActions, dispatch),
   reviewActions: bindActionCreators(reviewActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps) (RestaurantList);
