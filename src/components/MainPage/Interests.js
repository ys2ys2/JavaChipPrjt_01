import React, { useEffect } from 'react';
import './Main.css';  // Main.css 파일을 임포트합니다.
import interestsimage1 from './interests/interestsimage1.jpg';
import interestsimage2 from './interests/interestsimage2.jpg';
import interestsimage3 from './interests/interestsimage3.jpg';
import interestsimage4 from './interests/interestsimage4.jpg';

function Interests() {
  useEffect(() => {
    // 스크롤 이벤트가 발생할 때 실행될 핸들러 함수
    const handleScroll = () => {
      const images = document.querySelectorAll('.image-item12');
      const texts = document.querySelectorAll('.main-title, .sub-title');

        // 이미지 항목에 대해 스크롤 위치에 따른 애니메이션 클래스 추가/제거
        images.forEach((image) => {
          const rect = image.getBoundingClientRect();

          // 스크롤 범위에 이미지가 들어왔을 때만 애니메이션 실행
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
            image.classList.add('fade-in');  // 페이드인 애니메이션 추가
            image.classList.remove('fade-out');  // 페이드아웃 클래스 제거
          } else {
            image.classList.add('fade-out');  // 스크롤을 지나가면 페이드아웃 애니메이션 실행
            image.classList.remove('fade-in');  // 페이드인 클래스 제거
          }
        });

      // 텍스트 항목에 대해 스크롤 위치에 따른 애니메이션 클래스 추가/제거
      texts.forEach((text) => {
        const rect = text.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          text.classList.add('text-visible');  // 애니메이션을 트리거하는 클래스 추가
        } else {
          text.classList.remove('text-visible');  // 애니메이션 초기화를 위해 클래스 제거
        }
      });
    };

    window.addEventListener('scroll', handleScroll);  // 스크롤 이벤트 리스너 추가
    handleScroll();  // 컴포넌트가 마운트될 때 스크롤 핸들러를 실행해 가시성 확인
    return () => window.removeEventListener('scroll', handleScroll);  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  }, []);

  return (
    <div className="interests-container">
      {/* 제목 및 설명 */}
      <h1 className="main-title">오늘의 당신의 관심사는?</h1>
      <p className="sub-title">후원자들의 취향이 궁금했다면 주목!</p>
      <p className="sub-title">모두의 시선을 사로잡는 프로젝트!</p>

      {/* 이미지 목록 */}
      <div className="image-row1">
        <div className="image-item">
          <img src={interestsimage1} alt="interest1" className="interest-image" />
          <p className="image-caption12">[단독혜택] 꾸버스의 역작 세상에 
          없던 화로대, 하나로 두가지 감성을!</p>
        </div>
        <div className="image-item">
          <img src={interestsimage2} alt="interest2" className="interest-image" />
          <p className="image-caption12">[아기 있는 집 디퓨저 몽키버니] 
          인공향료 0ml, 에센셜 오일 100%</p>
        </div>
        <div className="image-item">
          <img src={interestsimage3} alt="interest3" className="interest-image" />
          <p className="image-caption12">[5분간편설치] 반려견의 안전을
          지켜드립니다, 페스비 안전문</p>
        </div>
        <div className="image-item">
          <img src={interestsimage4} alt="interest4" className="interest-image" />
          <p className="image-caption12">[펀딩할래 첫공개] 이건 어디서 살 수 있어요?
          백번 물어본 플레이트 세트</p>
        </div>
      </div>
    </div>
  );
}

export default Interests;