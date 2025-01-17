import React, { useState } from 'react';
import './SalesPage.css';
import { Link } from 'react-router-dom';
import { Link as ScrollLink, Element } from 'react-scroll';

const product = [
  { id: 1, left: '100개 남음', price: 670000, description: '한국형으로 제작된 폭포수 싱크볼 풀세트', description2: '자가설치 기준이며 설치 요청 시 현장 결제 165,000원 있습니다. (카드 결제 가능) 주문 시 전화 상담 후 사이즈 확인', shippingCost: 'free', limit: '250개', shippingDate: '2024년 8월 말 (21~말일) 예정' },
  
];

const SalesPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [setAchievedAmount] = useState(0); // 달성 금액 상태

  // 리워드 선택 처리 함수
  const handleSelectProduct = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(product)
        ? prevSelectedProducts.filter(p => p !== product)
        : [...prevSelectedProducts, product]
    );
  };

  // 펀딩하기 버튼 클릭 시 처리 함수
  const handleFunding = () => {
    const totalAmount = selectedProducts.reduce((sum, product) => sum + product.price, 0);
    setAchievedAmount(prevAmount => prevAmount + totalAmount); // 달성 금액 업데이트
    setSelectedProducts([]); // 선택된 리워드 초기화
  };

  // 좋아요 버튼 클릭 시 처리 함수
  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };

  // 공유 팝업 토글 함수
  const handlePopupToggle = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  // 소셜 공유 처리 함수
  const handleSocialShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('공유');
    let shareUrl;

    switch (platform) {
      case 'kakao':
        shareUrl = `https://www.kakaocorp.com/page/service/service/KakaoTalk=${url}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${text}&body=${window.location.href}`;
        break;
      case 'clipboard':
        navigator.clipboard.writeText(window.location.href)
          .then(() => alert('링크가 클립보드에 복사되었습니다!'))
          .catch((error) => console.error('복사 실패', error));
        return;
      default:
        return;
    }
    if (platform !== 'clipboard') {
      window.open(shareUrl, '_blank');
    }
  };

  // 이메일 공유 처리 함수
  const handleEmailShare = () => {
    const subject = encodeURIComponent('공유');
    const body = encodeURIComponent(`이 멋진 리워드를 발견했습니다. 공유해보세요! ${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className='F_container'>
      <div className="F_content">
        <div className="F_category-tabs-container">
          <div className="F_category-tabs">
            <ul>
              <li className="F_active"><Link to="/" className="F_tab-link">프로젝트 계획</Link></li>
              <li><Link to="/updates" className="F_tab-link">업데이트</Link></li>
              <li><Link to="/comments2" className="F_tab-link">커뮤니티</Link></li>
              <li><Link to="/reviews2" className="F_tab-link">후기</Link></li>
            </ul>
          </div>
        </div>
        <div className="F_category-tabs-container2">
          <div className="F_category-tabs2">
            <ul>
              <li className="F_active"><ScrollLink to="section1" className="F_tab-link2" smooth duration={800}>소개1</ScrollLink></li>
              <li><ScrollLink to="section2" className="F_tab-link2" smooth duration={800}>소개2</ScrollLink></li>
              <li><ScrollLink to="section3" className="F_tab-link2" smooth duration={800}>소개3</ScrollLink></li>
              {/* <li><ScrollLink to="section4" className="F_tab-link2" smooth duration={800}>소개4</ScrollLink></li> */}
            </ul>
          </div>
        </div>
        <Element name="section1">
          <h2>소개1</h2>
          <img src="/images/Fsink1.jpg" alt="싱크볼메인1" />
          <img src="/images/Fsink2.jpg" alt="싱크볼메인2" />
          <img src="/images/Fsink3.jpg" alt="싱크볼메인3" />
        </Element>
        <Element name="section2">
          <h2>소개2</h2>
          <img src="/images/Fsink4.jpg" alt="싱크볼메인4" />
          <img src="/images/Fsink5.gif" alt="싱크볼메인5" />
          <img src="/images/Fsink6.gif" alt="싱크볼메인6" />
          <img src="/images/Fsink7.jpg" alt="싱크볼메인7" />
        </Element>
        <Element name="section3">
          <h2>소개3</h2>
          <img src="/images/Fsink8.jpg" alt="싱크볼메인8" />
          <img src="/images/Fsink9.jpg" alt="싱크볼메인9" />
          <img src="/images/Fsink10.jpg" alt="싱크볼메인10" />
        </Element>
      </div>
      
      {/* 오른쪽 리워드 선택 영역 */}
      <div className='F_payment'>
        <h2>리워드 선택</h2>
        <div className='F_reward-list'>
          <ul className='F_selectfunding'>
            {product.map((item) => (
              <li key={item.id} className={`product-item ${selectedProducts.includes(item) ? 'selected' : ''}`} onClick={() => handleSelectProduct(item)}>
                <div className="F_reward-info">
                  <p>{item.left}</p>
                  <h3>{item.price.toLocaleString()} 원</h3> {/* 가격을 숫자로 표시 */}
                  <p>{item.description}</p>
                  <p>{item.description2}</p>
                  <div className="F_additional-info">
                    <p>배송비: {item.shippingCost}</p>
                    <p>발송 시작일: {item.shippingDate}</p>
                    <p>제한 수량: {item.limit}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {selectedProducts.length > 0 && (
          <div className='F_selected-products'>
            <h2>선택한 리워드</h2>
            {selectedProducts.map((item) => (
              <div key={item.id} className="F_selected-product">
                <div className="F_reward-info">
                  <h3>{item.price.toLocaleString()} 원</h3>
                  <p>{item.description}</p>
                  <p>{item.description2}</p>
                  <div className="F_additional-info">
                    <p>배송비: {item.shippingCost}</p>
                    <p>제한 수량: {item.limit}</p>
                    <p>발송 시작일: {item.shippingDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 하단 고정 버튼 영역 */}
        <div className="F_action-buttons">
          <div className="F_interaction-buttons">
            <button className="F_like-button" onClick={handleLikeClick}>
              <img src="/images/하트.png" alt="F_Heart Icon" /> {likeCount}
            </button>
            <button className="F_share-button" onClick={handlePopupToggle}>
              <img src="/images/공유.png" alt="F_Share Icon" /> 공유하기
            </button>
          </div>
          <Link to = "/login" className="F_funding-button">펀딩하기</Link>
        </div>

        {isPopupVisible && (
          <div className="F_share-popup">
            <button className='F_kakao' onClick={() => handleSocialShare('kakao')}>
              <img  src='/images/카카오톡.png' alt="카카오톡 아이콘"/>카카오톡으로 공유하기</button>
            <button className='F_email' onClick={handleEmailShare}><img src='/images/링크보드.png'  alt="이메일 아이콘" />이메일로 공유하기</button>
            <button className='F_link' onClick={() => handleSocialShare('clipboard')}><img src='/images/이메일.png' alt="클립보드 아이콘" />링크 보드에 복사하기</button>
            <button onClick={handlePopupToggle}>닫기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalesPage;
