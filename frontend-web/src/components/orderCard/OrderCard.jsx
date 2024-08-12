import React from 'react'
import "./ordercard.css"
import { useNavigate } from 'react-router-dom'

const OrderCard = ({order}) => {
  const navigate = useNavigate()
  const date = new Date(order.createdAt)
  const pay = () => {
    navigate(`/checkout?orderId=${order._id}`)
  }
  return (
    <div className='order-card-main'>
        <div className="order-details-sec">
            <div className="order-media-wrapper">
              {
                order.products.map((product) => <img src={product.media} alt="order" className="order-media" />)
              }
                
            </div>
            <p className="order-info">Amount: <span>N{order.amount}</span></p>
            <p className="order-info">Date: <span>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</span></p>
            <p className="order-info">Payment Status: <span>{order.paymentStatus}</span></p>
            <p className="order-info">Shipping Status: <span>{order.shippingStatus}</span></p>
            {
              order.confirmation && (
                <p className="order-info">Order Confirmed</p>
              )
            }
        </div>
        <div className="order-actions-sec">
          {
            !order.confirmation && (
              <button className='confirm-order-btn'>Confirm Order</button>
            )
          }
          {
            order.paymentStatus === "pending" && (
              <button className='pay-btn' onClick={pay}>Pay</button>
            )
          }
        </div>
    </div>
  )
}

export default OrderCard