import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';  // 페이지 이동을 위한 훅 추가
import Image1 from '../images/Section5/Image1.png';
import Image2 from '../images/Section5/Image2.png';
import Image3 from '../images/Section5/Image3.png';
import Image4 from '../images/Section5/Image4.png';
import Image5 from '../images/Section5/Image5.png';
import Image6 from '../images/Section5/Image6.png';
import Image7 from '../images/Section5/Image7.png';
import Image8 from '../images/Section5/Image8.png';
import Image9 from '../images/Section5/Image9.png';
import Image10 from '../images/Section5/Image10.png';
import Image11 from '../images/Section5/Image11.png';
import Image12 from '../images/Section5/Image12.png';
import Image13 from '../images/Section5/Image13.png';
import Image14 from '../images/Section5/Image14.png';
import Image15 from '../images/Section5/Image15.png';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Section5 = () => {
  const navigate = useNavigate();  // useNavigate 훅 사용

  const handleButtonClick = () => {
    navigate('/'); // 루트 경로로 이동 (메인 페이지로 이동)
  };

  const images = [
    [Image1, Image2, Image3],
    [Image4, Image5, Image6],
    [Image7, Image8, Image9],
    [Image10, Image11, Image12],
    [Image13, Image14, Image15],
  ];

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
  };

  return (
    <OuterContainer>
      <SectionContainer>
        <ContentContainer>
          <TextContainer>
            <MainText>이제 시작할까요?</MainText>
            <SubText>당신의 마음을 움직일 프로젝트를 찾아보세요.</SubText>
          </TextContainer>
          <SliderContainer>
            <StyledSlider {...settings}>
              {images.map((group, index) => (
                <Slide key={index}>
                  {group.map((image, idx) => (
                    <GridItem key={idx}>
                      <StyledImage src={image} alt={`Image ${index * 3 + idx + 1}`} />
                    </GridItem>
                  ))}
                </Slide>
              ))}
            </StyledSlider>
          </SliderContainer>
          <StartButton onClick={handleButtonClick}>펀딩할래! 시작하기</StartButton>
        </ContentContainer>
      </SectionContainer>
    </OuterContainer>
  );
};

export default Section5;

// 나머지 styled-components 코드 생략


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
  align-items: center; /* 요소들을 수평 중앙에 정렬 */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 요소들을 수평 중앙에 정렬 */
  justify-content: center;
  width: 100%;
  padding: 40px 20px;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const MainText = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #555;
`;

const SliderContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 10px;
    box-sizing: border-box;
  }
  .slick-list {
    overflow: hidden;
  }
`;

const Slide = styled.div`
  display: grid; // 이 요소를 CSS Grid 레이아웃으로 설정하여 자식 요소들을 그리드 형태로 배치함
  grid-template-columns: repeat(3, 1fr); // 그리드의 열을 3개로 설정하고, 각 열의 너비를 동일하게 1fr(각각의 비율)로 지정함
  grid-template-rows: repeat(3, 1fr); // 그리드의 행을 3개로 설정하고, 각 행의 높이를 동일하게 1fr로 지정함
  grid-gap: 20px; // 그리드 항목들 사이에 20px의 간격을 줌
  justify-items: center; // 그리드 안의 각 항목들을 수평 중앙에 정렬함
`;

const GridItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* 첫 번째 행 */
  &:nth-child(1) {
    margin-right: 10px;  /* 오른쪽 간격 */
    margin-bottom: 10px; /* 아래쪽 간격 */
    margin-left: 10px;   /* 왼쪽 간격 */
  }

  &:nth-child(2) {
    margin-right: 10px;  /* 오른쪽 간격 */
    margin-bottom: 10px; /* 아래쪽 간격 */
  }

  &:nth-child(3) {
    margin-bottom: 10px; /* 아래쪽 간격 */
    margin-left: 10px;   /* 왼쪽 간격 */
  }

  /* 두 번째 행 */
  &:nth-child(4) {
    margin-right: 10px;  /* 오른쪽 간격 */
    margin-bottom: 15px; /* 아래쪽 간격 */
    margin-left: 10px;   /* 왼쪽 간격 */
  }

  &:nth-child(5) {
    margin-right: 10px;  /* 오른쪽 간격 */
    margin-bottom: 15px; /* 아래쪽 간격 */
  }

  &:nth-child(6) {
    margin-bottom: 15px; /* 아래쪽 간격 */
    margin-left: 10px;   /* 왼쪽 간격 */
  }

  /* 세 번째 행 */
  &:nth-child(7) {
    margin-right: 10px;  /* 오른쪽 간격 */
    margin-bottom: 20px; /* 아래쪽 간격 */
    margin-left: 10px;   /* 왼쪽 간격 */
  }

  &:nth-child(8) {
    margin-right: 10px;  /* 오른쪽 간격 */
    margin-bottom: 20px; /* 아래쪽 간격 */
  }

  &:nth-child(9) {
    margin-bottom: 20px; /* 아래쪽 간격 */
    margin-left: 10px;   /* 왼쪽 간격 */
  }

  /* 네 번째 행 */
  &:nth-child(10) {
    margin-right: 10px;  /* 오른쪽 간격 */
    margin-bottom: 25px; /* 아래쪽 간격 */
    margin-left: 10px;   /* 왼쪽 간격 */
  }

  &:nth-child(11) {
    margin-right: 10px;  /* 오른쪽 간격 */
    margin-bottom: 25px; /* 아래쪽 간격 */
  }

  &:nth-child(12) {
    margin-bottom: 25px; /* 아래쪽 간격 */
    margin-left: 10px;   /* 왼쪽 간격 */
  }

  /* 다섯 번째 행 */
  &:nth-child(13) {
    margin-right: 10px;  /* 오른쪽 간격 */
    margin-left: 10px;   /* 왼쪽 간격 */
  }

  &:nth-child(14) {
    margin-right: 10px;  /* 오른쪽 간격 */
  }

  &:nth-child(15) {
    margin-left: 10px;   /* 왼쪽 간격 */
  }
`;



const StyledImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;  /* 모든 이미지를 동일한 크기로 맞추기 위해 사용 */
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StartButton = styled.button`
  width: 300px;
  max-width: 400px;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #F2620F;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
`;