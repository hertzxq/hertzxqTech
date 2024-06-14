import React, { useState, useEffect } from 'react';
import Header from "../main/header";
import Footer from "../main/footer";

export default function Bin() {
    const [cartItems, setCartItems] = useState([]);

    // Функция для загрузки товаров из localStorage при загрузке компонента
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const handleRemoveItem = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <>
            <Header />
            <div className="cart-container">
                <h1 className="cart-title">Ваша корзина</h1>
                {cartItems.map((item, index) => (
                    <div className="cart-item" key={index}>
                        <div className="cart-item-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="cart-item-details">
                            <h2 className="cart-item-name">{item.name}</h2>
                            <p className="cart-item-description">{item.description}</p>
                            <p className="cart-item-price">Цена: {item.price} руб.</p>
                            <button className="cart-item-remove" onClick={() => handleRemoveItem(index)}>Удалить</button>
                        </div>
                    </div>
                ))}
                <div className="cart-total">
                    <h3 className="cart-total-title">Итого:</h3>
                    <p className="cart-total-price">{getTotalPrice()} руб.</p>
                    <button className="cart-checkout-button">Перейти к оформлению</button>
                </div>
            </div>
            <Footer />
        </>
    );
}
