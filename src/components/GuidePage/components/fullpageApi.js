import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Section1Creator from './Section1Creator';
import Section2Creator from './Section2Creator';
import Section3Creator from './Section3Creator';
import Section4Creator from './Section4Creator';
import Section5Creator from './Section5Creator';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

// 추가된 CSS
const hideWatermarkAndNavigation = `
  .fp-watermark, .fp-slidesNav {
    display: none !important;
  }
`;

const FullpageWrapper = () => (
  <ReactFullpage
    licenseKey={'OPEN-SOURCE-GPLV3-LICENSE'}
    scrollingSpeed={1000}
    showNavigation={false}  // 네비게이션 표시 제거
    render={({ fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <style>{hideWatermarkAndNavigation}</style> {/* 워터마크와 네비게이션 숨김 */}
          <div className="section">
            <Section1Creator 
              title="창작을 시작해볼까요?" 
              fullpageApi={fullpageApi} 
            />
          </div>
          <div className="section">
            <Section2Creator 
              navItems={[
                {label: '크라우드 펀딩', sectionNumber: 1}, 
                {label: '창작자', sectionNumber: 2}, 
                {label: '펀딩 가이드', sectionNumber: 3}
              ]} 
              mainText="크라우드 펀딩" 
              subText="크라우드펀딩은 아이디어는 있지만 자금이 부족한 개인이나 단체가 다수의 사람들로부터 자금을 모으는 방식입니다."
              fullpageApi={fullpageApi} 
            />
          </div>
          <div className="section">
            <Section3Creator 
              navItems={[
                {label: '크라우드 펀딩', sectionNumber: 1}, 
                {label: '창작자', sectionNumber: 2}, 
                {label: '펀딩 가이드', sectionNumber: 3}
              ]} 
              mainText="창작자" 
              subText="프로젝트를 기획할 때는 목표와 방향을 명확히 설정하고, 실현 가능한 계획을 세우는 것이 중요합니다. 프로젝트의 목적과 주요 단계를 상세히 설명하세요." 
              fullpageApi={fullpageApi} 
            />
          </div>
          <div className="section">
            <Section4Creator 
              navItems={[
                {label: '크라우드 펀딩', sectionNumber: 1}, 
                {label: '창작자', sectionNumber: 2}, 
                {label: '펀딩 가이드', sectionNumber: 3}
              ]} 
              mainText="펀딩 가이드" 
              subText="결과 요약, 성과 평가, 미래 계획 등의 내용을 포함합니다." 
              fullpageApi={fullpageApi} 
            />
          </div>
          <div className="section">
            <Section5Creator 
              title="이제 시작할까요?" 
              subtitle="당신의 마음을 움직일 프로젝트를 찾아보세요."
              projects={[
                { image: 'project1.jpg', title: '모험기 오구의 모험기', status: '1939% 달성' },
                { image: 'project2.jpg', title: '마녀 엘리의 전습 생활', status: '1366% 달성' },
                { image: 'project3.jpg', title: '우리 댕냥이 스트레스 해소템! 뽀소밍 펫드라이기', status: '2006% 달성' }
              ]}
              fullpageApi={fullpageApi} 
            />
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default FullpageWrapper;
