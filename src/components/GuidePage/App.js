import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SponsorPage from './Pages/SponsorPage';
import CreatorPage from './Pages/CreatorPage';
import Header from './components/Header';
import CreatorPopup from './components/CreatorPopup'; // 팝업 파일 경로 수정
import SponsorPopup from './components/SponsorPopup'; // 팝업 파일 경로 수정

import './App.css';

const App = () => {
  const [isCreatorPopupVisible, setCreatorPopupVisible] = useState(false);
  const [isSponsorPopupVisible, setSponsorPopupVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // 경로에 따라 적절한 팝업을 표시
    if (location.pathname === '/sponsor') {
      setSponsorPopupVisible(true);
      setCreatorPopupVisible(false);
    } else if (location.pathname === '/creator') {
      setCreatorPopupVisible(true);
      setSponsorPopupVisible(false);
    }
  }, [location]);

  const handleSponsorClick = () => {
    setSponsorPopupVisible(true);
  };

  const handleCreatorClick = () => {
    setCreatorPopupVisible(true);
  };

  const closeCreatorPopup = () => {
    setCreatorPopupVisible(false);
  };

  const closeSponsorPopup = () => {
    setSponsorPopupVisible(false);
  };

  return (
    <div>
      <Header onCreatorClick={handleCreatorClick} onSponsorClick={handleSponsorClick} />
      <Routes>
        <Route path="/sponsor" element={<SponsorPage />} />
        <Route path="/creator" element={<CreatorPage />} />
      </Routes>
      {/* 각 페이지에서 팝업 표시 */}
      {location.pathname === '/sponsor' && isSponsorPopupVisible && <SponsorPopup onClose={closeSponsorPopup} />}
      {location.pathname === '/creator' && isCreatorPopupVisible && <CreatorPopup onClose={closeCreatorPopup} />}
    </div>
  );
};

export default App;
