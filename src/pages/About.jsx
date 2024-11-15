import React from 'react';
import OurStory from '../components/OurStory/OurStory';
import Features from '../components/Features/Features';
import Stats from '../components/Stats/Stats';
import Brands from '../components/Brands/Brands';
import Divider from '../components/Divider/Divider';

export default function About() {
  return (
    <>
      <Features />
      <Stats />
      <Brands />
      <Divider />
      <OurStory />
    </>
  )
}
