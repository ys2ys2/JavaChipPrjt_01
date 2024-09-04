import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Section1 from '../components/Section1Creator'; // 창작자용 Section1
import Section2 from '../components/Section2Creator'; // 창작자용 Section2
import Section3 from '../components/Section3Creator'; // 창작자용 Section3
import Section4 from '../components/Section4Creator'; // 창작자용 Section4
import Section5 from '../components/Section5Creator'; // 창작자용 Section5

const CreatorPage = () => (
  <>
    <ReactFullpage
      licenseKey='YOUR_VALID_LICENSE_KEY'
      scrollingSpeed={1000}
      render={({ state, fullpageApi }) => (
        <ReactFullpage.Wrapper>
          <div className="section">
            <Section1 title="창작자용 콘텐츠" subtitle="여기는 창작자 페이지입니다." />
          </div>
          <div className="section">
            <Section2 title="" subtitle="" />
          </div>
          <div className="section">
            <Section3 title="프로젝트 기획" subtitle="새로운 창작 프로젝트를 시작하세요." />
          </div>
          <div className="section">
            <Section4 title="창작 목표" subtitle="새로운 창작 목표." />
          </div>
          <div className="section">
            <Section5 title="창작 프로젝트" subtitle="새로운 창작 프로젝트를 시작하세요." titleColor="#FFFFFF" />
          </div>
        </ReactFullpage.Wrapper>
      )}
    />
  </>
);

export default CreatorPage;
