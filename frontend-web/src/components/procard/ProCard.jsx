import React, { useContext } from 'react'
import axios from 'axios';
import "./procard.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CartContext } from '../../context/cartContext';
import { FavoriteContext } from '../../context/favoriteContext';
import {useNavigate} from "react-router-dom"

const ProCard = ({type,price,size,media,id,favorite}) => {
    const navigate = useNavigate()
    const {dispatch} = useContext(CartContext)
    const {favoriteItems, dispatch: favDispatch} = useContext(FavoriteContext)

    const addToCart = async () =>{
        const { data } = await axios.post("http://localhost:7000/api/cart/add-to-cart", {cartItem:id});
        if (data.message){
            alert(data.message)
            return
        }
        dispatch({type:"NEW_CART_ITEM", payload:data})
    }
    const purchase = ()=>{
        console.log("working")
        navigate(`/create-order?products=${id}`)
    }
    const actionFavorites = async () =>{
        const exists = favoriteItems.filter(item => item.item._id === id)
        if (favorite){
            
            const { data } = await axios.post("http://localhost:7000/api/favorite/delete-favorite", {favoriteItem:exists[0]._id});
             if (data.message){
                alert(data.message)
                return
            }
            favDispatch({type:"REMOVE_FAV", payload:data._id})
            return
        }
        if (!favorite){
            const { data } = await axios.post("http://localhost:7000/api/favorite/add-to-favorites", {favoriteItem:id});
             if (data.message){
                alert(data.message)
                return
            }
            favDispatch({type:"NEW_FAV", payload:data})
            navigate("/favorites")
        }
    }

  return (
    <div className='pro-card'>
        <div className="pro-media-container">
            <img src={media} alt="product" className='product-media'/>
            <button onClick={actionFavorites} className="favorite">
                {
                    favorite ? <FavoriteIcon sx={{height:"23px", width:"23px", color:"crimson"}}/>
                    : <FavoriteBorderIcon sx={{height:"23px", width:"23px", color:"crimson"}}/>
                }
            </button>
        </div>
        <div className="product-info">
            <div className="product-info-row">
                <h3 style={{fontFamily:"interBold", fontSize:"1rem", color:"var(--font-sec)"}}>Size {size}</h3>
                <h3 style={{fontFamily:"interRegular", fontSize:".8rem",color:"var(--font-sec)"}}>N{price}</h3>
            </div>
            <div className="product-info-row">
                <h3 style={{fontFamily:"interSemiBold", fontSize:"1rem", color:"var(--font-sec)"}}>{type}</h3>
            </div>
            <div className="card-actions">
                <button onClick={addToCart} className='cart-btn'>Add to Cart</button>
                <button onClick={purchase} className='buy-btn'>Purchase</button>
            </div>
        </div>
    </div>
  )
}

export default ProCard