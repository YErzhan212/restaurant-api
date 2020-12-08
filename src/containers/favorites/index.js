import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as favoriteActions from '../../actions/favoriteActions';
import * as restaurantActions from '../../actions/restaurantActions';

function Favorites(props) {

   const [fromData] = useState([
      {
         restaurant: props.restaurant
      }
   ])

   console.log(fromData)

   useEffect(() => {
      async function fetchData() {
         await props.favoriteActions.getFavorites()
      }
      fetchData()
   }, [props.favoriteActions])

   const favoriteItem = props.favorite.map((item, i) => {
      return (
         <div key={i}>
            <p>{item.id}</p>
            <div>{fromData.restaurant}</div>
         </div>
      )
   })

   return (
      <div style={{margin: `50px`}}>
         {favoriteItem}
         <button>add</button>
      </div>
   )
}

const mapStateToProps = state => ({
   error: state.favorite.error,
   favorite: state.favorite.favorites,
   restaurant: state.restaurant.restaurants
})

const mapDispatchToProps = dispatch => ({
   favoriteActions: bindActionCreators(favoriteActions, dispatch),
   restaurantActions: bindActionCreators(restaurantActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps) (Favorites)
