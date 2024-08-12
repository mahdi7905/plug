import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { ProductContext } from '../../context/productContext';
import axios from 'axios';
import "./createOrder.css"
import { OrderContext } from '../../context/orderContext';


const CreateOrder = () => {
    const navigate = useNavigate()
    const {dispatch} = useContext(OrderContext)
    const [searchParams] = useSearchParams()
    const {state} = useContext(ProductContext)
    const products_id = searchParams.get('products').split(',')
    const products = products_id.map(product_id => {
        return state.filter(item => item._id === product_id)[0]
    })
    const price = products.reduce((acc, product) => acc + product.price, 0)
    const [order, setOrder] = useState({
        products_id,
        shippingAddress: ""
    })
    const createOrder = async ()=>{
        const {data} = await axios.post("http://localhost:7000/api/orders/create-order", order)
        dispatch({type:"NEW_ORDER_ITEM", payload:data})
        navigate("/orders")
    }
    const checkoutOrder = async ()=>{
        const {data} = await axios.post("http://localhost:7000/api/orders/create-order", order)
        console.log(data, "created order")
        dispatch({type:"NEW_ORDER_ITEM", payload:data})
        navigate(`/checkout?orderId=${data._id}`)
    }
  return (
    <section className='create-order-page'>
        <div className="order-card">
            <h2 className='checkout-title'>Checkout</h2>
            <div className="order-details">
                <div className="order-media-wrapper">
                    {
                        products.map(item => <img src={item.media} className='order-media' alt="product" />)
                    }
                </div>
                <h3 className='price'>Total: {price}</h3>
            </div>
            <div className="order-actions">
                <textarea onChange={(e) => setOrder({...order, shippingAddress: e.target.value})} placeholder='Enter Shipping Address' className='address'/>
                <div className="order-actions">
                    <button onClick={checkoutOrder} className='checkout-page-btn'>Checkout</button>
                    <button onClick={createOrder} className='later-btn'>Pay Later</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CreateOrder