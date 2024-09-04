import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import project1 from '../images/Section5Creator/conan.jpg';
import project2 from '../images/Section5Creator/sink.jpg';
import project3 from '../images/Section5Creator/CD.jpg';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가

const Section5Creator = ({ title, subtitle, projects, titleColor = '#FFFFFF', subtitleColor = '#FFFFFF' }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleStartButtonClick = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  const settings = {
    dots: false, // 슬라이드 아래 점(dot) 네비게이션 비활성화
    infinite: true, // 슬라이드를 무한 반복되도록 설정
    speed: 500, // 슬라이드 전환 속도 (밀리초 단위)
    slidesToShow: 3, // 한 화면에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한번에 넘길 슬라이드 개수
    autoplay: true, // 자동 슬라이드 설정
    autoplaySpeed: 1500, // 자동 슬라이드 전환 간격 (밀리초 단위)
    responsive: [
      {
        breakpoint: 1024, // 화면의 너비가 1024px 이하일 때
        settings: {
          slidesToShow: 2, // 한 화면에 보여줄 슬라이드 개수를 2개로 조정
        },
      },
      {
        breakpoint: 768, // 화면의 너비가 768px 이하일 때
        settings: {
          slidesToShow: 1, // 한 화면에 보여줄 슬라이드 개수를 1개로 조정
        },
      },
    ],
  };

  return (
    <SectionContainer>
      <ContentContainer>
        <TextContainer>
          <MainText $titleColor={titleColor}>{title}</MainText>
          <SubText $subtitleColor={subtitleColor}>{subtitle}</SubText>
        </TextContainer>
        <SliderContainer>
          <StyledSlider {...settings}>
            <ProjectCard>
              <Link to="/funding"> <ProjectImage src={project1} alt="Project 1" /></Link>
              <ProjectTitle>[명탐정코난] 연재 '30주년' 공식<br/>
              스페셜 굿즈!</ProjectTitle>
              <ProjectStatus>1939% 달성</ProjectStatus>
            </ProjectCard>
            <ProjectCard>
            <Link to="/funding2"> <ProjectImage src={project2} alt="Project 2" /></Link>
              <ProjectTitle>한국형 폭포수 싱크볼 풀세트</ProjectTitle>
              <ProjectStatus>1366% 달성</ProjectStatus>
            </ProjectCard>
            <ProjectCard>
            <Link to="/funding3"><ProjectImage src={project3} alt="Project 3" /></Link>
              <ProjectTitle>
                레트로 감성, 디자인을 다 가지고 있는 <br/>
                무선 스피커

              </ProjectTitle>
              <ProjectStatus>2006% 달성</ProjectStatus>
            </ProjectCard>
          </StyledSlider>
        </SliderContainer>
        <StartButton onClick={handleStartButtonClick}>펀딩할래! 시작하기</StartButton> {/* 버튼 클릭 시 메인 페이지로 이동 */}
      </ContentContainer>
    </SectionContainer>
  );
};

export default Section5Creator;

// 스타일 정의
const SectionContainer = styled.div`
  width: 100%;
  padding: 118px 20px;
  box-sizing: border-box;
  background-color: #f0f0f0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const MainText = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000000;
`;

const SubText = styled.p`
  font-size: 20px;
  color: #000000;
`;

const SliderContainer = styled.div`
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 15px;
    box-sizing: border-box;
  }
  .slick-list {
    margin: 0 -15px;
  }
`;

const ProjectCard = styled.div`
  background-color: #; // 프로젝트 카드 배경색 제거
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s;
  line-height: 25px;
  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const ProjectTitle = styled.h3`
  font-size: 18px;
  color: #000000;
  margin: 10px auto; // 텍스트를 가운데로 정렬
  text-align: center; 
`;

const ProjectStatus = styled.p`
  font-size: 16px;
  color: #F2620F;
  font-weight: bold;
  margin: 0 auto; // 텍스트를 가운데로 정렬
  text-align: center; 
`;


const StartButton = styled.button`
  padding: 15px 30px;
  margin-top: 30px;
  background-color: #F2620F;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #D4510D;
  }
`;