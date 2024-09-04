import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { fetchCreatorUpdate, addOrUpdateCreatorUpdate, fetchLatestUpdateDate } from './service/ApiService';
import './CommentList.css';

const CustomPaper = styled(Paper)(({ theme }) => ({
    boxShadow: 'none',
    borderRadius: 0,
    padding: 0,
    backgroundColor: 'transparent',
}));

const CreatorUpdateBox = () => {
    const [updateText, setUpdateText] = useState('');
    const [comment, setComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [latestDate, setLatestDate] = useState('');
    const gubun = 1; // 구분값 1 설정해서 1만 나오게 하기

    useEffect(() => {
        loadCreatorUpdate();
        loadLatestUpdateDate();
    }, []);
    
    const loadLatestUpdateDate = async () => {
        try {
            const response = await fetchLatestUpdateDate(gubun);
            console.log("API Response: ", response); // 콘솔에 응답을 출력하여 확인
            if (response) {
                setLatestDate(response);
            } else {
                throw new Error("데이터를 찾을 수 없습니다.");
            }
        } catch (error) {
            console.error("최신 작성 날짜 업데이트에 실패하였습니다. :", error.message);
            setLatestDate("날짜 정보를 불러오지 못했습니다.");
        }
    };

    const loadCreatorUpdate = async () => {
        try {
            const response = await fetchCreatorUpdate(gubun);
            if (response) {
                setUpdateText(response.text);
            }
        } catch (error) {
            console.error("창작자 업데이트를 로드하는데 실패했습니다.:", error.message);
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleButtonClick = async () => {
        if (isEditing) {
            const updateData = { username: "Creator", text: comment, gubun : 1 };
            try {
                const response = await addOrUpdateCreatorUpdate(updateData, gubun);
                if (response) {
                    setUpdateText(comment);  // 업데이트된 텍스트를 화면에 표시
                    setComment('');  // 입력 필드 초기화
                    setIsEditing(false);  // 편집 모드 종료
                    loadLatestUpdateDate();  // 최신 작성 일자 갱신 
                // await addOrUpdateCreatorUpdate(updateData);
                // setUpdateText(comment);
                // setComment('');
                // setIsEditing(false);
                // loadLatestUpdateDate();
            } else {
                console.error("API 응답이 없습니다.");
            }
        } catch (error) {
            console.error("창작자 업데이트를 수정하는데 실패했습니다.:", error.message);
        }
    } else {
        setIsEditing(true);  // 작성 모드로 전환
    }
};
    return (
        <CustomPaper className="F_creator-update-box">
            <div className="F_creator-update-container">
                <h4>창작자 업데이트</h4>
                <span className="date">최종 작성 일자: {latestDate}</span>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#F2620F',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#D94C00'
                        },
                        padding: '8px 16px',
                        fontSize: '14px',
                        minWidth: 'auto',
                        lineHeight: '1.5',
                        marginLeft: '10px',
                        margin: '10px'
                    }}
                    onClick={handleButtonClick}
                >
                    {isEditing ? '저장하기' : '작성하기'}
                </Button>
            </div>

            <Paper sx={{ width: '100%', margin: '25px auto', padding: '0px', boxShadow: 'none', border: 'none' }}>
                <TextField
                    label="창작자만 글을 쓸 수 있어요."
                    fullWidth
                    value={comment}
                    onChange={handleCommentChange}
                    inputProps={{
                        readOnly: !isEditing,
                        style: {
                            color: '#000',
                            fontFamily: 'NanumSquareNeo, sans-serif',
                        }
                    }}
                />
            </Paper>
            <TextField
                fullWidth
                multiline
                rows={4}
                value={updateText}
                inputProps={{
                    readOnly: true,
                    style: {
                        color: '#000',
                        fontFamily: 'NanumSquareNeo, sans-serif',
                        fontSize: '18px'
                    }
                }}
                className="F_update-textfield"
            />
        </CustomPaper>
    );
};

export default CreatorUpdateBox;
