import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; // useLocation 추가
import AddComment from './AddComments';
import CommentList from './CommentList';
import Pagination from '../../Pagination';
import CreatorUpdateBox from './CreatorUpdateBox';  
import { fetchComments, addComment as addCommentApi, updateComment as updateCommentApi, deleteComment as deleteCommentApi } from './service/ApiService';
import ReviewList from './ReviewList';
import MyPage from '../MyPage/MyPage';
import SalesPageHeader from '../../FundingPage/Header/SalesPageHeader';

const CommentsPrjt = ({ gubun = 1 }) => {
    const location = useLocation(); // 현재 경로를 가져옵니다.
    const [comments, setComments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    const [selectedTab, setSelectedTab] = useState(() => {
        if (location.pathname === '/funding/updates') return 'updates';
        if (location.pathname === '/funding/reviews') return 'reviews';
        return 'comments';
    }); // 초기값 설정

    const commentsPerPage = 10;

    useEffect(() => {
        if (selectedTab === 'comments') {
            loadComments();
        }
    }, [gubun, selectedTab]);

    function loadComments() {
        fetchComments(gubun).then(response => {
            setComments(response);
        }).catch(error => {
            console.error("댓글 불러오기 실패!", error);
        });
    }

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
                    <li><Link to="/funding" className="F_tab-link">프로젝트 계획</Link></li>
                        <li className={selectedTab === 'updates' ? 'active' : ''}>
                            <Link to="/updates" className="F_tab-link" onClick={() => setSelectedTab('updates')}>업데이트</Link>
                        </li>
                        <li className={selectedTab === 'comments' ? 'active' : ''}>
                    <Link to="/comments" className="F_tab-link" onClick={() => setSelectedTab('comments')}>커뮤니티</Link>
                    </li>
                        <li className={selectedTab === 'reviews' ? 'active' : ''}>
                            <Link to="/reviews" className="F_tab-link" onClick={() => setSelectedTab('reviews')}>후기</Link>
                        </li>
                    </ul>
                </div>
            </div>
            
            {selectedTab === 'comments' && (
                <>
                    <CreatorUpdateBox />
                    <AddComment addComment={handleAddComment} />
                    <CommentList
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
                </>
            )}

            {selectedTab === 'updates' && (
                <MyPage />  // MyPage 컴포넌트를 표시 (업데이트 페이지)
            )}

            {selectedTab === 'reviews' && (
                <ReviewList gubun={gubun} /> // ReviewList 컴포넌트를 표시
            )}
            
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
    );}

export default CommentsPrjt;
