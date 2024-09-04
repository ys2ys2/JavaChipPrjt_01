import React, { useState, useEffect } from 'react';
import './MyPage.css';

function MyPage() {
    const [name, setName] = useState('박예슬');
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
        <div className="profile-container">
            <div className="profile">
                <img src="/images/profile.PNG" alt="프로필 이미지" className="profile-img" />
                <div className="profile-info">
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="name-input"
                        />
                    ) : (
                        <span className="username">{name}</span>
                    )}
                    <span>{joinDate} 가입</span>
                    {isEditing ? (
                        <button onClick={saveName} className="save-btn">저장</button>
                    ) : (
                        <button onClick={toggleEditing} className="edit-btn">수정하기</button>
                    )}
                </div>
            </div>

            {/* 카테고리 탭 */}
            <div className="category-tabs">
                <ul>
                    <li className="active">프로필</li>
                    <li>프로젝트 후기</li>
                    <li>올린 프로젝트</li>
                    <li>후원한 프로젝트</li>
                    <li>팔로워</li>
                    <li>팔로잉</li>
                </ul>
            </div>

            {/* 소개 입력란 */}
            <div className="introduce-section">
            <div className="textarea-container">
                <textarea
                    placeholder="자기소개를 입력하세요"
                    value={introduce}
                    onChange={handleIntroduceChange}
                    className="introduce-input"
                />
                <div onClick={handleSaveIntroduce} className="save-introduce-btn">
                    작성완료
                </div>
            </div>
        </div>
            <div className="no-content">
                {savedIntroduce ? <div>{savedIntroduce}</div> : "등록된 소개가 없습니다."}
            </div>
        </div>
    );
}

export default MyPage;