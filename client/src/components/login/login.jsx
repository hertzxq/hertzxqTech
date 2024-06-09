export default function Login() {
    return (
        <div className="registration-container">
            <h1 className="registration-title">Войти</h1>
            <form className="registration-form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Имя пользователя</label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        name="username"
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
                        required
                    />
                </div>
                <button type="submit" className="form-button">Войдите</button>
                <span className='haveaccount'>нет аккаунта? <a className='entrybtn' href="/register">Зарегистрироваться</a></span>
            </form>
        </div>
    )
}