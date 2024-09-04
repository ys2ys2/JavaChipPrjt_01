import React, { useState } from 'react'; // React와 useState 훅을 임포트
import { TextField, Paper, Button, InputAdornment } from '@mui/material'; // MUI(Material-UI)에서 필요한 컴포넌트들을 임포트

const AddComment = ({ addComment }) => { // AddComment 컴포넌트 선언, addComment 함수는 부모 컴포넌트에서 전달받음
    const [comment, setComment] = useState(''); // comment 상태를 관리하기 위해 useState 훅 사용, 초기값은 빈 문자열

    const handleInputChange = (e) => { // 입력 필드의 값이 변경될 때 호출되는 함수
        setComment(e.target.value);    // 입력된 값으로 comment 상태를 업데이트
    };

    const handleButtonClick = () => {  // 작성하기 버튼이 클릭될 때 호출되는 함수
        addComment(comment);           // 부모 컴포넌트로부터 전달받은 addComment 함수를 호출하여 현재 comment 값을 전달
        setComment('');                // comment 상태를 빈 문자열로 초기화하여 입력 필드를 비움
    };

    const handleKeyPress = (e) => {    // 키보드 입력 시 호출되는 함수, 주로 엔터키 처리에 사용
        if (e.key === 'Enter') {       // 만약 눌린 키가 엔터키라면
            handleButtonClick();       // 작성하기 버튼 클릭 동작을 수행
        }
    };

    return (
        <Paper sx={{ width: '100%', margin: '25px auto', padding: '0px', boxShadow: 'none', border: 'none' }}>
            {/* Paper 컴포넌트로 전체 입력 섹션을 감싸고 스타일을 설정 */}
            <TextField
                label="후원자만 글을 쓸 수 있어요."    // 텍스트 필드의 레이블 설정
                fullWidth                       // 텍스트 필드가 부모 요소의 가로 폭을 모두 차지하도록 설정
                value={comment}                 // 텍스트 필드의 값으로 comment 상태를 사용
                onChange={handleInputChange}    // 텍스트 필드 값이 변경될 때 handleInputChange 함수 호출
                onKeyPress={handleKeyPress}     // 키보드 입력 시 handleKeyPress 함수 호출
                InputProps={{                   
                    endAdornment: (             // InputAdornment를 통해 텍스트 필드 안에 버튼을 배치
                        <InputAdornment position="end">
                            <Button
                                variant="contained"           // 버튼을 'contained' 스타일로 설정 (배경색이 있는 버튼)
                                sx={{ backgroundColor: '#F2620F', '&:hover': { backgroundColor: '#D94C00' } }} // 버튼의 배경색과 호버 시 색상을 설정
                                onClick={handleButtonClick}   // 버튼 클릭 시 handleButtonClick 함수 호출
                            >
                                작성하기
                            </Button>
                        </InputAdornment>
                    ),
                }}
            />
        </Paper>
    );
};

export default AddComment; // AddComment 컴포넌트를 기본으로 내보냄
