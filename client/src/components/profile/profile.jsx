import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../main/header";
import Footer from "../main/footer";

export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('https://hertzxq-tech-server.vercel.app/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Profile data:', response.data);

                // Сохраняем информацию о пользователе в localStorage
                localStorage.setItem('user', JSON.stringify(response.data));

                setProfileData(response.data);
            } catch (error) {
                console.error('Profile fetch error:', error);
                setError('Ошибка при загрузке профиля. Пожалуйста, войдите снова.');
                localStorage.removeItem('token');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleLogout = () => {
        // Удаляем токен и информацию о пользователе из localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    return (
        <>
            <Header />
            <main>
                <div className="profile-section">
                    <div className="profile-content">
                        <h1>Профиль пользователя</h1>
                        <div className="profile-details">
                            <img src={require('../img/profile_avatar.jpg')} alt="User Avatar" className="profile-avatar" />
                            <div className="user-info">
                                <p>Имя пользователя: {profileData.username}</p>
                                <p>Email: {profileData.email}</p>
                            </div>
                            <button className='btn_leave' onClick={handleLogout}>Выйти</button>
                        </div>
                    </div>
                </div>
                <div className="order-history-container">
                    <h1 className="order-history-title">История заказов</h1>
                    <table className="order-history-table">
                        <thead>
                            <tr>
                                <th>Номер</th>
                                <th>Дата</th>
                                <th>Название</th>
                                <th>Стоимость</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profileData.orders && profileData.orders.map((order, index) => (
                                <tr key={index} className='table-profile'>
                                    <td>{order.id}</td>
                                    <td>{formatDate(order.created_at)}</td>
                                    <td>{order.items.map(item => item.title).join(', ')}</td>
                                    <td className='table-price'>{order.price} руб.</td>
                                    <td className='table-success'>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>
    );
};
