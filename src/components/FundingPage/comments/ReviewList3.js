import React, { useState, useEffect } from 'react'; // React와 상태 관리 및 효과 훅 임포트
import { Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Avatar, IconButton, Chip } from '@mui/material'; // Material UI 컴포넌트 임포트
import { styled } from '@mui/system'; // styled 함수 임포트
import { fetchReviews, addReview, updateReview, deleteReview } from './service/ApiService'; // API 서비스 임포트
import './ReviewList.css'; // CSS 파일 임포트
import EditIcon from '@mui/icons-material/Edit'; // 편집 아이콘 임포트
import DeleteIcon from '@mui/icons-material/Delete'; // 삭제 아이콘 임포트
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'; // 좋아요 아이콘 임포트
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'; // 싫어요 아이콘 임포트
import FavoriteIcon from '@mui/icons-material/Favorite'; // 하트 아이콘 임포트
import SalesPageHeader from '../../FundingPage/Header/SalesPageHeader';
import Pagination from '../../Pagination'; // 페이지네이션 컴포넌트 임포트


const CustomPaper = styled(Paper)(({ theme }) => ({ // 스타일이 적용된 Paper 컴포넌트 생성
    boxShadow: 'none', // 그림자 없음
    borderRadius: 0, // 둥글기 없음
    padding: 0, // 패딩 없음
    backgroundColor: 'transparent', // 배경색 투명
}));

const CustomTextField = styled(TextField)({ // 스타일이 적용된 TextField 컴포넌트 생성
    '& .MuiOutlinedInput-root': { // MUI 입력 필드 스타일링
        '& fieldset': { // 필드셋 스타일링
            borderColor: '#F2620F', // 기본 테두리 색상
            borderWidth: '2px', // 테두리 두께
        },
        '&:hover fieldset': { // 호버 시 필드셋 스타일링
            borderColor: '#F2620F', // 호버 시 테두리 색상
        },
        '&.Mui-focused fieldset': { // 포커스 시 필드셋 스타일링
            borderColor: '#F2620F', // 포커스 시 테두리 색상
        },
    },
});

const CustomButton = styled(Button)({ // 스타일이 적용된 Button 컴포넌트 생성
    backgroundColor: '#F2620F', // 기본 배경 색상
    color: '#fff', // 텍스트 색상 흰색
    '&:hover': { // 호버 시 스타일링
        backgroundColor: '#D94C00', // 호버 시 배경 색상
    },
});

const Tag = styled(Chip)(({ theme, selected }) => ({ // 스타일이 적용된 Chip (태그) 컴포넌트 생성
    marginRight: '8px', // 태그 간 간격을 넓힘
    marginTop: '5px', // 태그 상단 간격 추가
    fontSize: '12px', // 글자 크기
    borderRadius: '7px', // 둥글기 정도
    padding: '7px', // 태그 내부 패딩
    backgroundColor: selected ? '#F29661' : '#FFFFFF', // 선택된 상태에 따른 배경색 변경
    '&:hover': { // 호버 시 스타일링
        backgroundColor: selected ? '#F29661' : '#FFFFFF', // 호버 시 배경색 변경
    },
}));

const ReviewText = styled('div')({ // 스타일이 적용된 div 컴포넌트 생성 (후기 텍스트용)
    marginBottom: '13px', // 후기와 사용자 정보 간 간격 추가
});

const ReviewMeta = styled('div')({ // 스타일이 적용된 div 컴포넌트 생성 (메타 정보용)
    fontSize: '12px', // 메타 정보 글자 크기
    color: '#888', // 메타 정보 글자 색상
    marginBottom: '15px', // 메타 정보와 태그들 간 간격 추가
});

const ReviewList = ({ gubun = 3 }) => { // ReviewList 컴포넌트 정의
    const [reviews, setReviews] = useState([]); // 리뷰 목록 상태 관리
    const [newComment, setNewComment] = useState(''); // 입력된 새로운 댓글 상태 관리
    const [editComment, setEditComment] = useState(''); // 수정 중인 댓글 상태 관리
    const [isEditing, setIsEditing] = useState(false); // 현재 편집 모드 여부 상태 관리
    const [currentReview, setCurrentReview] = useState(null); // 현재 편집 중인 리뷰 상태 관리
    const [isDialogOpen, setIsDialogOpen] = useState(false); // 다이얼로그 열림 상태 관리
    const [selectedTags, setSelectedTags] = useState([]); // 선택된 태그 상태 관리
    const [sparkleId, setSparkleId] = useState(null); // Sparkle 애니메이션을 적용할 리뷰 ID 상태 관리
    const [heartId, setHeartId] = useState(null); // Heart 애니메이션을 적용할 리뷰 ID 상태 관리

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
    const commentsPerPage = 5; // 페이지당 리뷰 수

    useEffect(() => { // 컴포넌트가 마운트될 때와 gubun이 변경될 때 리뷰 데이터를 로드
        loadReviews(); // 리뷰 로드 함수 호출
    }, [gubun]); // gubun이 변경될 때마다 useEffect 재실행

    const loadReviews = () => { // 리뷰 데이터를 불러오는 함수
        fetchReviews(gubun).then(response => { // fetchReviews 함수로 리뷰 데이터 가져오기
            if (response) { // 응답이 있으면
                const reviewsWithTags = response.map(review => ({ // 각 리뷰에 태그 상태 추가
                    ...review, // 기존 리뷰 데이터 유지
                    selectedTags: Array.isArray(review.selectedTags) ? review.selectedTags : [], // selectedTags가 없거나 배열이 아니면 빈 배열로 초기화
                }));
                setReviews(reviewsWithTags); // 리뷰 상태 업데이트
            }
        }).catch(error => { // 에러 발생 시
            console.error("리뷰를 로드하는데 실패했습니다.:", error); // 에러 로그 출력
        });
    };

    const handleNewCommentChange = (e) => { // 새로운 댓글 입력 시 상태 업데이트 함수
        setNewComment(e.target.value); // 입력된 댓글 값 업데이트
    };

    const handleEditCommentChange = (e) => { // 수정 중인 댓글 입력 시 상태 업데이트 함수
        setEditComment(e.target.value); // 입력된 댓글 값 업데이트
    };

    const handleKeyPress = (e) => { // 엔터 키 입력 시 호출되는 함수
        if (e.key === 'Enter') { // 입력 키가 엔터일 때
            handleButtonClick(); // 댓글 저장 함수 호출
        }
    };

    const indexOfLastReview = currentPage * commentsPerPage;
    const indexOfFirstReview = indexOfLastReview - commentsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleButtonClick = () => { // 댓글 저장 또는 업데이트 함수
        if (isEditing) { // 현재 편집 중이라면
            const updateData = { ...currentReview, text: editComment, createdAt: new Date().toISOString() }; // 업데이트할 데이터 생성
            updateReview(updateData, gubun).then(() => { // 리뷰 업데이트 API 호출
                setReviews(reviews.map(review =>  // 업데이트된 리뷰 목록으로 상태 업데이트
                    review.id === currentReview.id ? { ...updateData, selectedTags: review.selectedTags } : review // 태그 상태 유지
                ));  
                setEditComment(''); // 수정용 상태 초기화
                setIsEditing(false); // 편집 모드 해제
                setCurrentReview(null); // 현재 리뷰 초기화
                setIsDialogOpen(false); // 다이얼로그 닫기
                console.log("리뷰가 성공적으로 업데이트되었습니다."); // 성공 메시지 로그 출력
            }).catch(error => { // 에러 발생 시
                console.error("리뷰를 수정하는데 실패했습니다.:", error); // 에러 로그 출력
            });
        } else { // 새 댓글 작성 모드일 때
            const newReview = { username: "User", text: newComment, createdAt: new Date().toISOString(), selectedTags: [] }; // 새 리뷰 데이터 생성
            addReview(newReview, gubun).then(response => { // 리뷰 추가 API 호출
                setReviews([response, ...reviews]); // 새 리뷰를 포함한 리뷰 목록으로 상태 업데이트
                setNewComment(''); // 작성용 상태 초기화
            }).catch(error => { // 에러 발생 시
                console.error("리뷰를 추가하는데 실패했습니다.:", error); // 에러 로그 출력
            });
        }
    };

    const handleEditClick = (review) => { // 리뷰 편집 모드로 전환하는 함수
        setEditComment(review.text); // 편집할 리뷰의 텍스트를 수정용 상태에 설정
        setIsEditing(true); // 편집 모드 활성화
        setCurrentReview(review); // 현재 편집 중인 리뷰 설정
        setIsDialogOpen(true); // 다이얼로그 열기
    };

    const handleDeleteClick = (reviewId) => { // 리뷰 삭제 함수
        deleteReview(reviewId, gubun).then(() => { // 리뷰 삭제 API 호출
            setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId)); // 삭제된 리뷰를 제외한 리뷰 목록으로 상태 업데이트
        }).catch(error => { // 에러 발생 시
            console.error("리뷰를 삭제하는데 실패했습니다.:", error); // 에러 로그 출력
        });
    };

    const handleDialogClose = () => { // 다이얼로그 닫기 함수
        setIsDialogOpen(false); // 다이얼로그 닫기
        setIsEditing(false); // 편집 모드 해제
        setCurrentReview(null); // 현재 리뷰 초기화
        setEditComment(''); // 수정용 댓글 입력 필드 초기화
    };

    const handleThumbsUp = (reviewId) => { // 좋아요 클릭 시 호출되는 함수
        setHeartId(reviewId); // 현재 리뷰 ID를 heartId에 설정
        setTimeout(() => setHeartId(null), 600); // 600ms 후 heartId 초기화 (애니메이션 종료)
    };

    const handleThumbsDown = (reviewId) => { // 싫어요 클릭 시 호출되는 함수
        setSparkleId(reviewId); // 현재 리뷰 ID를 sparkleId에 설정
        setTimeout(() => setSparkleId(null), 400); // 400ms 후 sparkleId 초기화 (애니메이션 종료)
    };

    const handleTagClick = (reviewId, tag) => { // 태그 클릭 시 호출되는 함수
        setReviews((prevReviews) => // 리뷰 목록 상태 업데이트
            prevReviews.map((review) => { // 각 리뷰를 순회하며
                if (review.id === reviewId) { // 현재 클릭된 리뷰와 ID가 일치하면
                    const isSelected = Array.isArray(review.selectedTags) && review.selectedTags.includes(tag); // 태그가 선택되었는지 확인
                    const updatedTags = isSelected // 태그 상태 업데이트
                        ? review.selectedTags.filter((t) => t !== tag) // 선택된 태그는 제거
                        : [...review.selectedTags, tag]; // 선택되지 않은 태그는 추가
                    return { ...review, selectedTags: updatedTags }; // 업데이트된 태그 상태로 리뷰 반환
                }
                return review; // 다른 리뷰는 그대로 반환
            })
        );
    };

    return (
        <div>
        <SalesPageHeader/>
        <div className="F_fullContainer">
        <CustomPaper className="F_review-list-container"> {/* 스타일 적용된 Paper 컴포넌트로 리스트 컨테이너 생성 */}
            <div className="F_review-container"> {/* 리뷰 컨테이너 div */}
            </div>
            <Paper sx={{ width: '100%', margin: '25px auto', padding: '0px', boxShadow: 'none', border: 'none' }}> {/* 리뷰 작성 필드 영역 */}
                <div style={{ display: 'flex', alignItems: 'center' }}> {/* 필드 정렬 및 스타일링 */}
                    <TextField
                        label="리뷰를 작성하세요." // 필드 라벨
                        fullWidth
                        value={newComment} // 입력된 댓글 값
                        onChange={handleNewCommentChange} // 입력 값 변경 시 호출되는 함수
                        onKeyPress={handleKeyPress} // 키 입력 시 호출되는 함수
                        inputProps={{
                            style: {
                                color: '#000', // 텍스트 색상
                                fontFamily: 'NanumSquareNeo, sans-serif', // 폰트 스타일
                            }
                        }}
                        sx={{ flexGrow: 1 }} // 텍스트 필드 크기 확장
                    />
                    <CustomButton
                        variant="contained" // 버튼 스타일
                        onClick={handleButtonClick} // 버튼 클릭 시 호출되는 함수
                        sx={{
                            padding: '0 16px', // 버튼 내부 패딩
                            fontSize: '15px', // 버튼 폰트 크기
                            marginLeft: '13px', // 왼쪽 마진
                            lineHeight: 'normal', // 라인 높이
                            height: '56px', // 버튼 높이
                            display: 'flex', // 플렉스 박스
                            alignItems: 'center', // 수직 정렬
                            justifyContent: 'center', // 수평 정렬
                            whiteSpace: 'nowrap', // 줄바꿈 방지
                        }}
                    >
                        {isEditing ? '저장하기' : '작성하기'} {/* 편집 중인지 여부에 따라 버튼 텍스트 변경 */}
                    </CustomButton>
                </div>
            </Paper>

            <ul className="F_review-list"> {/* 리뷰 목록 ul */}
            {currentReviews.map((review) => ( // 각 리뷰를 순회하여 li 생성
                    <li key={review.id} className="F_review-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}> {/* 리스트 아이템 스타일링 */}
                        <div style={{ display: 'flex', alignItems: 'center' }}> {/* 리스트 아이템 내부 컨텐츠 정렬 */}
                            <Avatar sx={{ bgcolor: '#ccc', marginRight: '10px' }}>{review.username[0]}</Avatar> {/* 사용자 아바타 */}
                            <div>
                                <ReviewText>{review.text}</ReviewText> {/* 리뷰 텍스트 */}
                                <ReviewMeta> {/* 리뷰 메타 정보 */}
                                    <span className="F_review-username">{review.username}</span> {/* 사용자 이름 */}
                                    <span className="F_review-date">{new Date(review.createdAt).toLocaleString()}</span> {/* 작성 날짜 */}
                                </ReviewMeta>
                                <div>
                                    {/* 태그들 */}
                                    <Tag label="유용해요" variant="outlined" onClick={() => handleTagClick(review.id, "유용해요")} selected={Array.isArray(review.selectedTags) && review.selectedTags.includes("유용해요")} />
                                    <Tag label="창의적이에요" variant="outlined" onClick={() => handleTagClick(review.id, "창의적이에요")} selected={Array.isArray(review.selectedTags) && review.selectedTags.includes("창의적이에요")} />
                                    <Tag label="특별해요" variant="outlined" onClick={() => handleTagClick(review.id, "특별해요")} selected={Array.isArray(review.selectedTags) && review.selectedTags.includes("특별해요")} />
                                    <Tag label="퀄리티가 좋아요" variant="outlined" onClick={() => handleTagClick(review.id, "퀄리티가 좋아요")} selected={Array.isArray(review.selectedTags) && review.selectedTags.includes("퀄리티가 좋아요")} />
                                    <Tag label="의미 있어요" variant="outlined" onClick={() => handleTagClick(review.id, "의미 있어요")} selected={Array.isArray(review.selectedTags) && review.selectedTags.includes("의미 있어요")} />
                                    <Tag label="소통이 잘 돼요" variant="outlined" onClick={() => handleTagClick(review.id, "소통이 잘 돼요")} selected={Array.isArray(review.selectedTags) && review.selectedTags.includes("소통이 잘 돼요")} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}> {/* 리뷰 수정/삭제 및 좋아요/싫어요 버튼 컨테이너 */}
                            <IconButton onClick={() => handleEditClick(review)} sx={{ color: "#F2620F", marginRight: '5px' }}> {/* 리뷰 편집 버튼 */}
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(review.id)} sx={{ color: '#F2620F' }}> {/* 리뷰 삭제 버튼 */}
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={() => handleThumbsUp(review.id)} sx={{ color: '#1E90FF', position: 'relative' }}> {/* 좋아요 버튼 */}
                                <ThumbUpAltIcon />
                                {heartId === review.id && ( // 하트 애니메이션 조건부 렌더링
                                    <FavoriteIcon className="heart" />
                                )}
                            </IconButton>
                            <IconButton onClick={() => handleThumbsDown(review.id)} sx={{ color: sparkleId === review.id ? '#F44336' : '#F44336', transition: 'color 0.4s ease' }}> {/* 싫어요 버튼 */}
                                <ThumbDownAltIcon className={sparkleId === review.id ? 'sparkle' : ''} /> {/* 스파클 애니메이션 조건부 렌더링 */}
                            </IconButton>
                        </div>
                    </li>
                ))}
            </ul>

            {/* 페이지네이션 컴포넌트를 추가 */}
            <Pagination
                commentsPerPage={commentsPerPage}
                totalComments={reviews.length}
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

            <Dialog 
                open={isDialogOpen} // 다이얼로그 열림 상태
                onClose={handleDialogClose} // 다이얼로그 닫기 함수
                maxWidth="md" // 다이얼로그 최대 너비
                fullWidth // 전체 너비를 사용하도록 설정

                PaperProps={{
                    style: {
                        borderRadius: '10px', // 다이얼로그 모서리 둥글기
                        padding: '20px', // 다이얼로그 내부 패딩
                        minWidth: '400px', // 최소 너비
                        width: '600px', // 너비
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: 'bold' }}>리뷰 수정</DialogTitle> {/* 다이얼로그 타이틀 */}
                <DialogContent>
                    <CustomTextField
                        fullWidth // 전체 너비 차지
                        value={editComment} // 수정 중인 댓글 값
                        onChange={handleEditCommentChange} // 댓글 변경 시 호출되는 함수
                        onKeyPress={handleKeyPress} // 키 입력 시 호출되는 함수
                        variant='outlined' // 아웃라인 스타일
                        inputProps={{
                            style: {
                                color: '#000', // 텍스트 색상
                                fontFamily: 'NanumSquareNeo, sans-serif', // 폰트 스타일
                            }
                        }}
                        sx={{ padding: '10px' }} // 텍스트 필드 패딩
                    />
                </DialogContent>
                <DialogActions>
                    <CustomButton onClick={handleDialogClose}>취소</CustomButton> {/* 취소 버튼 */}
                    <CustomButton onClick={handleButtonClick}>저장하기</CustomButton> {/* 저장 버튼 */}
                </DialogActions>
            </Dialog>
        </CustomPaper>
    </div>
</div>
    );
};

export default ReviewList; // 컴포넌트 익스포트
