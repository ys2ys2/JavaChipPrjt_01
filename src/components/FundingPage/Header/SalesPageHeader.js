import React, { useEffect, useContext } from 'react';
import '../../MainPage/Main.css';
import logo from '../../MainPage/Logo.png';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../api/AuthContext';


// Logobutton 컴포넌트 정의
const Logobutton = () => {
  // 상태 정의: 검색어, 최근 검색어 목록, 드롭다운 메뉴 표시 여부
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext); // 로그인 상태와 사용자 정보를 가져오기


  
  useEffect(() => {
    console.log('Logobutton 컴포넌트의 로그인 상태:', isLoggedIn);
  }, [isLoggedIn]);


  const handleLogout = () => {
    logout();
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  const handleLoginSignupClick = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  const handleMyPageClick = () => {
    navigate('/mypage'); // 마이페이지로 이동
  };


  // 컴포넌트가 마운트될 때(처음 렌더링될 때) 로컬 스토리지에서 최근 검색어 목록을 불러옴

  // 로고 클릭 시 홈페이지로 이동
  const handleLogoClick = () => {
    window.location.href = '/'; // 홈페이지로 이동
  };


  // 프로젝트 만들기 버튼 클릭 시 알림 표시
  const handleProjectCreateClick = () => {
    alert('프로젝트 만들기 버튼이 클릭되었습니다.'); // 클릭 시 알림
  };

  // 컴포넌트 UI 렌더링
  return (
    <div className="headerContainer">
      {/* 헤더: 로고 및 버튼 그룹 */}
      <header className="header">
        <button onClick={handleLogoClick} className="logoButton">
          <img src={logo} alt="홈으로 이동" className="logoImage" /> {/* 로고 이미지 */}
        </button>
        <div className="buttonGroup">
          {isLoggedIn ? (
            <>
              <button onClick={handleMyPageClick} className="loginSignupButton">마이페이지</button>
              <button onClick={handleLogout} className="logoutButton">로그아웃</button>
            </>
          ) : (
            <button onClick={handleLoginSignupClick} className="loginSignupButton">로그인/회원가입</button>
          )}
          
          <button onClick={handleProjectCreateClick} className="project-button1">프로젝트 만들기</button> {/* 프로젝트 만들기 버튼 */}
        </div>
      </header>
      </div>
  );
};

export default Logobutton;