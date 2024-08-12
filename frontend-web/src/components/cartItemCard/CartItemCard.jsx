import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import "./cartItemCard.css"
import { CartContext } from '../../context/cartContext'
import axios from 'axios'

const CartItemCard = ({size,price,type,media,id,product}) => {
    const {dispatch}=useContext(CartContext)
    const navigate = useNavigate()
    const removeItem = async () =>{
        const {data} = await axios.post("http://localhost:7000/api/cart/remove-cart-item",{cartItem:id})
        dispatch({type: "REMOVE_CART", payload: data._id})
        
    }
    const checkoutItem = ()=> {
        navigate(`/create-order?products=${product}`)
    }
  return (
    <div className='cart-item-card'>
        <img src={media} className="cart-media" alt='Cart-media'/>
        <div className="cart-details">
            <div className="details">
                <p>Size {size}</p>
                <p>N{price}</p>
                <p>{type}</p>
            </div>
            <div className="actions">
                <button className='checkout-btn' onClick={checkoutItem}>Checkout</button>
                <button onClick={removeItem} className='remove-btn'>Remove</button>
            </div>
        </div>
    </div>
  )
}

export default CartItemCard