import React from 'react';
import ProductItem from '../MainSink2/ProductItem';
import SalesPage from '../MainSink2/SalesPage';
import SalesPageHeader from '../../FundingPage/Header/SalesPageHeader'
import './App.css';
import Guide from '../../MainPage/Guide';

function FundingPage3App() {
  return (
    <div className="App">
      <SalesPageHeader/>
      <ProductItem />
      <SalesPage gubun={1} />
      <Guide/>
    </div>
  );
}

export default FundingPage3App;
