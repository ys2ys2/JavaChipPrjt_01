import React, { Component } from 'react';
import { Button } from "reactstrap";
import './Main.css';

class Category extends Component {
    render() {
        return (
            <div className="category-container">
                <div className="category-button-wrapper">
                    <Button color="primary" className="custom-button">홈</Button>
                    <div className="dropdown-content">
                        <div>인기</div>
                        <div>신규</div>
                        <div>오픈예정</div>
                    </div>
                </div>
                <div className="category-button-wrapper">
                    <Button color="info" className="custom-button">인기</Button>
                    <div className="dropdown-content">
                        <div>이번주 인기</div>
                        <div>이번달 인기</div>
                    </div>
                </div>
                <div className="category-button-wrapper">
                    <Button color="success" className="custom-button">신규</Button>
                    <div className="dropdown-content">
                        <div>뷰티</div>
                        <div>패션</div>
                        <div>푸드</div>
                    </div>
                </div>
                <div className="category-button-wrapper">
                    <Button color="warning" className="custom-button">오픈예정</Button>
                    <div className="dropdown-content">
                        <div>아트</div>
                        <div>키즈</div>
                        <div>캐릭터</div>
                        <div>반려동물</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;