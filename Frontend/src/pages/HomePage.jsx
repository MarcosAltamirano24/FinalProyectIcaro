import React from 'react';
import Footer from '../components/common/Footer';
import IntroSection from '../components/common/IntroSection';
import FeaturedProductsSection from '../components/common/FeaturedProductSection';

const HomePage = () => {
  return (
    <>
      <IntroSection />
      <FeaturedProductsSection />
      <Footer />
    </>
  );
};

export default HomePage;
