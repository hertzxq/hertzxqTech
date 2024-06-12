import Header from '../main/header'
import Footer from '../main/footer'

export default function ProductCard() {


    return (
        <>
        <Header />
        <div class="product-container">
        <div class="product-page">
            <div class="product-gallery">
                <img src={require('../img/videocard.jpeg')} alt="Product Image" />
                <div class="product-thumbnails">
                    <img src={require('../img/videocard.jpeg')} alt="Thumbnail 1" />
                    <img src={require('../img/videocard.jpeg')} alt="Thumbnail 2" />
                    <img src={require('../img/videocard.jpeg')} alt="Thumbnail 3" />
                </div>
            </div>
            <div class="product-details">
                <h2>RTX 4090</h2>
                <p class="product-price">149 000 ₽</p>
                <p class="product-availability">Базовая</p>
                <p class="product-description">NVIDIA GeForce RTX 4090 - это одна из самых мощных графических карт, 
                    выпущенных NVIDIA в серии RTX 40. Эта видеокарта предназначена для высокопроизводительных игр, 
                    профессиональной работы с графикой и машинного обучения. Она основана на архитектуре Ada Lovelace и использует самые современные
                     технологии, чтобы предоставить исключительную производительность и визуальное качество.</p>
                <button class="product-button">Добавить в корзину</button>
            </div>
        </div>
    </div>
    <Footer />
        </>
    )
}