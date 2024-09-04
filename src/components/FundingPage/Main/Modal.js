// src/Modal.js
import React from 'react';
import './Modal.css'; // 모달 스타일을 위한 CSS 파일

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="F_modal-overlay" onClick={onClose}>
      <div className="F_modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="F_modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
