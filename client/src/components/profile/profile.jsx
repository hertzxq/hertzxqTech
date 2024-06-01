import Header from "../main/header"
import Footer from "../main/footer"

export default function Profile() {
    return (
    <>
    <Header />
    <main>
        <div className="profile-section">
            <div className="profile-content">
                <h1>Профиль пользователя</h1>
                <div className="profile-details">
                    <img src="./img/user-avatar.jpeg" alt="User Avatar" className="profile-avatar" />
                    <div className="user-info">
                        <p>Имя пользователя: Иван Иванов</p>
                        <p>Email: ivan.ivanov@example.com</p>
                        <p>Дата регистрации: 01.01.2020</p>
                    </div>
                </div>
                <div className="order-history">
                    <h2>История заказов</h2>
                    <ul className="order-list">
                        <li>Заказ #1: RTX 4090 - 149 000 ₽ - 01.03.2023</li>
                        <li>Заказ #2: Ryzen 9 5800X - 56 800 ₽ - 15.04.2023</li>
                        <li>Заказ #3: SK hynix - 23 300 ₽ - 23.05.2023</li>
                    </ul>
                </div>
                <a href="profile" className="btn">Редактировать профиль</a>
            </div>
        </div>
    </main>
    <Footer />
    </>
    )
}