import React, { useState } from 'react';
import './Main.css'; // CSS 파일을 임포트합니다.
import fashion from './Image_icon/fashion.png';
import beauty from './Image_icon/beauty.png';
import food from './Image_icon/food.png';
import sport from './Image_icon/sport.png';
import book from './Image_icon/book.png';
import Child from './Image_icon/Child.png';
import Furniture from './Image_icon/Furniture.png';
import Traveling from './Image_icon/Traveling.png';
import Pets from './Image_icon/Pets.png';
import coupon from './Image_icon/coupon.png';
import game from './Image_icon/game.png';

function Imageicon() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const icons = [
        { src: fashion, label: '패션', handleClick: () => alert('패션 버튼 클릭됨') },
        { src: beauty, label: '뷰티', handleClick: () => alert('뷰티 버튼 클릭됨') },
        { src: food, label: '푸드', handleClick: () => alert('푸드 버튼 클릭됨') },
        { src: Furniture, label: '홈ㆍ리빙', handleClick: () => alert('홈ㆍ리빙 버튼 클릭됨') },
        { src: Traveling, label: '여행', handleClick: () => alert('여행 버튼 클릭됨') },
        { src: book, label: '도서', handleClick: () => alert('도서 버튼 클릭됨') },
        { src: sport, label: '스포츠', handleClick: () => alert('스포츠 버튼 클릭됨') },
        { src: Child, label: '키즈', handleClick: () => alert('키즈 버튼 클릭됨') },
        { src: Pets, label: '반려동물', handleClick: () => alert('반려동물 버튼 클릭됨') },
        { src: game, label: '게임', handleClick: () => alert('게임 버튼 클릭됨') },
        { src: coupon, label: '쿠폰', handleClick: () => alert('쿠폰 버튼 클릭됨') },
    ];

    const visibleIcons = 8; // 한 번에 보일 아이콘 수
  

    const scrollLeft = () => {
        // 앞쪽으로 이동
        setCurrentIndex((prevIndex) => 
            prevIndex > 0 ? prevIndex - 1 : icons.length - visibleIcons
        );
    };

    const scrollRight = () => {
        // 뒤쪽으로 이동
        setCurrentIndex((prevIndex) => 
            prevIndex < icons.length - visibleIcons ? prevIndex + 1 : 0
        );
    };

    return (
        <div className="icon-slider-wrapper">
            <button className="icon-arrow icon-arrow-left" onClick={scrollLeft}>
                &#8249; {/* 왼쪽 화살표 아이콘 */}
            </button>
            <div className="icon-container">
                {icons.slice(currentIndex, currentIndex + visibleIcons).map((icon, index) => (
                    <div className="icon-item" key={index}>
                        <img src={icon.src}
                        alt={icon.label}
                        className="icon-image" />
                        <button className="icon-button" onClick={icon.handleClick}>
                            {icon.label}
                        </button>
                    </div>
                ))}
            </div>
            <button className="icon-arrow icon-arrow-right" onClick={scrollRight}>
                &#8250; {/* 오른쪽 화살표 아이콘 */}
            </button>
        </div>
    );
}

export default Imageicon;