import React from 'react';
import styled from 'styled-components';
import SupporterImage1 from '../images/Section3/supporter.jpeg';
import SupporterImage2 from '../images/Section3/Supporter2.jpeg';
import SupporterImage3 from '../images/Section3/Supporter3.jpeg';

const Section3 = ({ fullpageApi }) => {
  return (
    <OuterContainer>
      <SectionContainer>
        <NavBar>
          <NavItem onClick={() => fullpageApi.moveTo(2)}>프로젝트</NavItem>
          <NavItem onClick={() => fullpageApi.moveTo(3)} active={true}>후원</NavItem> {/* 여기서 active prop을 전달 */}
          <NavItem onClick={() => fullpageApi.moveTo(4)}>선물</NavItem>
        </NavBar>
        <ContentContainer>
          <TextContainer>
            <MainTitle>후원이란 <br></br>
                       프로젝트 제작비를 <br></br>
                       지원하는 것입니다.</MainTitle>
            <SubTitle>목표금액을 달성해야 프로젝트가 성공해요.</SubTitle>
          </TextContainer>
          <ProgressContainer>
            <RaisedAmount>모인금액</RaisedAmount>
            <AmountContainer>
              <Amount>1,000,000원</Amount>
              <Percentage>100%</Percentage>
            </AmountContainer>
            <ProgressBar>
              <ProgressFill style={{ width: '100%' }} />
            </ProgressBar>
            <SupportersContainer>
              <SupporterImageContainer>
                <StyledSupporterImage src={SupporterImage1} alt="Supporter 1" />
                <StyledSupporterImage src={SupporterImage2} alt="Supporter 2" />
                <StyledSupporterImage src={SupporterImage3} alt="Supporter 3" />
              </SupporterImageContainer>
              <SupportersText>
                <HighlightText>150명</HighlightText>의 후원자가 있습니다.
              </SupportersText>
            </SupportersContainer>
          </ProgressContainer>
          <InfoContainer>
            <InfoItem>
              <InfoIcon>🎯</InfoIcon>
              <InfoText>목표금액 1,000,000원</InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>📅</InfoIcon>
              <InfoText>펀딩기간 2024.08.01 ~ 2024.08.30 <DaysLeft>17일 남음</DaysLeft></InfoText>
            </InfoItem>
            <InfoItem>
              <InfoIcon>💳</InfoIcon>
              <InfoText>결제 목표금액 달성시 2024.08.31에 결제 진행</InfoText>
            </InfoItem>
          </InfoContainer>
          <SupportButton>후원하기</SupportButton>
        </ContentContainer>
      </SectionContainer>
    </OuterContainer>
  );
};

export default Section3;

const OuterContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  overflow: hidden; /* 추가: 내부 콘텐츠가 넘치지 않도록 설정 */
`;

const SectionContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: #fff;
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
  margin-top: 150px;
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
  padding: 40px 20px;
  background-color: #fff;
  color: #333;
  
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const MainTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #999;
`;

const ProgressContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

const RaisedAmount = styled.p`
  font-size: 14px;
  color: #999;
`;

const AmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
`;

const Amount = styled.p`
  font-size: 32px;
  font-weight: bold;
`;

const Percentage = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: #F2620F;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #F2620F;
  border-radius: 4px;
`;

const SupportersContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const SupporterImageContainer = styled.div`
  display: flex;
  gap: -5px;
  margin-right: 10px;
`;

const StyledSupporterImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
`;

const SupportersText = styled.p`
  font-size: 14px;
  color: #F2620F;
`;

const HighlightText = styled.span`
  font-weight: bold;
`;

const InfoContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoIcon = styled.span`
  margin-right: 10px;
  font-size: 18px;
`;

const InfoText = styled.p`
  font-size: 14px;
  color: #333;
`;

const DaysLeft = styled.span`
  font-size: 14px;
  color: #F2620F;
`;

const SupportButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 15px 0;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #F2620F;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
