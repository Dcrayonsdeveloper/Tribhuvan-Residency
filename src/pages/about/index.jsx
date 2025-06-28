import React from 'react'
import Header from "../../components/header/Header1";
import Footer from '@/components/footer/Footer1';
import AboutBanner from '@/components/about/AboutBanner';
import TwoImageWithContent from '@/components/about/TwoImageWithContent';
import ImageWithContent from '@/components/about/ImageWithContent';
import Testimonial from '@/components/Testimonial/Testimonial';
import TeamSection from '@/components/about/Team';

function About() {
  return (
    <div>
      <Header />
        <AboutBanner />
        <TwoImageWithContent />
        <ImageWithContent />
        <TeamSection />
        <Testimonial />
      <Footer />
    </div>
  )
}

export default About;
