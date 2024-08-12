import React, { useContext } from 'react'
import "./favorites.css"
import { FavoriteContext } from '../../context/favoriteContext'
import ProCard from '../../components/procard/ProCard'

const Favorites = () => {
  const {favoriteItems} = useContext(FavoriteContext)
  return (
    <section className='favorites-container'>
      {
        favoriteItems.map(item => 
          <ProCard 
            key={item._id} 
            type={item.item.type} 
            media={item.item.media} 
            id={item.item._id} 
            size={item.item.size} 
            price={item.item.price} 
            favorite={true}/>)
      }
    </section>
  )
}

export default Favorites