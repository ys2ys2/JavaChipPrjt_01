import React from 'react';
import styled from 'styled-components';

const Section = ({ children }) => {
  return <SectionContainer>{children}</SectionContainer>;
};

export default Section;

const SectionContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5; /* 큰 회색 배경 */
  padding: 40px;
  box-sizing: border-box;
`;






//스크롤 삭제 : inline, contents, initial, unset
/* 배경 이미지나 색상을 섹션별로 다르게 설정 가능 */

// 스크롤 삭제 : inline, contents, initial, unset

// display: inline;
// 요소를 인라인 레벨로 설정합니다.
// 인라인 요소는 콘텐츠 크기만큼의 너비를 가지며, 새로운 줄에서 시작하지 않습니다.
// 예: <span>, <a>, <strong> 등.

// display: contents;
// 요소의 자식 요소만 렌더링하고, 요소 자체는 렌더링되지 않습니다. 레이아웃이나 스타일링에 영향을 미치지 않습니다.

// display: initial;
// 요소의 display 속성을 기본값으로 설정합니다. 대부분의 요소는 브라우저의 기본 display 값을 따릅니다.

// display: unset;
// 요소의 display 속성을 상속하거나, 기본 초기값으로 설정합니다. 상황에 따라 inherit 또는 initial과 유사하게 동작합니다.