import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        // Проверяем, есть ли токен и информация о пользователе в localStorage
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (token && user) {
            setUsername(user.username);
        }
    }, []);


    return (
        <header>
            <div className="logo">
                <Link to="/"><img src={require('../img/logo.jpeg')} alt="logo" /></Link>
            </div>
            <div className="links-header">
                <ul>
                    <li className="news-header"><Link to="/">Главная</Link></li>
                    <li className="technologies-header"><Link to="/popularTech">Популярные технологии</Link></li>
                    <li className="profile-header"><Link to="/news">Новости</Link></li>
                    {username ? (
                        <>
                            <li className="profile-header"><Link to="/profile">{username}</Link></li>
                        </>
                    ) : (
                        <li className="profile-header"><Link to="/login">Вход</Link></li>
                    )}
                </ul>
            </div>
        </header>
    );
}