import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BackgroundImage from '../images/Section2Creator/Background.png';

const Section2Creator = ({ navItems, mainText, subText, fullpageApi }) => {
  useEffect(() => {
    const animateText = () => {
      const mainTextElement = document.querySelector('#main-text');
      const subTextElement = document.querySelector('#sub-text');

      // 애니메이션 초기화
      mainTextElement.style.opacity = '0';
      subTextElement.style.opacity = '0';

      // 애니메이션 시작
      setTimeout(() => {
        mainTextElement.style.opacity = '1';
        mainTextElement.style.transition = 'opacity 1s ease-in-out';
        subTextElement.style.opacity = '1';
        subTextElement.style.transition = 'opacity 2s ease-in-out';
      }, 100); // 약간의 딜레이 후 애니메이션 시작
    };

    // 페이지 로드 시 애니메이션 적용
    animateText();

    // fullpage.js의 onLeave 이벤트 리스너 등록
    if (fullpageApi && fullpageApi.onLeave) {
      fullpageApi.onLeave((origin, destination, direction) => {
        if (destination.index === 0) {
          // 섹션 1로 돌아올 때 애니메이션 재적용
          setTimeout(() => animateText(), 500);
        }
      });
    }
  }, [fullpageApi]);

  return (
    <OuterContainer>
      <SectionContainer>
        <BackgroundImageContainer />
        <ContentContainer>
          <TextAndIconContainer>
            <TextContainer>
              <MainText id="main-text">크라우드 펀딩</MainText>
              <SubText id="sub-text">
                <strong>
                  크라우드펀딩은 아이디어는 있지만<br/>
                  자금이 부족한 개인이나 단체가<br/>
                  다수의 사람들로부터<br/>
                  자금을 모으는 방식입니다.
                </strong>
              </SubText>
            </TextContainer>
          </TextAndIconContainer>
        </ContentContainer>
      </SectionContainer>
    </OuterContainer>
  );
};

export default Section2Creator;

// Styled-components

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const OuterContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* 큰 회색 배경 */
  position: relative;
  overflow: hidden;
`;

const SectionContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: #F2ECD8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 콘텐츠가 컨테이너를 넘지 않도록 설정 */
`;

const BackgroundImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0; /* ContentContainer의 패딩을 제거 */
  margin-bottom: 10px;
  z-index: 1; /* 텍스트가 배경 이미지 위에 표시되도록 설정 */
`;

const TextAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  text-align: left;
  margin-bottom: 10px;
  margin-left: 0px;
`;

const MainText = styled.h1`
  font-size: 34px;
  font-weight: 1000;
  margin-bottom: 10px; /* 간격 줄이기 */
  color: #000000;
  text-align: left;
  animation: ${fadeIn} 1s ease-in-out;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #8C8C8C;
  text-align: left;
  line-height: 2.5;
  animation: ${fadeIn} 2s ease-in-out;
`;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;
`;
