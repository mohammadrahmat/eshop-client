import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles()
    const history = useHistory()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setshippingData] = useState({})
    const [isFinished, setisFinished] = useState(false)

    useEffect(() => {
        const generateToken = async () => {
            try {
                // const token = await method(cart.id, { type: 'cart' })
                // setCheckoutToken(token)

                setCheckoutToken({ id: 1234, items: [{ id: 1, name: "Product A", quantity: 1, total_price: "$5" }], subtotal: "$5" })
            } catch (error) {
                history.pushState('/')
            }
        }

        generateToken()
    }, [cart])

    const nextStep = () => setActiveStep((previousActiveStep) => previousActiveStep + 1)
    const backStep = () => setActiveStep((previousActiveStep) => previousActiveStep - 1)

    const next = (data) => {
        setshippingData(data)
        nextStep()
    }

    const timeout = () => {
        setTimeout(() => {
            setisFinished(true)
        }, 3000);
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase</Typography>
                <Divider className={classes.divider} />
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if (error) {
        Confirmation = <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} back={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />

    return (
        <div>
            <>
                <div className={classes.toolbar} />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" alight="center">Checkout</Typography>
                        <Stepper activeStep={0} className={classes.Stepper}>
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                    </Paper>
                </main>
            </>
        </div>
    )
}

export default Checkout
