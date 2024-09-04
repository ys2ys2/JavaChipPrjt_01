import React from "react";
import './SalesPageFooter.css';

const SalesPageFooter =() => {
    return (
        <footer className="footer">
            <div className="footer-content">
            <div className="footer-left">
            <h3>펀딩할래! 고객센터</h3>
                <ul>
                    <li>채팅 상담하기 </li>
                    <li>문의 등록하기 </li>
                    <li>도움말 센터 바로가기</li>
                    <li>Contact for Global</li>
                </ul>
                <p className="call">상담 가능 시간<br/>평일 오전 9시 - 오후 6시 (주말, 공휴일 제외)</p>
            </div>
            <div className="footer-right">
                <p>
                    펀딩할래!(주) | 대표이사 진영신 | 사업자등록번호 123-00-12345 | 통신판매업신고번호 2024-천안A-1234 | 충청남도 천안시 동남구 대흥로 251 7층
                </p>
                <p>이메일 상담 info@human.kr | 유선 상담 1588-0000 | © 펀딩할래! co., Ltd </p>
                <p>
                    일부 상품의 경우 펀딩할래!는 통신판매중개자이며 통신판매 당사자가 아닙니다. 해당되는 상품의 경우 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.
                    </p>
                    <p>
                    펀딩할래! 사이트의 리뷰와 정보, 메이커 정보, 스토리 정보, 콘텐츠, UI 등에 대한 무단복제, 전송, 배포, 프레임, 스크래핑 등의 행위는
                    저작권법, 콘텐츠산업 진흥법 등 관련 법령에 의하여 엄격히 금지됩니다.
                    콘텐츠산업 진흥법에 따른 표시</p>
            
            </div>

            </div>

        </footer>
    );
};
export default SalesPageFooter;