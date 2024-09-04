// PopupManager.js
import React, { useState, useCallback } from 'react';

// 팝업 컴포넌트
export function Popup({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="F_popup-overlay">
      <div className="F_popup-content">
        <p>{message}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

// 팝업 열기 훅
export function useOpenPopup() {
  const [popup, setPopup] = useState(null);

  const openPopup = useCallback((message) => {
    setPopup(message);
  }, []);

  const closePopup = useCallback(() => {
    setPopup(null);
  }, []);

  return {
    popup,
    openPopup,
    closePopup,
  };
}

// 팝업을 보여주는 훅과 컴포넌트를 외부에서 사용할 수 있도록 내보냄
export default function PopupManager({ message, onClose }) {
  return <Popup message={message} onClose={onClose} />;
}
