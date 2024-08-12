import React, { useContext,useState, useEffect } from 'react'
import "./cart.css"
import CartItemCard from '../../components/cartItemCard/CartItemCard'
import { CartContext } from '../../context/cartContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate()
  const {cartItems}=useContext(CartContext)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    setTotal(cartItems.reduce((acc, item) => acc + item.item.price, 0))
  },[cartItems])

  const checkoutAll = async () => {
    const products = cartItems.map((product) => product.item._id).join(',')
    navigate(`/create-order?products=${products}`)
  }
  return (
    <section className='cart-container'>
      <div className="checkout-all-area">
        <div className="cart-label-area">
          <p className="cart-label">Cart Items: <span>{cartItems.length}</span></p>
          <p className="cart-label">Total: <span>N{total}</span></p>
        </div>
        <div>
          <button onClick={checkoutAll} className='checkout-btn'>Checkout</button>
        </div>
      </div>
      <div className="cart-items">
        {
          cartItems.map(item => 
            <CartItemCard 
              key={item._id} 
              product={item.item._id} 
              media={item.item.media} 
              size={item.item.size} 
              price={item.item.price} 
              type={item.item.type} 
              id={item._id}
            />)
        }
      </div>
    </section>
  )
}

export default Cart