import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import Footer from '../footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './restaurants.css';
import * as restaurantActions from "../../actions/restaurantActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Pagination, Input } from 'antd';
import { Container } from 'react-bootstrap';

function Restaurants(props) {

   const [search, setSearch] = useState({
      query: ``,
      page: 1
   })

   const [searchReq, setSearchReq] = useState("")

   const onChangePage = e => {
      setSearch(prev => ({
          ...prev,
          page: e
      }))
      props.restaurantActions.getRestaurant({ query: search.query, page: e})
   }

   const searchHandler = (e) => {
      setSearchReq(e.target.value)
      props.restaurantActions.getRestaurant({query: e.target.value, page: search.page})
  }

   useEffect(() => {
      async function fetchData() {
         await props.restaurantActions.getRestaurant()
      }
      fetchData()
   }, [props.restaurantActions, search])

   console.log(props.restaurant.total)

   const data = props.restaurant?.restaurants?.map((item, i) => {
      return (
         <div key={i} className="container__restaurants">
            <div className="image__restaurants">
               <img alt="image-restaurant" src={`http://localhost:5000/${item.image}`}/>
            </div>
            <div className="information">
               <a href="/">{item.name}</a>
               <p>{`Adress: ${item.location}`}</p>
               <p>{`Avarage Check: ${item.averageBill}`}</p>
               <p>{`Phone: ${item.phone}`}</p>
            </div>
         </div>
      )
   })

   return (
      <div className="restaurants-wrapper">
         <Navbar />
            <div className="content">
               <Container>
                  <Input
                     style={{ marginTop: `20px` }}
                     placeholder={`Search for Restaurants...`}
                     onChange={searchHandler}
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
   restaurant: state.restaurant.restaurants
})

const mapDispatchToProps = dispatch => ({
   restaurantActions: bindActionCreators(restaurantActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (Restaurants);
