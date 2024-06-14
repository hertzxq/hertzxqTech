export default function Footer(props) {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>О нас</h3>
                    <p>Мы предоставляем новейшие технологии и продукты для наших клиентов. Наша цель - сделать технологии доступными и понятными для всех.</p>
                </div>
                <div className="footer-section">
                    <h3>Контакты</h3>
                    <p>Email: info@techstore.ru</p>
                    <p>Телефон: +7 (123) 456-7890</p>
                </div>
                <div className="footer-section">
                    <h3>Социальные сети</h3>
                    <ul>
                        <li><a href="https://vk.com/hertzxq">ВКонтакте</a></li>
                        <li><a href="/">Facebook</a></li>
                        <li><a href="/">Instagram</a></li>
                        <li><a href="/">Twitter</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; Hertzxq Technologies. Все права защищены.</p>
            </div>
        </footer>
    );
}