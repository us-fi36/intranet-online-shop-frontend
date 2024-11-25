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
                    throw new Error('Failed to fetch orders. Check JWT Token!');
                }

                const data = await response.json();
                console.log('Orders fetched:', data);
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
                orders.map(order => {
                    // Calculate the total sum for the order
                    const totalSum = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                    return (
                        <div key={order.orderId} className='orderProducts'>
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
                            <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
                                Total: €{totalSum.toFixed(2)}
                            </p>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Order;
