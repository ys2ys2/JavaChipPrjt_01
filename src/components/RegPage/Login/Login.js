import React, { useState, useEffect, useContext } from 'react';
import './Login.css'; // 로그인 페이지의 스타일을 위한 CSS 파일
import L_logo from './logo.png';
import kakaoLoginButton from './kakao_login_medium_narrow.png'; // 카카오 로그인 버튼 이미지
import naverLoginButton from './naver_login_button.png'; // 네이버 로그인 버튼 이미지
import { useNavigate } from 'react-router-dom'; // 페이지 네비게이션을 위한 훅
import axios from 'axios'; // HTTP 요청을 위한 라이브러리
import { AuthContext } from '../../api/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldNavigate, setShouldNavigate] = useState(false); // 추가된 상태
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext); // 로그인 상태를 업데이트하기 위한 함수 가져오기

    useEffect(() => {
        if (shouldNavigate) {
            navigate("/"); // isLoggedIn이 true로 설정된 후에 navigate 호출
        }
    }, [shouldNavigate, navigate]);


    useEffect(() => {
        // 카카오 SDK 초기화
        if (window.Kakao) {
            const kakao = window.Kakao;
            if (!kakao.isInitialized()) {
                try {
                    kakao.init('ebbe1698a50daf974adaaf6ca5da2047'); // 발급받은 키로 초기화
                    console.log('Kakao SDK 초기화 성공');
                } catch (error) {
                    console.error('Kakao SDK 초기화 실패:', error);
                }
            }
        } else {
            console.error('Kakao SDK를 로드하지 못했습니다.');
            alert('Kakao SDK를 로드하지 못했습니다. 다시 시도해 주세요.');
        }
    }, []);

    const handleKakaoLogin = () => {
        if (window.Kakao && window.Kakao.Auth) {
            window.Kakao.Auth.login({
                success: (authObj) => {
                    console.log('카카오 로그인 성공:', authObj.access_token);
                    handleKakaoLoginSuccess(authObj.access_token);
                    setIsLoggedIn(true); // 로그인 상태를 true로 설정
                    setShouldNavigate(true); // 상태 설정 후에 navigate 처리
                },
                fail: (err) => {
                    console.error('카카오 로그인 실패:', err);
                    alert('카카오 로그인 실패. 다시 시도해주세요.');
                },
            });
        } else {
            console.error('Kakao SDK가 초기화되지 않았습니다.');
            alert('Kakao SDK가 로드되지 않았습니다. 페이지를 새로고침해 주세요.');
        }
    };

    const handleKakaoLoginSuccess = async (kakaoAccessToken) => {
        try {
            const response = await axios.post('http://localhost:9000/api/auth/kakao', {
                token: kakaoAccessToken,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('서버 응답:', response.data);

            await fnGetKakaoUserInfo(kakaoAccessToken);
            //사용자 정보 설정
            navigate("/");
        } catch (error) {
            console.error('카카오 인증 중 오류:', error);
            alert('카카오 로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const fnGetKakaoUserInfo = async (kakaoAccessToken) => {
        try {
            const res = await axios.get("https://kapi.kakao.com/v2/user/me", {
                headers: { "Authorization": `Bearer ${kakaoAccessToken}` }
            });
    
            const { id, kakao_account: { profile: { nickname } } } = res.data;
            fnKakaoUserInfoCheck(id.toString(), nickname);  // 수정된 부분
            console.log(`카카오에서 온 아이디: ${id}, 닉네임: ${nickname}`);
        } catch (e) {
            console.log('카카오 사용자 정보 가져오기 중 오류:', e);
        }
    };

    const handleNaverLogin = () => {
        if (window.naver) {
            console.log('Naver 객체 확인:', window.naver);
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: 'uoURGJco1YyIdVglMgek', // 네이버 클라이언트 ID
                callbackUrl: 'http://localhost:3000/login', // 네이버 로그인 콜백 URL
                isPopup: false, // 팝업 방식 사용
            });
           
            try {
                naverLogin.init();
                console.log('Naver Login 초기화 성공');
                naverLogin.getLoginStatus(async function (status) {
                    console.log('로그인 상태:', status); // 상태 확인 로그 추가
                    if (status) {
                        try {
                            const naverAccessToken = naverLogin.accessToken.accessToken;
                            await handleNaverLoginSuccess(naverAccessToken); // 로그인 성공 시 처리
                            console.log('네이버 로그인 성공:', naverAccessToken);
                            
                            setIsLoggedIn(true); // 로그인 상태를 true로 설정
                            localStorage.setItem('isLoggedIn', 'true'); // 수동으로 localStorage 업데이트
                            setShouldNavigate(true); // 상태 설정 후에 navigate 처리
                        } catch (error) {
                            console.error('네이버 로그인 성공 후 처리 중 오류:', error);
                            alert('네이버 로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
                        }
                    } else {
                        console.error('네이버 로그인 실패: 로그인 상태를 확인할 수 없습니다.');
                        alert('네이버 로그인 세션이 만료되었거나, 로그인되지 않았습니다. 다시 로그인해 주세요.');
                        naverLogin.reprompt(); // 사용자에게 로그인 다시 시도 요청
                    }
                });
            } catch (error) {
                console.error('Naver SDK 초기화 중 오류:', error);
                alert('네이버 SDK 초기화 중 오류가 발생했습니다. 페이지를 새로고침하거나 나중에 다시 시도해주세요.');
            }
        } else {
            console.error('Naver SDK가 로드되지 않았습니다.');
            alert('Naver SDK가 로드되지 않았습니다. 페이지를 새로고침해 주세요.');
        }
    };

    // 카카오 사용자 정보 전송 함수
    const fnKakaoUserInfoCheck = async (id, name) => {
        try {
            const response = await axios.post('http://localhost:9000/api/auth/register', {
                id,
                name
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            console.log('카카오 회원정보 추가 완료 응답:', response.data.result);
        } catch (error) {
            console.error('카카오 회원정보 추가 중 오류:', error);
        }
    };

    
    const handleNaverLoginSuccess = async (naverAccessToken) => {
        try {
            const response = await axios.post('http://localhost:9000/api/auth/naver', {
                token: naverAccessToken,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('서버 응답:', response.data);

            await fnGetNaverUserInfo(naverAccessToken);
        } catch (error) {
            console.error('네이버 인증 중 오류:', error);
            alert('네이버 로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const fnGetNaverUserInfo = async (naverAccessToken) => {
       
    
        try {
            const res = await axios.get('http://localhost:9000/naver/userinfo', {
            headers: {
                'Authorization': `Bearer ${naverAccessToken}`
            }
            });
            console.log('아이디:'+res.data.response.id+', 이름:'+res.data.response.name);
            fnNaverUserInfoCheck(res.data.response.id, res.data.response.name);  // 네이버 사용자 정보를 저장
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
            
        
    };

    // 네이버 사용자 정보 전송 함수
    const fnNaverUserInfoCheck = async (id, name) => {
        try {
            const response = await axios.post('http://localhost:9000/api/auth/naverReg', {
                id,
                name
                
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('네이버 회원정보 추가 완료 응답:', response.data.result);
            setIsLoggedIn(true); // 로그인 상태를 true로 설정
            localStorage.setItem('isLoggedIn', 'true'); // 수동으로 localStorage 업데이트
            setShouldNavigate(true); // 상태 설정 후에 navigate 처리
        } catch (error) {
            console.error('네이버 회원정보 추가 중 오류:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('이메일과 비밀번호를 입력하세요.');
            return;
        }
        try {
            const response = await fetch('http://localhost:9000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.result === 'OK') {
                    console.log('로그인 성공:', data);
                    alert('로그인에 성공했습니다.');
                    setIsLoggedIn(true); // 로그인 상태를 true로 설정
                    localStorage.setItem('isLoggedIn', 'true'); // 수동으로 localStorage 업데이트
                    setShouldNavigate(true); // 상태 설정 후에 navigate 처리
                    navigate("/");
                } else {
                    alert('로그인에 실패했습니다. 아이디나 비밀번호를 확인하세요.');
                }
            } else {
                alert('로그인 실패. 다시 시도하세요.');
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };

    const handleSignUpClick = () => {
        navigate('/SignUp');
    };

    return (
        <div className='body'>
        <div className="L_container">
            <div className="L_header">
                <a href="/">
                    <img src={L_logo} alt="펀딩할래! 로고" />
                </a>
            </div>
            <div className="L_login-container">
                <p>로그인하고 세상에 하나뿐인 <br /> 특별한 프로젝트를 발견해보세요!</p>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div className="L_form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="아이디"
                            required
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='L_input'
                        />
                    </div>
                    <div className="L_form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='L_input'
                        />
                    </div>
                    <button className="L_button" type="submit">로그인</button>
                </form>
                <div className="L_social-login">
                    <p>간편로그인</p>
                    <div className="L_icons">
                        <a href="#" onClick={handleKakaoLogin}>
                            <img src={kakaoLoginButton} alt="카카오 로그인 버튼" />
                        </a>
                        <a href="#" onClick={handleNaverLogin}>
                            <img src={naverLoginButton} alt="네이버 로그인 버튼" />
                        </a>
                    </div>
                </div>
                <div className="L_signup">
                    <p>아직 펀딩할래! 계정이 없으신가요? <span onClick={handleSignUpClick} style={{ color: 'black', cursor: 'pointer' }}>간편 회원가입</span></p>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;
