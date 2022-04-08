import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
// import { Carousel } from 'bootstrap';
import HomeCarousel from '../components/sections/Testimonial';
import ControlledCarousel from '../components/sections/Carousel';
import Timeline from '../components/sections/Timeline';
// import Cta from '../components/sections/Cta';

const Home = () => {

  return (
    <>
      <Hero className="illustration-section-01" />
      {/* <HomeCarousel topDivider /> */}
      <Testimonial />
      <Timeline />
      {/* <FeaturesTiles /> */}
      {/* <Carousel invertMobile topDivider imageFill className="illustration-section-02" /> */}
      {/* <Cta split /> */}
    </>
  );
}

export default Home;