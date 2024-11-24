import React, { useState, useEffect } from 'react';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You need to log in to view your orders.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://em.mshome.net:5000/api/orders', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders.');
                }

                const data = await response.json();
                console.log('Orders fetched:', data); // Debugging response
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);


    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map(order => (
                    <div key={order.orderId} style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem 0' }}>
                        <h3>Order ID: {order.orderId}</h3>
                        <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                        <ul>
                            {order.items.map(item => (
                                <li key={item.productId}>
                                    <strong>{item.title}</strong> - €
                                    {(item.price ? Number(item.price).toFixed(2) : '0.00')} x {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default Order;
