import React, { useState } from 'react';
import Header from '../main/header';
import Footer from '../main/footer';
import mainImageSrc from '../img/videocard.jpeg';
import photo1 from '../img/ozu.jpeg';
import photo2 from '../img/proccessor.jpeg';
import photo3 from '../img/profile_avatar.jpg';

export default function ProductCard() {
    const [mainImage, setMainImage] = useState(mainImageSrc);

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
                    productId: 1, // Assuming you have a way to determine the product ID
                    quantity: 1,
                }),
            });

            if (response.ok) {
                alert('Product successfully added to cart');
            } else {
                const errorData = await response.json();
                alert('Error adding product to cart: ' + errorData.error);
            }
        } catch (error) {
            alert('Error adding product to cart: ' + error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="product-container">
                <div className="product-page">
                    <div className="product-gallery">
                        <img src={mainImage} alt="RTX 4090" />
                        <div className="product-thumbnails">
                            <img
                                src={photo1}
                                alt="RTX 4090 photo1"
                                onClick={() => handleThumbnailClick(photo1)}
                            />
                            <img
                                src={photo2}
                                alt="RTX 4090 photo2"
                                onClick={() => handleThumbnailClick(photo2)}
                            />
                            <img
                                src={photo3}
                                alt="RTX 4090 photo3"
                                onClick={() => handleThumbnailClick(photo3)}
                            />
                        </div>
                    </div>
                    <div className="product-details">
                        <h2>RTX 4090</h2>
                        <p className="product-price">149 000 ₽</p>
                        <p className="product-availability">Базовая</p>
                        <p className="product-description">
                            NVIDIA GeForce RTX 4090 - это одна из самых мощных графических карт, 
                            выпущенных NVIDIA в серии RTX 40. Эта видеокарта предназначена для высокопроизводительных игр, 
                            профессиональной работы с графикой и машинного обучения. Она основана на архитектуре Ada Lovelace и использует самые современные
                            технологии, чтобы предоставить исключительную производительность и визуальное качество.
                        </p>
                        <button className="product-button" onClick={handleAddToCart}>Добавить в корзину</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
