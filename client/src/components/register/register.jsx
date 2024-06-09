import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const checkRegister = () => {
        console.log("Registered?");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/register', { username, email, password });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="registration-container">
            <h1 className="registration-title">Зарегистрироваться</h1>
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
                    <label htmlFor="email" className="form-label">Почта</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div className="form-group">
                    <label htmlFor="confirm-password" className="form-label">Подтвердите пароль</label>
                    <input
                        type="password"
                        id="confirm-password"
                        className="form-input"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button" onClick={checkRegister}>Зарегистрироваться</button>
                <span className='haveaccount'>Уже есть аккаунт? <a className='entrybtn' href="/login">Войдите</a></span>
            </form>
        </div>
    );
}
