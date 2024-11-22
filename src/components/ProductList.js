import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://em.mshome.net:5000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.productId === product.product_id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ productId: product.product_id, title: product.title, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} added to cart!`);
    };

    return (
        <div>
            <h1>Products</h1>
            <div>
                {products.map(product => (
                    <div key={product.product_id}>
                        <img
                            src={product.image ? `data:image/jpeg;base64,${product.image}` : 'https://via.placeholder.com/150'}
                            alt={product.title}
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p>Price: €{product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
