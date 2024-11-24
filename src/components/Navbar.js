import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge'; // Badge for showing the cart count
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('token'));
    const [cartCount, setCartCount] = React.useState(0); // State for cart count
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setAnchorEl(null);
        navigate('/login');
    };

    // Update cart count from localStorage
    React.useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
            setCartCount(totalCount);
        };

        updateCartCount();

        // Listen for changes to localStorage (in case cart is updated elsewhere)
        window.addEventListener('storage', updateCartCount);
        return () => {
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            Products
                        </Link>
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="show cart items"
                        color="inherit"
                        onClick={() => navigate('/cart')}
                    >
                        <Badge badgeContent={cartCount} color="error"> {/* Display cart count */}
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{ marginLeft: 2, cursor: 'pointer', color: 'white' }}
                        onClick={() => navigate('/orders')} // Navigate to Order history
                    >
                        Orders
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account options"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {!isLoggedIn ? (
                                <>
                                    <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
                                    <MenuItem onClick={() => navigate('/register')}>Register</MenuItem>
                                </>
                            ) : (
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            )}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
