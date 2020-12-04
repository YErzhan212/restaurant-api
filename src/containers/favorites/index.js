import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as favoriteActions from '../../actions/favoriteActions';
import * as restaurantActions from '../../actions/restaurantActions';

function Favorites(props) {

   useEffect(() => {
      async function fetchData() {
         await props.favoriteActions.getFavorites()
      }
      fetchData()
   }, [props.favoriteActions])

   const favoriteItem = props.favorite?.favorites?.map((item, i) => {
      return {
         key: i,
         id: item.id,
         name: item.props.restaurant
      }
   })

   return (
      <div>
         {favoriteItem}
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
