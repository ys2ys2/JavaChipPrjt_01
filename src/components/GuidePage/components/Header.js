import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = ({ onCreatorClick, onSponsorClick }) => {
  const navigate = useNavigate();

  const handleSponsorClick = () => {
    onSponsorClick(); // 팝업을 먼저 표시
    navigate('/');    // 후원자 페이지로 이동
  };

  const handleCreatorClick = () => {
    onCreatorClick(); // 팝업을 먼저 표시
    navigate('/page-two'); // 창작자 페이지로 이동
  };

  return (
    <HeaderContainer>
      <Logo>펀딩할래!</Logo>
      <Nav>
        <SponsorNav onClick={handleSponsorClick}>후원자</SponsorNav>
        <CreatorNav onClick={handleCreatorClick}>창작자</CreatorNav>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  background-color: white;
  z-index: 1000;  /* z-index를 확인하세요 */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;


const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #F2620F;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column; /* 버튼들을 상하로 정렬 */
  gap: 10px; /* 버튼 간의 간격 */
  margin-right: 40px; /* 네비게이션 위치 조정 */
`;

const NavLink = styled.div`
  font-size: 18px;
  color: #FFFFFF;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s, text-decoration 0.3s;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SponsorNav = styled(NavLink)`
  background-color: #F2620F;

  &:hover {
    background-color: #D4510D;
  }
`;

const CreatorNav = styled(NavLink)`
  background-color: #171FBF;

  &:hover {
    background-color: #0E1280
  }
`;

export default Header;
