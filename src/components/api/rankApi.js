// src/api/rankApi.js
import { API_BASE_URL } from '../FundingPage/comments/app-config';

// API 호출 함수
export function call(api, method, request) {
    let options = {
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    const url = `${API_BASE_URL}${api}`;
    const timestamp = new Date().getTime();  // 캐싱을 방지하기 위해 타임스탬프를 추가

    const finalUrl = `${url}?_=${timestamp}`;

    return fetch(finalUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);  // 상세한 오류 메시지 추가
            }
            return response.json();
        })
        .catch(error => {
            console.error("API call error:", error);  // 콘솔에 에러 로그 출력
            throw error;
        });
}

// 랭킹 리스트 가져오기
export function fetchRankingList() {
    return call(`/ranking-list`, "GET", null);  // 경로와 메서드를 백엔드와 일치시킴
}

// 랭킹의 r_like 증가시키기
export function updateRankingLike(rankId) {
    const encodedRankId = encodeURIComponent(rankId);  // ID를 URL-safe 하게 인코딩
    return call(`/ranking-list/${encodedRankId}/like`, "POST", null);  // 경로와 메서드를 백엔드와 일치시킴
}
