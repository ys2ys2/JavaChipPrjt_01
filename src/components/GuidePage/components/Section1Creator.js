import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import BackgroundImage from '../images/Section1Creator/Creator.png';

const Section1Creator = ({ title = "창작을 시작해볼까요?", fullpageApi }) => {
  const [animateMainText, setAnimateMainText] = useState(false);
  const [animateSubText, setAnimateSubText] = useState(false);

  useEffect(() => {
    setAnimateMainText(true);
    setTimeout(() => {
      setAnimateSubText(true);
    }, 1500); // 메인 텍스트가 1.5초 동안 페이드인된 후 서브 텍스트 애니메이션 시작
  }, []);

  useEffect(() => {
    const handleSlideLeave = () => {
      setAnimateMainText(false);
      setAnimateSubText(false);
    };

    const handleSlideEnter = () => {
      setAnimateMainText(true);
      setTimeout(() => {
        setAnimateSubText(true);
      }, 1500);
    };

    if (fullpageApi) {
      fullpageApi.on('leave', handleSlideLeave);
      fullpageApi.on('afterLoad', (origin, destination) => {
        if (destination.index === 0) { // 섹션 1로 돌아왔을 때만 트리거
          handleSlideEnter();
        }
      });
    }

    return () => {
      if (fullpageApi) {
        fullpageApi.off('leave', handleSlideLeave);
        fullpageApi.off('afterLoad', handleSlideEnter);
      }
    };
  }, [fullpageApi]);

  return (
    <OuterContainer>
      <SectionContainer>
        <BackgroundImageContainer />
        <ContentContainer>
          <MainText animate={animateMainText}>펀딩할래!</MainText>
          <SubText animate={animateSubText}>창작자를 위한 길잡이</SubText>
        </ContentContainer>
      </SectionContainer>
    </OuterContainer>
  );
};

export default Section1Creator;

const OuterContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
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
  overflow: hidden;
`;

// 배경 이미지 컨테이너 추가
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
  opacity: 0.;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 70px;
`;

const MainText = styled.h1`
  font-size: 55px;
  font-weight: 800;
  margin-bottom: 70px;
  color: #000000;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${fadeIn} 1.5s ease-in-out, ${bounce} 2s infinite;
    `}
  opacity: ${({ animate }) => (animate ? 1 : 0)};
`;

const SubText = styled.p`
  font-size: 30px;
  color: #000000;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${fadeIn} 1.5s ease-in-out 1.5s forwards, ${bounce} 2s  infinite;
    `}
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transition: opacity 1.5s ease-in-out; /* 서브 텍스트의 페이드인 효과 */
`;
