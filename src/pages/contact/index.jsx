import React from 'react'
import Header from "../../components/header/Header1";
import Footer from '@/components/footer/Footer1';
import ContactBanner from "@/components/contact/ContactBanner.jsx"
import ContactUs from '@/components/contact/Contact';

function Contact() {
  return (
    <div>
      <Header />
        <ContactBanner />
        <ContactUs />
      <Footer />
    </div>
  )
}

export default Contact;
