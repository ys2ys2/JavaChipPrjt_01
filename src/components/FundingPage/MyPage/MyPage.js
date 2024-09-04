import React, { useState, useEffect } from 'react';
import './MyPage.css';
import { Link } from 'react-router-dom'; // Link를 가져옵니다.


function MyPage() {
    const [name, setName] = useState('자바칩');
    const [isEditing, setIsEditing] = useState(false);
    const [joinDate, setJoinDate] = useState('');
    const [introduce, setIntroduce] = useState(''); // 입력 인풋
    const [savedIntroduce, setSavedIntroduce] = useState('') //소개 저장

    // 현재 날짜를 가져와서 joinDate 상태에 저장하는 useEffect
    useEffect(() => {
      const today = new Date(); // 현재 날짜 가져오기
      const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      setJoinDate(formattedDate); // 날짜 포맷을 YYYY-MM-DD로 설정
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 로드될 때 한 번만 실행되도록 함

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleIntroduceChange = (event) => {
      setIntroduce(event.target.value); // 사용자가 입력한 소개를 상태에 저장
  };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const saveName = () => {
        setIsEditing(false);
    };

    // 작성완료 버튼을 눌렀을 때 호출되는 함수
    const handleSaveIntroduce = () => {
      setSavedIntroduce(introduce); // 입력된 소개를 저장된 소개 상태에 저장
      setIntroduce(''); // 입력 필드를 초기화 (필요에 따라 생략 가능)
  };

    

    return (
        <div className="F_profile-container">
            <div className="F_profile">
                <img src="/images/profile.PNG" alt="프로필 이미지" className="F_profile-img" />
                <div className="F_profile-info">
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="F_name-input"
                        />
                    ) : (
                        <span className="F_username">{name}</span>
                    )}
                    <span>{joinDate} 가입</span>
                    {isEditing ? (
                        <button onClick={saveName} className="F_save-btn">저장</button>
                    ) : (
                        <button onClick={toggleEditing} className="F_edit-btn">수정하기</button>
                    )}
                </div>
            </div>

            {/* 카테고리 탭 */}
            <div className="F_category-tabs-container">
                <div className="F_category-tabs">
                    <ul>
                        <li><Link to="/" className="F_tab-link">메인 페이지로</Link></li>
                        <li><Link to="/Mypage" className="F_tab-link">내 정보 수정</Link></li>
                        <li><Link to="/comments" className="F_tab-link">커뮤니티</Link></li>
                        <li><Link to="/reviews" className="F_tab-link">후기</Link></li>
                    </ul>
                </div>
            </div>
            {/* 소개 입력란 */}
            <div className="F_introduce-section">
            <div className="F_textarea-container">
                <textarea
                    placeholder="자기소개를 입력하세요"
                    value={introduce}
                    onChange={handleIntroduceChange}
                    className="F_introduce-input"
                />
                <div onClick={handleSaveIntroduce} className="F_save-introduce-btn">
                    작성완료
                </div>
            </div>
        </div>
            <div className="F_no-content">
                {savedIntroduce ? <div>{savedIntroduce}</div> : "등록된 소개가 없습니다."}
            </div>
        </div>
    );
}

export default MyPage;