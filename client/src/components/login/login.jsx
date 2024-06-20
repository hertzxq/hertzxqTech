import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://hertzxq-tech-server.vercel.app/login', { username, password });
            const token = response.data.token;
            console.log('Received token:', token);

            // Сохраняем токен и информацию о пользователе в localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify({ username }));

            alert("Вход выполнен успешно!");
            navigate('/profile');
        } catch (error) {
            console.error('Login error:', error);
            alert("Ошибка при входе. Проверьте имя пользователя и пароль.");
        }
    };

    return (
        <div className="registration-container">
            <h1 className="registration-title">Войти</h1>
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Имя пользователя</label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        className="form-input"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Войти</button>
                <span className='haveaccount'>Нет аккаунта? <a className='entrybtn' href="/register">Зарегистрироваться</a></span>
            </form>
        </div>
    );
};
