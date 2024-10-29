import React from 'react';
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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-gray-900 mb-10">
          Trusted by the world's most innovative teams
        </h2>
        <div className="mx-auto grid grid-cols-2 items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;