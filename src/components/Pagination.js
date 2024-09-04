import React from 'react';

const Pagination = ({ commentsPerPage, totalComments, paginate, currentPage }) => {
    const pageNumbers = []; // 페이지 번호를 저장할 배열을 초기화합니다.

    // 페이지 수를 계산하고 페이지 번호를 pageNumbers 배열에 추가
    for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
        pageNumbers.push(i); // 계산된 페이지 번호를 배열에 추가
    }

    return (
        <nav> {/* 페이지네이션 네비게이션 영역을 정의 */}
            <ul className="pagination"> {/* 페이지네이션 리스트를 정의 */}
                {/* pageNumbers 배열을 순회하면서 각 페이지 번호에 대한 리스트 아이템을 생성 */}
                {pageNumbers.map(number => (
                    <li 
                        key={number} 
                        className={`page-item ${currentPage === number ? 'active' : ''}`} 
                        onClick={() => paginate(number)} // 클릭 시 페이지를 변경하는 함수 호출
                        style={{ cursor: 'pointer' }} // 커서 모양을 포인터로 변경
                    >
                        <span className={`page-link ${currentPage === number ? 'active' : ''}`}>
                            {number} {/* 페이지 번호를 출력 */}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;
