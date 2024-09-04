import React, { createContext, useState, useEffect } from 'react';

// AuthContext를 생성하여 React Context API를 통해 로그인 상태를 전역에서 사용
export const AuthContext = createContext();

// AuthProvider 컴포넌트를 정의하여 애플리케이션의 최상위에서 이 컴포넌트를 사용하여
// 하위 컴포넌트들이 로그인 상태와 관련된 정보를 사용
export const AuthProvider = ({ children }) => {
  
  // 로그인 상태를 관리하는 isLoggedIn 상태 변수와 그 상태를 변경하는 setIsLoggedIn 함수를 정의.
  // useState의 초기값을 설정할 때, 로컬 스토리지에서 'isLoggedIn' 값을 가져와서
  // 해당 값이 'true'인지 확인하여 초기 로그인 상태를 결정.
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // 로그아웃. 로그아웃 시 isLoggedIn 상태를 false로 설정하고,
  // 로컬 스토리지에서 'isLoggedIn' 값을 제거하여 사용자가 더 이상 로그인되지 않은 상태로 만들기.
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  // useEffect 훅은 isLoggedIn 상태가 변경될 때마다 호출.
  // 로그인 상태가 변경될 때마다 로컬 스토리지에 'isLoggedIn' 값을 저장하여
  // 다음 번 애플리케이션이 로드될 때 이를 사용하여 초기 로그인 상태를 설정.
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  // AuthContext.Provider는 로그인 상태와 그 상태를 변경하는 함수(logout 포함)를
  // 하위 컴포넌트들이 사용할 수 있도록 제공하는 역할.
  // children은 이 AuthProvider 컴포넌트 내부에 렌더링되는 모든 컴포넌트.
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
