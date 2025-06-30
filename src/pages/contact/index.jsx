import React from 'react'
import Header from "../../components/header/Header1";
import Footer from '@/components/footer/Footer1';
import ContactBanner from "@/components/contact/ContactBanner.jsx"
import ContactUs from '@/components/contact/Contact';
import Location from '@/components/Rooms/Map';

function About() {
  return (
    <div>
      <Header />
        <ContactBanner />
        <ContactUs />
        <Location />
      <Footer />
    </div>
  )
}

export default About;
