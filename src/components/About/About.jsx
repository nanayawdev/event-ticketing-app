import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import Why from '../Why/Why'; // Import the Why component
import Brands from '../Brands/Brands'; // Import the Clients component
import Footer from '../Footer/Footer'; // Import the Footer component

// Import your images here
import image1 from '../../assets/images/stonebwoy.jpeg';
import image2 from '../../assets/images/epixode.jpeg';
import image3 from '../../assets/images/amakyedede.jpeg';
import image4 from '../../assets/images/perezmusik.jpeg';
import image5 from '../../assets/images/mogbeats.jpeg';
import image6 from '../../assets/images/stoneb.jpeg';
import image7 from '../../assets/images/photoshoot.jpeg';
import image8 from '../../assets/images/jkstudio.jpeg';
import image9 from '../../assets/images/jkstudiios2.jpeg';
// ... import more images as needed

const About = () => {
  const allImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9];
  const [currentImages, setCurrentImages] = useState([image1, image2, image3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages(prevImages => {
        const newImages = [];
        const availableImages = [...allImages];

        for (let i = 0; i < 3; i++) {
          if (availableImages.length === 0) {
            // If we've used all images, reset the available images
            availableImages.push(...allImages);
          }
          const randomIndex = Math.floor(Math.random() * availableImages.length);
          newImages.push(availableImages[randomIndex]);
          availableImages.splice(randomIndex, 1);
        }

        return newImages;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [allImages]);

  return (
    <>
      <div className="about-container">
        <div className="about-header">
          <span className="about-label">Events Reimagined</span>
          <h1 className="about-title">Creating Unforgettable Experiences</h1>
          <p className="about-description">
            Join us in revolutionizing the way events are planned and experienced. Our team of creative minds and industry experts craft innovative solutions that transform ordinary gatherings into extraordinary memories. From intimate meetups to large-scale conferences, we've got you covered.
          </p>
          <Link to="/dashboard/create-event" className="create-event-btn">Create Event</Link>
        </div>
      </div>
      <div className="event-image-container">
        {currentImages.map((image, index) => (
          <div key={index} className="image-column">
            <img src={image} alt={`Event experience ${index + 1}`} className="about-event-image" />
          </div>
        ))}
      </div>
      <Why />
      <Brands />
      <Footer /> {/* Add the Footer component here */}
    </>
  );
};

export default About;
