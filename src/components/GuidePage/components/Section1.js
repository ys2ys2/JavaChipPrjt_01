import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 사용하여 페이지 이동
import GUIDEImage from '../images/Section1/GUIDE.png';  // 배경 이미지

const Section1 = ({ fullpageApi }) => {
  const navigate = useNavigate();

  const handleMainPageClick = () => {
    navigate('/');  // 메인 페이지로 이동
  };

  const handleLearnMoreClick = () => {
    if (fullpageApi && typeof fullpageApi.moveTo === 'function') {
      fullpageApi.moveTo(2);  // 섹션 2로 이동
    }
  };

  return (
    <OuterContainer>
      <SectionContainer>
        <ContentContainer>
          <TextContainer>
            <MainText>'펀딩할래!' 는 <br /></MainText>
            <SubText>새로운 프로젝트를 발견하고<br /> 
            일정금액을 후원하면 특별한 선물을 받는 곳이죠.</SubText>
          </TextContainer>
          <ImageContainer>
            {/* <StyledImage src={BookImage} alt="설명 이미지" /> */}
          </ImageContainer>
          <ButtonContainer>
            <StartButton onClick={handleMainPageClick}>환영합니다</StartButton>
          </ButtonContainer>
          <LearnMore onClick={handleLearnMoreClick}>더 자세히 알아볼까요?</LearnMore>
        </ContentContainer>
      </SectionContainer>
    </OuterContainer>
  );
};

export default Section1;

const OuterContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* 큰 회색 배경 */
  overflow: hidden; /* 추가: 내부 콘텐츠가 넘치지 않도록 설정 */
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100%;  /* SectionContainer가 부모의 높이를 채우도록 설정 */
  background-color: #fff; /* 흰색 박스 */
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${GUIDEImage}); /* 배경 이미지 추가 */
  background-size: cover; /* 배경 이미지가 컨테이너에 맞게 조정됨 */
  background-position: center; /* 배경 이미지가 가운데 정렬 */
  background-repeat: no-repeat; /* 배경 이미지 반복 방지 */
  overflow: hidden; /* 추가: 내부 콘텐츠가 넘치지 않도록 설정 */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TextContainer = styled.div`
  margin-bottom: 20px;
  line-height: 40px;
`;

const MainText = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #000000;
  margin-top: 60px;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #666;
`;

const ImageContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #F2620F;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 100px;
`;

const LearnMore = styled.p`
  font-size: 14px;
  color: #888;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;
`;