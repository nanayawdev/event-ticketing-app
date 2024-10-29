import React from 'react';
import './SocialBar.css';

const SocialBar = () => {
  const socialLinks = [
    { name: 'Facebook', color: '#3b5998', url: 'https://www.facebook.com/nanayawisrael2018/' },
    { name: 'Twitter', color: '#1da1f2', url: 'https://twitter.com/nycre8ivestudio/' },
    { name: 'Instagram', color: '#c32aa3', url: 'https://www.instagram.com/nycre8ivestudio/' },
    { name: 'LinkedIn', color: '#0077b5', url: 'https://www.linkedin.com/in/nanayawisrael/' },
    { name: 'YouTube', color: '#ff0000', url: 'https://www.youtube.com/@nyshotit/' }
  ];

  return (
    <div className="social-bar">
      {socialLinks.map((link, index) => (
        <React.Fragment key={link.name}>
          <a
            href={link.url}
            className="social-link"
            style={{ backgroundColor: link.color }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
          {index < socialLinks.length - 1 && <div className="social-divider"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SocialBar;
