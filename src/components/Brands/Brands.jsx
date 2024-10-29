import React from 'react';
import './Brands.css';

// Import client logos
import client1Logo from '../../assets/icons/visaxl.png';
import client2Logo from '../../assets/icons/stripexl.png';
import client3Logo from '../../assets/icons/card.png';
import client4Logo from '../../assets/icons/apple-pay.png';
import client5Logo from '../../assets/icons/google-pay.png';
import client6Logo from '../../assets/icons/nike.png';

const Brands = () => {
  const brands = [
    { name: 'Brand 1', logo: client1Logo },
    { name: 'Brand 2', logo: client2Logo },
    { name: 'Brand 3', logo: client3Logo },
    { name: 'Brand 4', logo: client4Logo },
    { name: 'Brand 5', logo: client5Logo },
    { name: 'Brand 6', logo: client6Logo },
  ];

  return (
    <div className="brands-container">
      <h2 className="brands-title">Brands We've Worked With</h2>
      <div className="brand-logos">
        {brands.map((brand, index) => (
          <div key={index} className="brand-logo">
            <img src={brand.logo} alt={brand.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;