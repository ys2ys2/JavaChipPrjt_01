import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Section1 from '../components/Section1'; // 후원자용 Section1
import Section2 from '../components/Section2'; // 후원자용 Section2
import Section3 from '../components/Section3'; // 후원자용 Section3
import Section4 from '../components/Section4'; // 후원자용 Section4
import Section5 from '../components/Section5'; // 후원자용 Section5

const SponsorPage = () => (
  <>
    <ReactFullpage
      licenseKey='YOUR_VALID_LICENSE_KEY'
      scrollingSpeed={1000}
      render={({ fullpageApi }) => (
        <ReactFullpage.Wrapper>
          <div className="section">
            <Section1 title="시작 콘텐츠" subtitle="여기는 시작 페이지입니다." fullpageApi={fullpageApi} />
          </div>
          <div className="section">
            <Section2 title="후원자용 콘텐츠" subtitle="여기는 후원자 페이지입니다." fullpageApi={fullpageApi} />
          </div>
          <div className="section">
            <Section3 title="후원 현황" subtitle="후원 프로젝트의 목표금액과 진행 상황을 확인하세요." fullpageApi={fullpageApi} />
          </div>
          <div className="section">
            <Section4 title="후원자용 콘텐츠" subtitle="여기는 후원자 페이지입니다." fullpageApi={fullpageApi} />
          </div>
          <div className="section">
            <Section5 title="후원 프로젝트" subtitle="후원할 프로젝트를 선택하세요." fullpageApi={fullpageApi} />
          </div>
        </ReactFullpage.Wrapper>
      )}
    />
  </>
);

export default SponsorPage;
