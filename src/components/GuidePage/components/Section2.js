import React from 'react';
import styled from 'styled-components';
import Image1 from '../images/Section2/Image1.png';
import Image2 from '../images/Section2/Image2.png';
import Image3 from '../images/Section2/Image3.png';

const Section2 = ({ fullpageApi }) => {
  return (
    <OuterContainer>
      <SectionContainer>
        <NavBar>
          <NavItem onClick={() => fullpageApi.moveTo(2)} active={true}>프로젝트</NavItem> {/* 섹션 2로 이동 */}
          <NavItem onClick={() => fullpageApi.moveTo(3)}>후원</NavItem> {/* 섹션 3으로 이동 */}
          <NavItem onClick={() => fullpageApi.moveTo(4)}>선물</NavItem> {/* 섹션 4로 이동 */}
        </NavBar>
        <ContentContainer>
          <TextContainer>
            <MainText><p>프로젝트는 <br/>
                      새로운 제품이나 <br/>
                      콘텐츠의 기획안입니다.</p></MainText>
            <SubText>도서, 게임, 영화, 향수 등 다양한 프로젝트 중에서 당신만의 취향을 골라보세요.</SubText>
          </TextContainer>
          <ImageContainer>
            <StyledImage src={Image1} alt="Image 1" />
            <StyledImage src={Image2} alt="Image 2" />
            <StyledImage src={Image3} alt="Image 3" />
          </ImageContainer>
        </ContentContainer>
      </SectionContainer>
    </OuterContainer>
  );
};

export default Section2;

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
`;

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const NavItem = styled.div`
  font-size: 16px;
  color: ${({ active }) => (active ? '#000' : '#333')};  /* active 상태에 따라 색상 변경 */
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};  /* active 상태에 따라 글자 두께 변경 */
  margin: 0 10px;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #eee;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40px 20px;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  line-height: 40px;
  
`;

const MainText = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 30px;
`;

const SubText = styled.p`
  font-size: 16px;
  color: #555;
  margin-right: 10px;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transform: rotate(-10deg);
  
  &:nth-child(2) {
    transform: rotate(0deg);
    margin: 0 10px;
  }
  &:nth-child(3) {
    transform: rotate(10deg);
  }
`;