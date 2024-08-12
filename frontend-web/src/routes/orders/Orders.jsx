import React, { useContext } from 'react'
import { OrderContext } from '../../context/orderContext'
import OrderCard from '../../components/orderCard/OrderCard'
import "./orders.css"

const Orders = () => {
  const {orders} = useContext(OrderContext)
  console.log(orders,"from order page")
  return (
    <section className='order-container'>
      {
        orders.map(order => <OrderCard key={order._id} order={order}/>)
      }
    </section>
  )
}

export default Orders