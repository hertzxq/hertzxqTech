export default function Main({data}) {
    return (
        <main>
        <div className="intro-section">
            <div className="intro-content">
                <h1>Добро пожаловать</h1>
                <p>Здесь вы найдете все популярные технологии.</p>
            </div>
        </div>
        <div className="products">
            <h2>Наши товары</h2>
            <div className="product-cards">
                <div className="card">
                    <img src={require('../img/videocard.jpeg')} alt="Videocard" />
                    <h3>RTX 4090</h3>
                    <p>Самая мощная видеокарта в мире</p>
                    <p className="price">149 000 ₽</p>
                    <a href="./main" className="btn">Купить сейчас</a>
                </div>
                <div className="card">
                    <img src={require('../img/proccessor.jpeg')} alt="Proccessor" />
                    <h3>Ryzen 9 5800X</h3>
                    <p>Самая быстрый процессор в мире.</p>
                    <p className="price">56 800 ₽</p>
                    <a href="./main" className="btn">Купить сейчас</a>
                </div>
                <div className="card">
                    <img src={require('../img/ozu.jpeg')} alt="OZU" />
                    <h3>SK hynix</h3>
                    <p>Самая быстрая память в мире.</p>
                    <p className="price">23 300 ₽</p>
                    <a href="./main" className="btn">Купить сейчас</a>
                </div>
            </div>
        </div>
        <div className="about-us">
            <div className="about-content">
                <h2>О нас</h2>
                <p>Мы — команда энтузиастов, стремящихся сделать технологии доступными для всех. Наша компания основана на принципах качества, инноваций и клиентского удовлетворения. Мы верим, что будущее технологий уже здесь, и наша цель — помочь вам стать его частью.</p>
                <p>С 2010 года мы предоставляем широкий ассортимент высококачественных продуктов, от самых мощных видеокарт до быстрых процессоров и оперативной памяти. Наши специалисты всегда готовы помочь вам с выбором и предоставить профессиональные консультации.</p>
                <p>Присоединяйтесь к нам, и вы получите доступ к передовым технологиям и непревзойденному обслуживанию. Вместе мы создадим будущее, о котором вы мечтали.</p>
            </div>
        </div>

        <div>
            lol
            {data.map((item, index) => (
                <div key={index}>{item}</div>
            ))} 
        </div>

        <div className="news">
            <div className="news-content">
                <h2>Новости</h2>
                <p className="description">Последние обновления и новинки в мире технологий. Будьте в курсе самых важных событий и новостей.</p>
                <div className="card-news">
                    <div className="card">
                        <img src={require('../img/ozu.jpeg')} alt="OZU" />
                        <h3>SK hynix</h3>
                        <p>Самая быстрая память в мире.</p>
                        <p class="price">23 300 ₽</p>
                        <a href="./main" className="btn">Купить сейчас</a>
                    </div>
                    <div className="card">
                        <img src={require('../img/ozu.jpeg')} alt="OZU" />
                        <h3>SK hynix</h3>
                        <p>Самая быстрая память в мире.</p>
                        <p className="price">23 300 ₽</p>
                        <a href="./main" className="btn">Купить сейчас</a>
                    </div>
                    <div className="card">
                        <img src={require('../img/ozu.jpeg')} alt="OZU" />
                        <h3>SK hynix</h3>
                        <p>Самая быстрая память в мире.</p>
                        <p className="price">23 300 ₽</p>
                        <a href="./main" className="btn">Купить сейчас</a>
                    </div>
                    <div className="card">
                        <img src={require('../img/ozu.jpeg')} alt="OZU" />
                        <h3>SK hynix</h3>
                        <p>Самая быстрая память в мире.</p>
                        <p className="price">23 300 ₽</p>
                        <a href="./main" className="btn">Купить сейчас</a>
                    </div>
                    <div className="card">
                        <img src={require('../img/ozu.jpeg')} alt="OZU" />
                        <h3>SK hynix</h3>
                        <p>Самая быстрая память в мире.</p>
                        <p className="price">23 300 ₽</p>
                        <a href="./main" className="btn">Купить сейчас</a>
                    </div>
                    <div className="card">
                        <img src={require('../img/ozu.jpeg')} alt="OZU" />
                        <h3>SK hynix</h3>
                        <p>Самая быстрая память в мире.</p>
                        <p className="price">23 300 ₽</p>
                        <a href="./main" className="btn">Купить сейчас</a>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}