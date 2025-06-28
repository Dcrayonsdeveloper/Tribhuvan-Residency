import React from "react";
import Header from "@/components/header/Header1";
import Hero1 from "@/components/Hero/Hero1";
import AboutUsSection from "@/components/Home/AboutHero";
import Facilities from "@/components/Home/HomeFacilites";
import RoomsCarousel from "@/components/Home/RoomsCarousal";
import Testimonial from "@/components/Testimonial/Testimonial";
import ParallaxSection from "@/components/Home/ParallaxSection";
import ThreeImageWithContent from "@/components/Home/ThreeImageWithContent";
import Footer from "@/components/footer/Footer1";
import NewsArticlesSection from "@/components/Home/HomeBlog";

function Home() {
  return (
    <div>
      <Header />
      <Hero1 />
      <AboutUsSection />
      <Facilities />
      <RoomsCarousel />
      <NewsArticlesSection />

      <ParallaxSection />

      <ThreeImageWithContent />
      <Testimonial />

      <Footer />
    </div>
  );
}

export default Home;
