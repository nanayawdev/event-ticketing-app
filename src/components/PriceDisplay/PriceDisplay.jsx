import React from 'react';

const PriceDisplay = ({ priceInGHS }) => {
  return (
    <span>
      {new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS'
      }).format(priceInGHS)}
    </span>
  );
};

export default PriceDisplay; 