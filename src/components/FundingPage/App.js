import React from 'react';
// import { Route, Routes } from 'react-router-dom';
import ProductItem from '../FundingPage/Main/ProductItem';
import SalesPage from '../FundingPage/Main/SalesPage';
import SalesPageHeader from './Header/SalesPageHeader';
import './App.css';
import Guide from '../MainPage/Guide';

function FundingPageApp() {
  return (
    <div className="App">
      <SalesPageHeader/>
      <ProductItem />
      <SalesPage gubun={1} />
      <Guide/>
    </div>
  );
}

export default FundingPageApp;
