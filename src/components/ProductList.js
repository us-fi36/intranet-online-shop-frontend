import React, { useState, useEffect } from 'react';
import '../CSS/Product.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showDescriptions, setShowDescriptions] = useState({});

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
            cart.push({ productId: product.product_id, title: product.title, price: Number(product.price), quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} added to cart!`);
    };

    const toggleDescription = (productId) => {
        setShowDescriptions(showDescriptions === productId ? null : productId);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>Products</h1>
            <div className='flex-row'>
                {products.map(product => (
                    <div key={product.product_id} className='productCard'>
                        <img
                            className='productImage'
                            src={product.image ? `data:image/jpeg;base64,${product.image}` : 'https://via.placeholder.com/150'}
                            alt={product.title}
                        />
                        <h3>{product.title}</h3>
                        <button className='descriptionButton' onClick={() => toggleDescription(product.product_id)}>
                            {showDescriptions === product.product_id ? 'Hide Description' : 'Show Description'}
                        </button>
                        {showDescriptions === product.product_id && (
                            <p style={{ textAlign: 'center', margin: '10px 0' }}>{product.description}</p>
                        )}
                        <p>Price: €{product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
