import { API_BASE_URL } from "../app-config";

//API 호출 함수
export function call(api, method, request) {  // call함수에 api, method, request 매개변수 받기
    // api는 경로 = /users, /posts 같은
    // method = http 메서드를 나타냄 -> get, post, put, delete
    // request = api 호출 시 전송할 데이터 포함하는 객체, 주로 post, put 요청에서 사용


    // 요청 옵션 설정, JSON 형태의 데이터를 처리
    let options = { 
        headers: new Headers({
            "Content-Type": "application/json", // 요청의 본문을 JSON 형식으로 설정
        }),
        url: API_BASE_URL + api,    // 기본 URL과 API 경로를 합쳐서 요청 URL 생성
        method: method,             // HTTP 메서드 설정 - get, post, put, delete 등등
    };

    if (request) {  // request 데이터 있으면 -> JSON 문자열로 변환해서 요청의 본문에 추가
        options.body = JSON.stringify(request); // 객체를 JSON 문자열로 변환해서 전송
    }

    // 캐싱 방지용 타임스탬프 추가
    const timestamp = new Date().getTime();
    options.url += `?_=${timestamp}`;   // URL에 쿼리 파라미터로 타임스탬프 추가해서 캐시 문제 방지

    // fetch API 사용해서 서버에 요청 보내기
    return fetch(options.url, options)
        .then(response => {
            // 응답이 비어있지 않으면 JSON으로 파싱
            if (response.status === 204 || response.status === 205) {
                // 서버가 No Content(204) 또는 Reset Content(205) 상태코드를 반환하면, 빈 객체를 반환
                return {}; // No Content 응답 처리
            }

            //응답 본문을 텍스트로 받아서 처리
            return response.text().then(text => {
                return text ? JSON.parse(text) : {}; // 응답 본문이 있으면 JSON으로 파싱, 없으면 빈 객체 반환
            }).then(json => {
                if (!response.ok) { // if 응답상태 !OK -> error
                    return Promise.reject(json);    // 응답이 오류면 JSON 데이터 -> error
                }
                return json;    // 정상 응답 -> JSON 데이터 반환
            });
        })
        .catch(error => {
            console.error("API call error:", error);
            throw error;    // 에러 다시 throw해서 호출한 곳에서 처리
        });
}

// 댓글 가져오기
export function fetchComments(gubun) {
    return call(`/comments/${gubun}`, "GET", null); // get 메서드로 댓글 가져오는 api 호출(/comments/${gubun})
}

// 댓글 추가하기
export function addComment(comment, gubun) {    
    const requestData = { ...comment, gubun };  // comment 와 gubun을 포함한 요청 데이터 생성
    return call(`/comments/${gubun}`, "POST", requestData); // POST 메서드로 댓글 추가 api 호출(/comments/${gubun})
}

// 댓글 업데이트하기
export function updateComment(comment, gubun) {
    const requestData = { ...comment, gubun };  // comment 와 gubun을 포함한 요청 데이터 생성
    return call(`/comments/${gubun}/${comment.id}`, "PUT", requestData).then(response => {
        if (response && response.createdAt) {   // if 응답 데이터에 createdAt 필드
            return {
                ...comment,
                text: response.text,
                createdAt: response.createdAt,
            };  // 응답 데이터의 text와 createdAt 포함한 새로운 객체 return 
        }
        throw new Error("업데이트된 데이터를 가져오는 데 실패했습니다.");
    });
}

// 댓글 삭제하기
export function deleteComment(commentId, gubun) {
    return call(`/comments/${gubun}/${commentId}`, "DELETE", null); // delete 메서드로 댓글 삭제 api 호출 /comments/${gubun}/${commentId}
}


// 창작자 업데이트 가져오기
export function fetchCreatorUpdate(gubun) {
    return call(`/creator_updates/latest/${gubun}`, "GET", null);   // get 메서드, api(creator_updates/latest/${gubun})
}

// 창작자 업데이트 추가
export function addOrUpdateCreatorUpdate(update, gubun) {
    const updateGubun = { ...update, gubun };   // update, gubun을 포함 데이터 생성
    return call(`/creator_updates/${gubun}`, "POST", updateGubun); // post 메서드, api(/creator_updates/${gubun})
}

// 창작자 게시글 작성 날짜 (JSON형식)
export function fetchLatestUpdateDate(gubun) {
    return call(`/creator_updates/latest-date/${gubun}`, "GET", null).then(response => {
        if (response.date) {    // 응답 데이터에 날짜가 있으면
            return response.date;   // 날짜 반환
        }
        throw new Error("데이터를 찾을 수 없습니다.");  // 날짜를 찾지 못했을 때의 에러 처리
    });
}

//리뷰 조회함수
export function fetchReviews(gubun) {
    return call(`/reviews/${gubun}`, "GET", null);  // get 메서드, api(/reviews/${gubun})
}
//리뷰 추가함수
export function addReview(review, gubun) {
    const requestData = { ...review, gubun};    // 리뷰 데이터와 구분(gubun)을 포함한 요청 데이터 생성
    return call(`/reviews/${gubun}`, "POST", requestData);  // post 메서드, api(/reviews/${gubun})
}

// 리뷰 수정하기
export function updateReview(review, gubun) {
    const requestData = { ...review, gubun };   // review와 gubun을 포함한 requestData 생성
    return call(`/reviews/${gubun}/${review.id}`, "PUT", requestData).then(response => {
        if (response && response.createdAt) {   // 응답 데이터에 createdAt 필드가 있으면 
            return {
                ...review,
                text: response.text,
                createdAt: response.createdAt,
            };  // 응답 데이터의 텍스트와 생성일자를 포함한 새로운 객체 반환
        }
        throw new Error("업데이트된 데이터를 가져오는 데 실패했습니다.");
    });
}


// 리뷰 삭제하기
export function deleteReview(reviewId, gubun) {
    return call(`/reviews/${gubun}/${reviewId}`, "DELETE", null); 
}