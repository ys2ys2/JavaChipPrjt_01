import React, { useState } from 'react';
import { Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/system';
import './CommentList.css';

// 스타일링 적용
const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#F2620F', // 테두리 색상 주황색
            borderWidth: '2px', // 테두리 두께 2px
        },
        'boxsizing': 'border-box', // 테두리와 패딩이 함께 계산되도록 설정
        padding: '0px', // 내부 패딩 제거
        '&:hover fieldset': {
            borderColor: '#F2620F', // 호버 시 테두리 색상
        },
        '&.Mui-focused fieldset': {
            borderColor: '#F2620F', // 포커스 시 테두리 색상
            borderWidth: '1px',
        },
    },
    '& .MuiInputBase-input': {
        color: '#000', // 텍스트 색상 검정색
        padding: '8px', // 입력 필드 내부 패딩 설정
    },
});

const CustomButton = styled(Button)({
    backgroundColor: '#F2620F', // 버튼 배경색 주황색
    color: '#fff', // 버튼 텍스트 색상 흰색
    '&:hover': {
        backgroundColor: '#D94C00', // 호버 시 배경색 어두운 주황색
    },
});

const CommentList = ({ comments, updateComment, deleteComment, addComment }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentComment, setCurrentComment] = useState(null);
    const [commentText, setCommentText] = useState('');

    const handleDeleteClick = (commentId) => {
        deleteComment(commentId);
    };

    const handleEditClick = (comment) => {
        setCurrentComment(comment);
        setCommentText(comment.text);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setCurrentComment(null);
        setCommentText('');
    };

    const handleSaveClick = () => {
        if (currentComment && commentText) {
            updateComment({ ...currentComment, text: commentText });
            handleDialogClose();
        }
    };

    const handleAddClick = () => {
        if (commentText) {
            const newComment = {
                username: 'User', 
                text: commentText,
                createdAt: new Date().toISOString(), // 현재 날짜와 시간을 설정
            };
            addComment(newComment);
            setCommentText(''); // 입력 필드를 초기화
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return new Date().toLocaleString(); // createdAt이 없는 경우 현재 시간 반환
        }
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? date.toLocaleString() : 'Invalid Date'; // 유효한 날짜일 경우만 포맷팅
    };

    return (
        <div className="comment-list-container">
            <ul className="comment-list">
                {comments.map((comment, index) => (
                    <li key={index} className="comment-item">
                        <div className="comment-avatar">
                            <Avatar alt="User" src="/path/to/avatar.jpg" />
                        </div>
                        <div className="comment-content">
                            <div className="comment-text">{comment.text}</div>
                            <div className="comment-meta">
                                <span className="comment-username">{comment.username}</span>
                                <span className="comment-date">{formatDate(comment.createdAt)}</span>
                            </div>
                        </div>
                        <div className="comment-actions">
                            <IconButton onClick={() => handleEditClick(comment)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(comment.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </li>
                ))}
            </ul>

            {/* 팝업창 (Dialog) */}
            <Dialog
                open={isDialogOpen}
                onClose={handleDialogClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    style: {
                        padding: '20px',
                        borderRadius: '8px',
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 'bold' }}>댓글 수정</DialogTitle> {/* 제목을 볼드체로 변경 */}
                <DialogContent>
                    <CustomTextField
                        fullWidth
                        variant="outlined"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <CustomButton onClick={handleDialogClose}>취소</CustomButton>
                    <CustomButton onClick={handleSaveClick}>저장하기</CustomButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CommentList;
