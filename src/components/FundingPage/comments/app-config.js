// let backendHost; 
// backendHost 변수를 선언합니다. 이 변수는 백엔드 서버의 호스트 주소를 저장하기 위해 사용됩니다.

// const hostname = window && window.location && window.location.hostname; 
// hostname 변수를 선언합니다. 이 변수는 현재 웹 페이지가 호스팅되고 있는 호스트 이름을 저장합니다.
// window 객체가 존재하고, window.location 객체가 존재하고, window.location.hostname이 존재할 경우에 hostname에 해당 값을 할당합니다.

// if(hostname === "locahhost"){ 
//     backendHost = "http://localhost:9027"; 
// }
// 호스트 이름이 "localhost"일 경우, 즉 개발 환경에서 실행 중일 경우,
// backendHost 변수를 "http://localhost:9027"로 설정합니다. 이 부분은 주석 처리되어 있어 현재는 실행되지 않습니다.

export const API_BASE_URL = "http://localhost:9000"; 
// API_BASE_URL 상수를 선언하고 "http://localhost:9000" 값을 할당합니다. 
// 이 상수는 API 요청을 보낼 때 사용할 기본 URL을 지정합니다.
