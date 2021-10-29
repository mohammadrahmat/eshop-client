import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart } from '@material-ui/icons'

import logo from '../../assets/logo.jpg'
import useStyles from './styles'

const Navbar = ({ totalItems }) => {
    const classes = useStyles()
    const location = useLocation()

    const [mobileAnchorEl, setMobileAnchoEl] = useState(null)
    const isMobileMenuOpen = Boolean(mobileAnchorEl)
    const handleMobileMenuClose = () => setMobileAnchoEl(null)

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id='primary-search-account-menu-mobile'
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </MenuItem>
        </Menu>
    )


    return (
        <div>
            <>
                <AppBar position="fixed" className="classes.appBar" color="inherit">
                    <Toolbar>
                        <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit" >
                            <img src={logo} alt="E-Shop" height="25px" className={classes.image} />
                            {process.env.REACT_APP_TITLE}
                        </Typography>
                        <div className={classes.grow} />
                        {location.pathname === '/' && (
                            <div className={classes.button}>
                                <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                    <Badge badgeContent={totalItems} color="secondary">
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </>
        </div>
    )
}

export default Navbar
