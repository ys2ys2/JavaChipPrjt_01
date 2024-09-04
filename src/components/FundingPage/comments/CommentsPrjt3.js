import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import AddComment from './AddComments';
import CommentList from './CommentList';
import Pagination from '../../Pagination';
import CreatorUpdateBox3 from './CreatorUpdateBox3';  
import { fetchComments, addComment as addCommentApi, updateComment as updateCommentApi, deleteComment as deleteCommentApi } from './service/ApiService';
import CommentList3 from './CommentList3';
import SalesPageHeader from '../../FundingPage/Header/SalesPageHeader';




const CommentsPrjt3 = ({ gubun = 3 }) => {
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 10;

    // const gubun = 1; // 현재 페이지의 gubun 값 (다른 페이지에서는 이 값을 변경)

    useEffect(() => {
        loadComments();
    }, [gubun]);

    const loadComments = () => {
        fetchComments(gubun).then(response => {
            setComments(response);
        }).catch(error => {
            console.error("댓글 불러오기 실패!", error);
        });
    };

    const handleAddComment = (commentText) => {
        const newComment = { username: "사용자", text: commentText };
        addCommentApi(newComment, gubun).then(response => {
            setComments([response, ...comments]);
        }).catch(error => {
            console.error("댓글 작성 실패!", error);
        });
    };

    const handleUpdateComment = (updatedComment) => {
        updateCommentApi(updatedComment, gubun).then(response => {
            setComments(comments => 
                comments.map(comment => 
                    comment.id === response.id ? response : comment
                )
            );
        }).catch(error => {
            console.error("댓글 업데이트 실패!", error);
        });
    };
    
    
    
    const handleDeleteComment = (commentId) => {
        deleteCommentApi(commentId, gubun).then(() => {
            setComments(comments.filter(comment => comment.id !== commentId));
        }).catch(error => {
            console.error("댓글 삭제 실패!", error);
        });
    };

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container maxWidth="md">
        <SalesPageHeader/>
            <div className="F_category-tabs-container">
                <div className="F_category-tabs">
                    <ul>
                        <li><Link to="/" className="F_tab-link">프로젝트 계획</Link></li>
                        <li><Link to="/updates" className="F_tab-link">업데이트</Link></li>
                        <li className="active"><Link to="/comments3" className="F_tab-link">커뮤니티</Link></li>
                        <li><Link to="/reviews3" className="F_tab-link">후기</Link></li>
                    </ul>
                </div>
            </div>
            <CreatorUpdateBox3 />
            <AddComment addComment={handleAddComment} />
            <CommentList3
                comments={currentComments}
                updateComment={handleUpdateComment}
                deleteComment={handleDeleteComment}
            />
            <Pagination
                commentsPerPage={commentsPerPage}
                totalComments={comments.length}
                paginate={paginate}
                currentPage={currentPage}
            />

                <style>
                {`
                    .pagination {
                        display: flex;
                        justify-content: center;
                        padding-left: 0;
                        list-style: none;
                        margin-top: 20px;
                    }
                    .page-item {
                        margin: 0 5px;
                    }
                    .page-link {
                        color: black;
                        padding: 8px 16px;
                        text-decoration: none;
                        border-radius: 5px;
                        cursor: pointer;
                    }
                `}
            </style>
        </Container>
    );
}

export default CommentsPrjt3;
