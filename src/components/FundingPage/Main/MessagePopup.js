// MessagePopup.js
import React from 'react';
import './Popup.css';

function MessagePopup({ message, onClose }) {
  return (
    <div className="F_popup-overlay">
      <div className="F_popup-content">
        <p>{message}</p>
        <button className="F_closebutton" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default MessagePopup;
