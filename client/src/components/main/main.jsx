import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';


export default function Main(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '30px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <main>
            <div className="intro-section">
                <div className="intro-content">
                    <h1>{props.Welcome}</h1>
                    <p>{props.subtitleWelcome}</p>
                </div>
            </div>
            <div className="products">
                <h2>{props.titleProduct}</h2>
                <Slider {...settings}>
                    <div className="card">
                        <img src={require('../img/videocard.jpeg')} alt="Videocard" />
                        <h3>{props.titleCard1}</h3>
                        <p>{props.subtitletitleCard1}</p>
                        <p className="price">{props.pricetitleCard1}</p>
                        <Link to="/product/1" className="btn">{props.sell}</Link>
                    </div>
                    <div className="card">
                        <img src={require('../img/proccessor.jpeg')} alt="Proccessor" />
                        <h3>{props.titleCard2}</h3>
                        <p>{props.subtitletitleCard2}</p>
                        <p className="price">{props.pricetitleCard2}</p>
                        <Link to="/product/2" className="btn">{props.sell}</Link>
                    </div>
                    <div className="card">
                        <img src={require('../img/ozu.jpeg')} alt="Memory" />
                        <h3>{props.titleCard3}</h3>
                        <p>{props.subtitletitleCard3}</p>
                        <p className="price">{props.pricetitleCard3}</p>
                        <Link to="/product/3" className="btn">Купить сейчас</Link>
                    </div>
                </Slider>
            </div>
            <div className="about-us">
                <div className="about-content">
                    <h2>{props.titleAboutUs}</h2>
                    <p>{props.subtitletitleAboutUs1}</p>
                    <p>{props.subtitletitleAboutUs2}</p>
                    <p>{props.subtitletitleAboutUs3}</p>
                </div>
            </div>
            <div className="news">
                <div className="news-content">
                    <h2>{props.titleNews}</h2>
                    <p className="description">{props.subtitleNews}</p>
                    <Slider {...settings}>
                        <div className="card">
                            <img src={require('../img/videocard.jpeg')} alt="Videocard" />
                            <h3>{props.titleCard1}</h3>
                            <p>{props.subtitletitleCard1}</p>
                            <p className="price">{props.pricetitleCard1}</p>
                            <Link to="/product/1" className="btn">{props.check}</Link>
                        </div>
                        <div className="card">
                            <img src={require('../img/proccessor.jpeg')} alt="Proccessor" />
                            <h3>{props.titleCard2}</h3>
                            <p>{props.subtitletitleCard2}</p>
                            <p className="price">{props.pricetitleCard2}</p>
                            <Link to="/product/2" className="btn">{props.check}</Link>
                        </div>
                        <div className="card">
                            <img src={require('../img/ozu.jpeg')} alt="Memory" />
                            <h3>{props.titleCard3}</h3>
                            <p>{props.subtitletitleCard3}</p>
                            <p className="price">{props.pricetitleCard3}</p>
                            <Link to="/product/3" className="btn">{props.check}</Link>
                        </div>
                    </Slider>
                </div>
            </div>
        </main>
    );
}
