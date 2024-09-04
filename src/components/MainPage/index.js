import React from 'react'; // React 라이브러리를 임포트합니다.
import ReactDOM from 'react-dom'; // ReactDOM 라이브러리를 임포트합니다.
import App from './App'; // App 컴포넌트를 임포트합니다.
import './Main.css'; // Main.css 파일을 임포트합니다.

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render( // ReactDOM의 render 메서드를 호출합니다.
//   <React.StrictMode> {/* React의 StrictMode를 사용합니다. */}
//     <App /> {/* App 컴포넌트를 렌더링합니다. */}
//   </React.StrictMode>,
//   document.getElementById('root') // 'root' ID를 가진 DOM 요소에 렌더링합니다.
// );