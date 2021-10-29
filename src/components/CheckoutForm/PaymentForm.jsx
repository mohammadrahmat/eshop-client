import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import Review from './Review'

const stripePromise = loadStripe(process.env.STRIPE_PK)

const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep, timeout }) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault()

        if (!stripe || !elements) return

        const cardElement = elements.getElement(CardElement)

        const { error, payment } = await stripe.createPaymentMethod({ type: 'card', card: cardElement })

        if (error)
        {
            //todo: handle error
        }
        else
        {
            const orderData = {
                items: checkoutToken.items,
                customer: { 
                    firstname: shippingData.firstName, 
                    lastname: shippingData.lastName, 
                    email: shippingData.email 
                },
                shipping: { 
                    name: 'Primary Shipping', 
                    street: shippingData.address1, 
                    town_city: shippingData.City,
                    county_state: shippingData.shippingCity,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: payment.id
                    }
                }
            }

            onCaptureCheckout(checkoutToken.Id, orderData)
            timeout()
            nextStep()
        }
    }

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment Method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br /> <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay { checkoutToken.subtotal }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
