import React, { useState, useEffect } from 'react'
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})
    const [order, setOrder] = useState({})
    const [errorMessage, setErrorMessage] = useState('')

    const fetchProducts = async () => {
        //todo
        //const { data } = await some function

        //setProducts(data)

        setProducts([{ id: 1, name: "Product1", price: "$5", desciption: "Product1 Description", image: "" }])
    }

    const fetchCart = async () => {
        //todo
        //const cart = await some function

        //setCart(cart)

        setCart({ items: [{ id: 1, name: "Product1", quantity: 1 }], total_items: 1, subtotal: "$5" })
    }

    const handleAddCart = async (productId, quantity) => {
        //const { cart } = await some function add(pdocutid, quantity)

        //setCart(cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        // const { cart } = await some function

        // setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        // const { cart } = await

        // setCart
    }

    const handleEmptyCart = async () => {
        // const { cart } = await

        // setCart(cart)
    }

    const refreshCart = async () => {
        //const newCart = await commerce.cart.refresh

        setCart({})
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            //const incomingOrder = await commerce.checkout.caputre

            setOrder({})
            refreshCart()
        }
        catch (error) {
            setErrorMessage(error.data.error.messge)
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout 
                            cart={cart} 
                            order={order} 
                            onCaptureCheckout={handleCaptureCheckout} 
                            error={errorMessage}
                        />
                    </Route>
                </Switch>

            </div>
        </Router>
    )
}

export default App