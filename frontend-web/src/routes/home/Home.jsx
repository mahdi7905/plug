import React, {useContext} from 'react'
import ProCard from "../../components/procard/ProCard";
import "./home.css";
import { ProductContext } from '../../context/productContext';
import { FavoriteContext } from '../../context/favoriteContext';


const Home = () => {
  const {state:products} = useContext(ProductContext)
  const {favoriteItems} = useContext(FavoriteContext)
  const items = products
    .map((product) => ({
      sort: Math.random(),
      product,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((item) => item.product);
 
  return (
    <section className='home'>
      {
        items.map(item=>{
          const exists = favoriteItems.filter(x => x.item._id === item._id);
          if (exists.length > 0){
            return <ProCard key={item._id} type={item.type} media={item.media} id={item._id} size={item.size} price={item.price} favorite={true}/>
          }
          return <ProCard key={item._id} type={item.type} media={item.media} id={item._id} size={item.size} price={item.price}/>
          })
        }
      
    </section>
  )
}

export default Home