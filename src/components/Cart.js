import React, { useState, useEffect } from 'react';
import '../CSS/Product.css';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const handleQuantityChange = (productId, delta) => {
        const updatedCart = cart.map(item =>
            item.productId === productId
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemoveItem = (productId) => {
        const updatedCart = cart.filter(item => item.productId !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleCheckout = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in to place an order.');
            return;
        }

        fetch('http://em.mshome.net:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ cart }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Order placed successfully.') {
                    alert(data.message);
                    localStorage.removeItem('cart');
                    setCart([]);
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error('Error placing order:', error));
    };

    const calculateTotal = () => {
        return cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0).toFixed(2);
    };

    return (
        <div>
            <h1>Cart</h1>
            {cart.length > 0 ? (
                <div>
                    {cart.map(item => (
                        <div key={item.productId} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <div className='productCard'>
                                <h4 style={{ textAlign: 'center' }}>{item.title}</h4>
                                <p style={{ marginLeft: '10px' }}>Price: €{Number(item.price).toFixed(2)}</p>

                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <button style={{ width: '70px', marginLeft: '0px' }} onClick={() => handleQuantityChange(item.productId, -1)}>-</button>
                                    <p style={{ marginLeft: '0px' }}>Quantity: {item.quantity}</p>
                                    <button style={{ width: '70px', marginLeft: '0px' }} onClick={() => handleQuantityChange(item.productId, 1)}>+</button>
                                    <br></br>
                                </div>
                                <button style={{ backgroundColor: 'error', marginLeft: '70px' }} onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <h3>Total Price: €{calculateTotal()}</h3>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
