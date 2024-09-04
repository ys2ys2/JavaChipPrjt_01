// InquiryPopup.js
import React from 'react';
import './Popup.css';

function InquiryPopup({ onClose, onSubmit }) {
  return (
    <div className="F_popup-overlay">
      <div className="F_popup-content">
        <h3>창작자에게 문의하기</h3>
        <form onSubmit={onSubmit}>
          <div className="F_form-group">
            <label>이름</label>
            <input type="F_text" required />
          </div>
          <div className="F_form-group">
            <label>이메일</label>
            <input type="F_email" required />
          </div>
          <div className="F_form-group">
            <label>문의 내용</label>
            <textarea rows="5" required></textarea>
          </div>
          <div className="F_popup-actions">
            <button type="F_submit">문의하기</button>
            <button type="F_button" onClick={onClose}>닫기</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InquiryPopup;
