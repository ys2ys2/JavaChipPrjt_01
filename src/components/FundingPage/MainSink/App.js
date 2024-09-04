import React from 'react';
// import { Route, Routes } from 'react-router-dom';
import ProductItem from '../MainSink/ProductItem';
import SalesPage from '../MainSink/SalesPage';
// import CommentsPrjt from '../FundingPage/comments/CommentsPrjt';
// import MyPage from '../FundingPage/MyPage/MyPage';
// import ReviewList from '../FundingPage/comments/ReviewList';
import SalesPageHeader from '../../FundingPage/Header/SalesPageHeader'
import './App.css';
import Guide from '../../MainPage/Guide';

function FundingPage2App() {
  return (
    <div className="App">
      <SalesPageHeader/>
      <ProductItem />
      <SalesPage gubun={2} />
      <Guide/>
      {/* <Routes>
        <Route path="/" element={<SalesPage gubun={1} />} />
        <Route path="comments" element={<CommentsPrjt gubun={1} />} />
        <Route path="updates" element={<MyPage gubun={1} />} />
        <Route path="reviews" element={<ReviewList gubun={1} />} />
      </Routes> */}
    </div>
  );
}

export default FundingPage2App;
