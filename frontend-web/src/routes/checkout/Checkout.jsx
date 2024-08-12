import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import "./checkout.css"
import { useSearchParams } from 'react-router-dom'



import CheckoutForm from './CheckoutForm';
const PUBLIC_KEY = "pk_test_51OuSNaAjavyPtfEB537khzJc727jmJl3j8mGj775Mib1aZ8T9S2OviqVRLrfiiFv0Z8vMZegM2WuNuBQlsmqsnLz00G9XYqZca"
const stripe = loadStripe(PUBLIC_KEY)

const Checkout = () => {
    const [searchParams] = useSearchParams()
    const order_id = searchParams.get('orderId')
    
  return (
    <div className='checkout-page'>
      <Elements stripe={stripe}>
        <CheckoutForm order_id={order_id}/>
      </Elements>
    </div>
  )
}


export default Checkout