import React, { useState, useEffect } from 'react';
import './SignUp.css';
import logo from './logo.png';
import axios from 'axios';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordStrengthClass, setPasswordStrengthClass] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false); // 이메일 인증 여부 추가
    const [emailDuplicateError, setEmailDuplicateError] = useState(false); // 이메일 중복 오류 추가

    useEffect(() => {
        const isFormValid = emailValid && validatePassword() && termsAccepted && nickname.trim() !== '' && !passwordMatchError && emailVerified && !emailDuplicateError;
        setSubmitEnabled(isFormValid);
    }, [emailValid, password, confirmPassword, termsAccepted, nickname, passwordMatchError, emailVerified, emailDuplicateError]);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        // 이메일 형식이 맞는지 체크
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailValid(emailPattern.test(value));
        setEmailVerified(false); // 이메일이 변경될 때마다 인증 상태를 초기화
        setEmailDuplicateError(false); // 이메일이 변경될 때마다 중복 오류 상태 초기화
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        updatePasswordStrength(value);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setPasswordMatchError(password !== value);
    };

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const handleEmailVerification = async () => {
        // 이메일 형식이 맞으면 서버에서 중복 여부를 확인
        if (emailValid) {
            try {
                const response = await axios.post('http://localhost:9000/api/check-email', { email });

                if (response.data === 'EMAIL_DUPLICATE') {
                    setEmailDuplicateError(true);
                    alert("이미 사용 중인 이메일입니다.");
                } else {
                    setEmailVerified(true);
                    setEmailDuplicateError(false);
                    alert("이메일이 인증되었습니다!");
                }
            } catch (error) {
                console.error("이메일 인증 중 오류 발생:", error);
                alert("이메일 인증 중 오류가 발생했습니다.");
            }
        } else {
            alert("올바른 이메일 형식을 입력해 주세요.");
        }
    };

    const updatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*]/.test(password)) strength++;

        switch (strength) {
            case 1:
            case 2:
                setPasswordStrength('약함');
                setPasswordStrengthClass('weak');
                break;
            case 3:
                setPasswordStrength('보통');
                setPasswordStrengthClass('medium');
                break;
            case 4:
                setPasswordStrength('강함');
                setPasswordStrengthClass('strong');
                break;
            case 5:
                setPasswordStrength('매우 강함');
                setPasswordStrengthClass('very-strong');
                break;
            default:
                setPasswordStrength('');
                setPasswordStrengthClass('');
                break;
        }
    };

    const validatePassword = () => {
        const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
        return passwordValid && password === confirmPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitEnabled) {
            try {
                const response = await fetch('http://localhost:9000/SignUp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        name: nickname,
                        password: password,
                    }),
                });

                if (response.ok) {
                    alert("회원가입이 완료되었습니다!");
                    window.location.href = 'http://localhost:3000/login';
                } else {
                    alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
                }
            } catch (error) {
                console.error("Error during signup:", error);
                alert("회원가입 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <div className='body'>
            <div className="L_container">
                <div className="L_header">
                    <a href="/">
                        <img src={logo} alt="펀딩할래! 로고" />
                    </a>
                </div>
                <h1 className='L_h1'>이메일 간편가입</h1>
                <form className="L_join" onSubmit={handleSubmit}>
                    <div className="L_form-group">
                        <input
                            type="email"
                            id="email"
                            placeholder="이메일 계정"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className='L_input'
                        />
                        <button type="button" id="verifyButton" onClick={handleEmailVerification} disabled={!emailValid}>
                            인증하기
                        </button>
                        {!emailValid && <div id="emailError" className="L_error-message">유효한 이메일을 입력해 주세요.</div>}
                        {emailDuplicateError && <div id="emailDuplicateError" className="L_error-message">이미 사용 중인 이메일입니다.</div>}
                    </div>

                    <div className="L_form-group">
                        <input
                            type="text"
                            id="nickname"
                            placeholder="닉네임 입력"
                            value={nickname}
                            onChange={handleNicknameChange}
                            required
                            className='L_input'
                        />
                        {nickname.trim() === "" && <div id="nicknameError" className="L_error-message">닉네임을 입력해 주세요.</div>}
                    </div>

                    <div className="L_form-group">
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호 입력"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className='L_input'
                        />
                        {!validatePassword() && <div id="passwordError" className="L_error-message">비밀번호는 8글자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.</div>}
                        {password && (
                            <div id="passwordStrength" className={`L_password-strength ${passwordStrengthClass}`}>
                                비밀번호 강도: {passwordStrength}
                            </div>
                        )}
                    </div>

                    <div className="L_form-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="비밀번호 확인"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            className='L_input'
                        />
                        {passwordMatchError && <div id="confirmPasswordError" className="L_error-message">비밀번호가 일치하지 않습니다.</div>}
                    </div>

                    <div className="L_terms">
                        <input
                            type="checkbox"
                            id="termsCheckbox"
                            checked={termsAccepted}
                            onChange={handleTermsChange}
                            className='L_input'
                        />
                        <label htmlFor="termsCheckbox">약관에 동의합니다</label>
                    </div>

                    <button type="submit" className="L_submit" id="submitButton" disabled={!submitEnabled}>
                        간편가입 완료하기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
