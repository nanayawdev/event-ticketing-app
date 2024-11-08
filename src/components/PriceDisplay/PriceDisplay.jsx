import React from 'react';

const PriceDisplay = ({ priceInGHS }) => {
  // Handle undefined, null, or invalid price values
  if (!priceInGHS && priceInGHS !== 0) {
    return <span className="text-gray-500">Price TBA</span>;
  }

  // Format the price with 2 decimal places
  const formattedPrice = Number(priceInGHS).toFixed(2);
  
  return (
    <span className="font-bold text-sea-green-500">
      GH₵ {formattedPrice}
    </span>
  );
};

export default PriceDisplay; 