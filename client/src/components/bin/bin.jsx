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
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price);
            if (isNaN(price)) {
                console.error(`Invalid price for item ${item.title}: ${item.price}`);
                return total;
            }
            return total + price * item.quantity;
        }, 0);
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Please log in first.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ items: cartItems }),
            });

            if (response.ok) {
                alert('Order placed successfully');
                localStorage.removeItem('cartItems'); // Clear the cart
                setCartItems([]);
            } else {
                const errorData = await response.json();
                alert('Error placing order: ' + errorData.error);
            }
        } catch (error) {
            alert('Error placing order: ' + error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="cart-container">
                {cartItems.length === 0 ? (
                    <div className="empty-cart-message">
                        <h2 className='binEmpty'>Ваша корзина пуста</h2>
                        <p className='binSubtitle'>Добавьте товары в корзину, чтобы увидеть их здесь.</p>
                    </div>
                ) : (
                    <>
                        <h1 className="cart-title">Ваша корзина</h1>
                        {cartItems.map((item, index) => (
                            <div className="cart-item" key={index}>
                                <div className="cart-item-image">
                                    <img src={item.mainImageSrc} alt={item.title} />
                                </div>
                                <div className="cart-item-details">
                                    <h2 className="cart-item-name">{item.title}</h2>
                                    <p className="cart-item-price">Цена: {item.price} руб.</p>
                                    <button className="cart-item-remove" onClick={() => handleRemoveItem(index)}>Удалить</button>
                                </div>
                            </div>
                        ))}
                        <div className="cart-total">
                            <h3 className="cart-total-title">Итого:</h3>
                            <p className="cart-total-price">{getTotalPrice()} руб.</p>
                            <button className="cart-checkout-button" onClick={handleCheckout}>Перейти к оформлению</button>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}
