import React from 'react';
import './Clients.css';

// Import client logos
import client1Logo from '../assets/icons/visaxl.png';
import client2Logo from '../assets/icons/stripexl.png';
import client3Logo from '../assets/icons/card.png';
import client4Logo from '../assets/icons/apple-pay.png';
import client5Logo from '../assets/icons/google-pay.png';
import client6Logo from '../assets/icons/nike.png';

const Clients = () => {
  const clients = [
    { name: 'Client 1', logo: client1Logo },
    { name: 'Client 2', logo: client2Logo },
    { name: 'Client 3', logo: client3Logo },
    { name: 'Client 4', logo: client4Logo },
    { name: 'Client 5', logo: client5Logo },
    { name: 'Client 6', logo: client6Logo },
  ];

  return (
    <div className="clients-container">
      <h2 className="clients-title">Clients We've Worked With</h2>
      <div className="client-logos">
        {clients.map((client, index) => (
          <div key={index} className="client-logo">
            <img src={client.logo} alt={client.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;