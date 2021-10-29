import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import FormInput from './FormInput'

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setshippingCountries] = useState([])
    const [shippingCountry, setshippingCountry] = useState('')
    const [shippingCities, setShippingCities] = useState([])
    const [shippingCity, setShippingCity] = useState('')
    const [shippingOptions, setshippingOptions] = useState([])
    const [shippingOption, setshippingOption] = useState('')

    const methods = useForm()

    const fetchShippingCountries =  async (checkoutTokenId) => {
        // const { countries } = await function
        const countries = {"AF": "Afghanistan", "UK": "United Kingdom", "TR": "Turkey"}
        
        setshippingCountries(countries)
        setshippingCountry(Object.keys(countries)[0])
    }

    const fetchCities = async (countryCode) => {
        // const { cities } = await
        const cities = {"TT": "TT name", "RR": "RR Name"}

        setShippingCities(cities)
        setShippingCity(Object.keys(cities)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        //const options = await commerce

        const options = [{ id: 1, price: 10, description: "PTT" }, { id: 2, price: 20, description: "Aras" }]
        setshippingOptions(options)
        setshippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        if (shippingCountry) { fetchCities(shippingCountry) }
    }, [shippingCountries])

    useEffect(() => {
        if (shippingCity) { fetchShippingOptions(checkoutToken.id, shippingCountry, shippingCity) }
    }, [shippingCity])

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider { ...methods }>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingCity, shippingOption }) )}>
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="First name" />
                        <FormInput required name="lastName" label="Last name" />
                        <FormInput required name="address1" label="Address" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="zip" label="ZIP / Postal Code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setshippingCountry(e.target.value)}>
                                {
                                    Object.entries(shippingCountries)
                                    .map(([code, name]) => ({ id: code, label: name }))
                                    .map((country) => (
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping City</InputLabel>
                            <Select value={shippingCity} fullWidth onChange={(e) => setShippingCity(e.target.value)}>
                                {
                                    Object.entries(shippingCities)
                                    .map(([code, name]) => ({ id: code, label: name }))
                                    .map((city) => (
                                        <MenuItem key={city.id} value={city.id}>
                                            {city.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setshippingOption(e.target.value)}>
                            {
                                shippingOptions.map((option) => ({ id: option.id, label: `${option.description} - (${option.price})`}))
                                .map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
