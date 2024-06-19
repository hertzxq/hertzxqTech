import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.jpeg';
import binIcon from '../img/bin.png';
import "./header.css"
export default function Header(props) {
    const [username, setUsername] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
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
                <Link to="/"><img src={logo} alt="logo" /></Link>
            </div>
            <div className="menu-toggle" onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`links-header ${menuOpen ? 'show' : ''}`}>
                <ul className='links-header-ul'>
                    <li className="news-header"><Link to="/">Главная</Link></li>
                    <li className="technologies-header"><Link to="/popularTech">Популярные технологии</Link></li>
                    <li className="profile-header"><Link to="/news">Новости</Link></li>
                    {username ? (
                        <li className="profile-header"><Link to="/profile">{username}</Link></li>
                    ) : (
                        <li className="profile-header"><Link to="/login">Вход</Link></li>
                    )}
                    {username ? (
                        <li className="profile-bin"><Link to="/bin"><img src={binIcon} alt="Корзина" /></Link></li>
                    ) : (
                        <li className="profile-bin"><Link to="/"></Link></li>
                    )}
                </ul>
            </div>
        </header>
    );
}