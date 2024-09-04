import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import BackgroundImage from '../images/Section3Creator/Background.png'; // 배경 이미지 경로를 올바르게 지정

const Section3Creator = ({ navItems, mainText, subText, fullpageApi }) => {
  useEffect(() => {
    // 애니메이션 트리거를 위해 사용
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
  }, []);

  return (
    <OuterContainer>
      <SectionContainer>
        <BackgroundImageContainer />
        <ContentContainer>
          <TextContainer>
            <MainText id="main-text">창작자</MainText>
            <SubText id="sub-text">
              <strong>펀딩할래!에서는 <br/>
              도전하는 사람들의 이야기에<br/>
              귀를 기울입니다.
              펀딩할래에서는<br/>
              후원을 통해 예산 문제를 해결할 수 있어<br/>
              독립적인 프로젝트를 진행할 수 있고,<br/>
              후원자를 통하여 커뮤니티를<br/> 
              키워나갈 수 있어
              지속 가능한 발판이 됩니다.</strong>
            </SubText>
          </TextContainer>
        </ContentContainer>
      </SectionContainer>
    </OuterContainer>
  );
};

export default Section3Creator;

// Styled-components로 애니메이션 설정

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
  background-color: #f0f0f0;
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
  padding: 40px 20px;
  z-index: 1; /* 텍스트가 배경 이미지 위에 표시되도록 설정 */
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  margin-left: 40px;
`;

const MainText = styled.h1`
  font-size: 34px;
  font-weight: 1000;
  margin-bottom: 10px;
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
