import React from 'react';
import styled from 'styled-components';
import GiftImage from '../images/Section4/Gift.png'; // 업로드된 이미지를 경로에 맞게 사용

const Section4 = ({ fullpageApi }) => {
  return (
    <OuterContainer>
      <SectionContainer>
        <NavBar>
          <NavItem onClick={() => fullpageApi.moveTo(2)}>프로젝트</NavItem> {/* 섹션 2로 이동 */}
          <NavItem onClick={() => fullpageApi.moveTo(3)}>후원</NavItem> {/* 섹션 3으로 이동 */}
          <NavItemActive>선물</NavItemActive> {/* 현재 섹션 */}
        </NavBar>
        <ContentContainer>
          <TextContainer>
            <MainText>선물은 <br></br>
            후원자만 받을 수 있는<br></br> 
            특별한 혜택이에요</MainText>
            <SubText>프로젝트가 성공하면 선물을 드려요.<br />기대하는 마음으로 기다려주세요!</SubText>
          </TextContainer>
          <ImageContainer>
            <StyledImage src={GiftImage} alt="선물 이미지" />
          </ImageContainer>
        </ContentContainer>
      </SectionContainer>
    </OuterContainer>
  );
};

export default Section4;

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
  margin-top: 30px;
`;

const NavItem = styled.div` //네비 스타일링
  font-size: 16px;
  color: #333;  /* 글자 색을 배경과 대비되게 설정 */
  margin: 0 10px;  /* 양 옆 간격 조정 */
  cursor: pointer;
  padding: 10px;  /* 클릭 가능한 영역을 넓히기 위해 추가 */
  border-radius: 5px;  /* 버튼 느낌을 주기 위해 약간의 둥근 모서리 추가 */

  &:hover {
    background-color: #eee;  /* 호버 시 배경색을 변경 */
  }
`;

const NavItemActive = styled(NavItem)`
  font-weight: bold;
  color: #000;
//text-decoration: underline; //밑줄
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TextContainer = styled.div`
  margin-bottom: 30px;
  line-height: 30px;
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

const ImageContainer = styled.div`
  margin-top: 20px;
`;

const StyledImage = styled.img`
  width: 300px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
