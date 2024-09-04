// src/components/Main/ProductList.js
import React from 'react';
import ProductItem from './ProductItem';

function ProductList() {
  const products = [
    { id: 1, name: 'Product 1', price: '$10' },
    { id: 2, name: 'Product 2', price: '$20' },
    { id: 3, name: 'Product 3', price: '$30' },
  ];

  return (
    <div className="F_ProductList">
      {products.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
