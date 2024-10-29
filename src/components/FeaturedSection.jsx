import React from 'react';
import './FeaturedSection.css';

const FeaturedSection = ({ title, description, image, logos, button, coverText }) => {
  return (
    <div className="featured-column">
      <h2 className="featured-title">{title}</h2>
      <p className="featured-description">{description}</p>
      {image && (
        <div className="featured-image-container">
          <img src={image} alt={title} className="featured-image" />
        </div>
      )}
      {logos && (
        <div className="featured-logos">
          {logos.map((logo, index) => (
            <img key={index} src={logo} alt="Partner logo" className="partner-logo" />
          ))}
        </div>
      )}
      {coverText && <p className="featured-cover-text">{coverText}</p>}
      {button && (
        <button className="featured-button">{button}</button>
      )}
    </div>
  );
};

export default FeaturedSection;
