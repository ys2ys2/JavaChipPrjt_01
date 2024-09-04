import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import AddComment from './AddComments';
import Pagination from '../../Pagination';
import { fetchComments, addComment as addCommentApi, updateComment as updateCommentApi, deleteComment as deleteCommentApi } from './service/ApiService'; 
// API 호출 관련 함수들을 service/ApiService에서 가져오기 (댓글 불러오기, 추가하기, 수정하기, 삭제하기)
import CommentList2 from './CommentList2';
import CreatorUpdateBox2 from './CreatorUpdateBox2';
import SalesPageHeader from '../../FundingPage/Header/SalesPageHeader';



const CommentsPrjt2 = ({ gubun = 2 }) => { // 컴포넌트 : CommentsPrjt2, gubun값 = 2
    const [comments, setComments] = useState([]); // comments 상태와 그 상태를 업데이트하는 setComments = []
    const [currentPage, setCurrentPage] = useState(1); // currentPage 상태와 그 상태를 업데이트하는 setCurrentPage 함수를 선언, 초기값은 1
    const commentsPerPage = 10; // 페이지당 보여줄 댓글 수를 10개로 설정

    useEffect(() => { 
        loadComments(); // 컴포넌트가 마운트되거나 gubun이 변경될 때 loadComments 함수를 호출
    }, [gubun]); // gubun 값이 변경될 때마다 useEffect가 다시 실행됨

    const loadComments = () => { // 댓글을 불러오는 함수 정의
        fetchComments(gubun).then(response => { 
            setComments(response); // 서버로부터 댓글을 불러와서 comments 상태에 저장
        }).catch(error => {
            console.error("댓글 불러오기 실패!", error); // 에러 발생 시 콘솔에 에러 메시지 출력
        });
    };

    const handleAddComment = (commentText) => { // 댓글을 추가하는 함수 정의
        const newComment = { username: "사용자", text: commentText }; // 새로운 댓글 객체 생성
        addCommentApi(newComment, gubun).then(response => { 
            setComments([response, ...comments]); // 서버에 댓글 추가 후 새로운 댓글을 포함하여 comments 상태를 업데이트
        }).catch(error => {
            console.error("댓글 작성 실패!", error); // 에러 발생 시 콘솔에 에러 메시지 출력
        });
    };

    const handleUpdateComment = (updatedComment) => { // 댓글을 업데이트하는 함수 정의
        updateCommentApi(updatedComment, gubun).then(response => { 
            setComments(comments => 
                comments.map(comment => 
                    comment.id === response.id ? response : comment 
                    // 댓글 ID가 일치하면 업데이트된 댓글로 교체하고, 아니면 그대로 유지
                )
            );
        }).catch(error => {
            console.error("댓글 업데이트 실패!", error); // 에러 발생 시 콘솔에 에러 메시지 출력
        });
    };
    
    const handleDeleteComment = (commentId) => { // 댓글을 삭제하는 함수 정의
        deleteCommentApi(commentId, gubun).then(() => { 
            setComments(comments.filter(comment => comment.id !== commentId)); 
            // 서버에서 댓글 삭제 후, 삭제된 댓글을 제외한 새로운 comments 상태로 업데이트
        }).catch(error => {
            console.error("댓글 삭제 실패!", error); // 에러 발생 시 콘솔에 에러 메시지 출력
        });
    };

    const indexOfLastComment = currentPage * commentsPerPage; 
    // 현재 페이지의 마지막 댓글 인덱스를 계산
    const indexOfFirstComment = indexOfLastComment - commentsPerPage; 
    // 현재 페이지의 첫 번째 댓글 인덱스를 계산
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment); 
    // 현재 페이지에 표시할 댓글들을 잘라내어 currentComments로 설정

    const paginate = (pageNumber) => setCurrentPage(pageNumber); 
    // 페이지 번호를 클릭할 때 현재 페이지를 변경하는 함수 정의

    return (
        <Container maxWidth="md">
        <SalesPageHeader/>
            {/* MUI의 Container 컴포넌트를 사용하여 콘텐츠를 가운데 정렬 */}
            <div className="F_category-tabs-container">
                <div className="F_category-tabs">
                    <ul>
                        <li><Link to="/" className="F_tab-link">프로젝트 계획</Link></li>
                        <li><Link to="/updates" className="F_tab-link">업데이트</Link></li>
                        <li className="active"><Link to="/comments2" className="F_tab-link">커뮤니티</Link></li>
                        <li><Link to="/reviews2" className="F_tab-link">후기</Link></li>
                    </ul>
                </div>
            </div>
            <CreatorUpdateBox2 /> 
            {/* CreatorUpdateBox 컴포넌트 렌더링 */}
            <AddComment addComment={handleAddComment} /> 
            {/* AddComment 컴포넌트를 렌더링하고 handleAddComment 함수를 props로 전달 */}
            <CommentList2
                comments={currentComments}
                updateComment={handleUpdateComment}
                deleteComment={handleDeleteComment}
            /> 
            {/* CommentList2 컴포넌트를 렌더링하고 현재 페이지의 댓글, 업데이트 및 삭제 함수들을 props로 전달 */}
            
            <Pagination
                commentsPerPage={commentsPerPage}
                totalComments={comments.length}
                paginate={paginate}
                currentPage={currentPage}
            /> 
            
            {/* Pagination 컴포넌트를 렌더링하고 페이지당 댓글 수, 전체 댓글 수, 페이지 변경 함수, 현재 페이지를 props로 전달 */}
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
            {/* 페이지네이션 스타일을 정의하는 CSS */}
        </Container>
    );
}

export default CommentsPrjt2;
