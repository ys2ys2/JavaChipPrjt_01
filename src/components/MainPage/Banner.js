import React from 'react';
import Slider from "react-slick";
import Banner1 from './images/Banner1.jpg';
import Banner2 from './images/Banner2.jpg';
import Banner3 from './images/Banner3.jpg';
import Banner4 from './images/Banner4.jpg';
import Banner5 from './images/Banner5.jpg';
import Banner6 from './images/Banner6.jpg';
import './Main.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const Banner = () => {
    const images = [
        { src: Banner1, alt: '이미지 1', link: 'https://example.com/page1' },
        { src: Banner2, alt: '이미지 2', link: 'https://example.com/page2' },
        { src: Banner3, alt: '이미지 3', link: 'https://example.com/page3' },
        { src: Banner4, alt: '이미지 4', link: 'https://example.com/page4' },
        { src: Banner5, alt: '이미지 5', link: 'https://example.com/page5' },
        { src: Banner6, alt: '이미지 6', link: 'https://example.com/page6' },
    ];

    const settings = {
        dots: true,  // 하단 도트 표시
        arrows: true,  // 양옆 화살표 표시
        infinite: true,  // 무한 루프
        slidesToShow: 1,  // 한 번에 보여줄 슬라이드 수
        slidesToScroll: 1,  // 한 번에 스크롤할 슬라이드 수
        autoplay: true,  // 자동 재생
        autoplaySpeed: 3000,  // 자동 재생 속도
        centerMode: true,  // 중앙 슬라이드 강조
        centerPadding: '0px',  // 중앙 슬라이드 패딩 제거
        swipeToSlide: true,  // 스와이프 이동 가능
    };

    return (
            
        <div className="slideshow-container">
             <Slider {...settings}>
                {images.map((img, index) => (
                    <div key={index} className="slide">
                        <a href={img.link} target="_blank" rel="noopener noreferrer">
                            <img src={img.src} alt={img.alt} className="center-image" />
                        </a>
                    </div>
                ))}
            </Slider>
    </div>
    );
};

export default Banner;

