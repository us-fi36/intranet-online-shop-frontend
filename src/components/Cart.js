import React, { useState, useEffect } from 'react';

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

    const handleCheckout = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in to place an order.');
            return;
        }

        const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
        console.log('User ID:', userId);
        console.log('Cart:', cart);

        fetch('http://em.mshome.net:5000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ cart }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Order response:', data);
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

    return (
        <div>
            <h1>Cart</h1>
            {cart.map(item => (
                <div key={item.productId}>
                    <h4>{item.title}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => handleQuantityChange(item.productId, -1)}>-</button>
                    <button onClick={() => handleQuantityChange(item.productId, 1)}>+</button>
                </div>
            ))}
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default Cart;
