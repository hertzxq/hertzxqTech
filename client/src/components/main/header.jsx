export default function Header() {
    return (
    <header>
        <div className="logo">
            <a href="/"><img src={require('../img/logo.jpeg')} alt="logo" /></a>
        </div>
        <div className="links-header">
            <ul>
                <li className="news-header"><a href="/">Главная</a></li>
                <li className="technologies-header"><a href="/popularTech">Популярные технологии</a></li>
                <li className="profile-header"><a href="/news">Новости</a></li>
                <li className="profile-header"><a href="/register">Вход</a></li>
            </ul>
        </div>
    </header>
    )
}