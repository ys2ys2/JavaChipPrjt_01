import React, { useState, useEffect } from 'react';
import './Main.css';
import Project1 from './images/Project1.jpg';
import Project2 from './images/Project2.jpg';
/*지금은 안쓰는 팝업*/ 
function Guide() {
  const handleCreatorGuideClick = () => {
    // 창작자 가이드 버튼 클릭 시 동작
    alert("창작자 가이드 버튼 클릭됨");
  };

  const handleFirstDonationGuideClick = () => {
    // 첫 후원 가이드 버튼 클릭 시 동작
    alert("첫 후원 가이드 버튼 클릭됨");
  };

  return { handleCreatorGuideClick, handleFirstDonationGuideClick };
}

function PopupSlider() {
  const [currentPopup, setCurrentPopup] = useState(1);
  const [showPopup, setShowPopup] = useState(true);
  const [doNotShow, setDoNotShow] = useState(false);

  const { handleCreatorGuideClick, handleFirstDonationGuideClick } = Guide();

  const handleNext = () => {
    setCurrentPopup(currentPopup === 1 ? 2 : 1);
  };

  const handlePrev = () => {
    setCurrentPopup(currentPopup === 1 ? 2 : 1);
  };

  const handleCheckboxChange = () => {
    setDoNotShow(!doNotShow);
    if (!doNotShow) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    if (doNotShow) {
      setShowPopup(false);
    }
  }, [doNotShow]);

  return (
    <div className="Main">
      {showPopup && (
        <>
          <div className="overlay"></div>
          <div className="popup">
            <div className="popup-header">
            <img alt="Project1" className="image" src={Project1} />
            
            </div>

            <div className="popup-navigation">
              <button className="nav-button" onClick={handlePrev}>
                &lt;
              </button>

              {currentPopup === 1 ? (
                <div className="popup-content">
                  {/*<h2>첫 후원 가이드</h2>*/}
                  <button
                    className="popup-button"
                    onClick={handleFirstDonationGuideClick}
                    style={{ backgroundColor: '#F2620F' }}
                  >
                    첫 후원 가이드
                  </button>
                </div>
              ) : (
                <div className="popup-content">
                  <img alt="Project2" className="image" src={Project2} />
                  {/*<h2>창작자 가이드</h2>*/}
                  <button
                    className="popup-button"
                    onClick={handleCreatorGuideClick}
                    style={{ backgroundColor: '#171FBF' }}
                  >
                    창작자 가이드
                  </button>
                </div>
              )}

              <button className="nav-button" onClick={handleNext}>
                &gt;
              </button>
            </div>

            <div className="popup-footer">
              <label>
                24시간 동안 다시 열지 않습니다.
                <input type="checkbox" checked={doNotShow} onChange={handleCheckboxChange} />
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PopupSlider;