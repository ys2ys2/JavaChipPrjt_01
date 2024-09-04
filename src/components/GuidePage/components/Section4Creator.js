import React from 'react';
import styled, { keyframes } from 'styled-components';
import BackgroundImage from '../images/Section4Creator/Background.png'; // 배경 이미지 경로를 올바르게 지정

const Section4Creator = ({ navItems, mainText, subText, fullpageApi }) => {
  const handleClick = (sectionNumber) => {
    if (fullpageApi && typeof fullpageApi.moveTo === 'function') {
      fullpageApi.moveTo(sectionNumber);
    } else {
      console.error("fullpageApi is not defined or moveTo is not a function.");
    }
  };

  return (
    <OuterContainer>
      <SectionContainer>
        <BackgroundImageContainer />
        <ContentContainer>
          <TextContainer>
            <MainText>펀딩 가이드</MainText>
            <SubText>
              <strong>모든게 처음이어도 괜찮습니다.</strong> 
              <br /><br />
              <strong>펀딩할래가 익숙하지 않고 제작 경험이 적어도</strong>
              <br /><br />
              <strong>아래 준비된 가이드를 통해 구체적으로 펀딩을<br /><br />
              준비할 수 있습니다.</strong>
            </SubText>
          </TextContainer>
        </ContentContainer>
      </SectionContainer>
    </OuterContainer>
  );
};

export default Section4Creator;

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
  width: 100%;
  margin-left: 60px;
`;

const MainText = styled.h1`
  font-size: 34px;
  color: #000000;
  font-weight: 1000;
  margin-bottom: 30px;
  margin-left: 40px;
  text-align: left;
  animation: ${fadeIn} 1s ease-in-out;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #8C8C8C;
  line-height: 1.5;
  margin-left: 40px;
  text-align: left;
  width: 100%;
  animation: ${fadeIn} 2s ease-in-out;
`;
