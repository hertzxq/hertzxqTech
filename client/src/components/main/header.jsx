import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    const [username, setUsername] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false); // Состояние для управления видимостью меню

    useEffect(() => {
        // Проверяем, есть ли токен и информация о пользователе в localStorage
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (token && user) {
            setUsername(user.username);
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header>
            <div className="logo">
                <Link to="/"><img src={require('../img/logo.jpeg')} alt="logo" /></Link>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`links-header ${menuOpen ? 'show' : ''}`}>
                <ul>
                    <li className="news-header"><Link to="/">Главная</Link></li>
                    <li className="technologies-header"><Link to="/popularTech">Популярные технологии</Link></li>
                    <li className="profile-header"><Link to="/news">Новости</Link></li>
                    {username ? (
                        <li className="profile-header"><Link to="/profile">{username}</Link></li>
                    ) : (
                        <li className="profile-header"><Link to="/login">Вход</Link></li>
                    )}
                    {
                        username ? (
                            <li className="profile-bin"><Link to="/bin"><a href="/bin"><img src={require('../img/bin.png')} alt="Ryzen 9 5800X" /></a></Link></li>
                        ) : (
                            <li className="profile-bin"><Link to="/"></Link></li>
                        )}
                </ul>
            </div>
        </header>
    );
}