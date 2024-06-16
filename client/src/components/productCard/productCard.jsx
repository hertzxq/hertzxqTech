import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../main/header';
import Footer from '../main/footer';
import productData from '../datas/productData';

import videocardImg from '../img/videocard.jpeg';
import ozuImg from '../img/ozu.jpeg';
import proccessorImg from '../img/proccessor.jpeg';

const imageMap = {
    1: [videocardImg, ozuImg, proccessorImg],
    2: [proccessorImg, ozuImg, videocardImg],
    3: [ozuImg, videocardImg, proccessorImg],
};

export default function ProductCard() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState('');

    useEffect(() => {
        const product = productData[productId];
        if (product) {
            setProduct(product);
            setMainImage(imageMap[productId][0]);
        }
    }, [productId]);

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Please log in first.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: 1,
                }),
            });
    
            if (response.ok) {
                alert('Product successfully added to cart');
                // Store the cart items in localStorage
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const newCartItem = {
                    id: productId,
                    title: product.title,
                    price: parseFloat(product.price.replace(/[^0-9.-]+/g, "")), // Сохраняем цену как число
                    mainImageSrc: mainImage,
                    quantity: 1,
                };
                cartItems.push(newCartItem);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            } else {
                const errorData = await response.json();
                alert('Error adding product to cart: ' + errorData.error);
            }
        } catch (error) {
            alert('Error adding product to cart: ' + error.message);
        }
    };

    
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="product-container">
                <div className="product-page">
                    <div className="product-gallery">
                        <img src={mainImage} alt={product.title} />
                        <div className="product-thumbnails">
                            {imageMap[productId].map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${product.title} photo${index + 1}`}
                                    onClick={() => handleThumbnailClick(image)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="product-details">
                        <h2>{product.title}</h2>
                        <p className="product-price">{product.price}</p>
                        <p className="product-availability">{product.availability}</p>
                        <p className="product-description">{product.description}</p>
                        <button className="product-button" onClick={handleAddToCart}>Добавить в корзину</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
