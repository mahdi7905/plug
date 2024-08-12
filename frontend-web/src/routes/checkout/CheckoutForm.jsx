import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { useElements, useStripe,CardElement } from '@stripe/react-stripe-js'
import axios from "axios"

import "./checkout.css"
import { OrderContext } from '../../context/orderContext'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#00726f",
			color: "#341f00",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#00726f" },
			"::placeholder": { color: "#341f00" }
		},
		invalid: {
			iconColor: "#fb0f36",
			color: "#fb0f36"
		}
	}
}

const CheckoutForm = ({order_id}) => {
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const {dispatch} = useContext(OrderContext)

   const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
            const {id} = paymentMethod
            const {data} = await axios.post("http://localhost:7000/api/checkout", {
                order_id,
                id
            })

            if(data.success) {
                console.log("Successful payment", data)
                dispatch({type:"ORDER_CHECKOUT", payload:data.order})
                navigate("/orders", {replace:true})
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}
 
  return (
    <div className='checkout-form'>
      <h2 className="checkout-header">Enter Card Details</h2>
      <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className='pay-btn'>Pay</button>
        </form>
    </div>
  )
}

export default CheckoutForm