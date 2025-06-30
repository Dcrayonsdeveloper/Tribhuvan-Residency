import React from "react";
import FAQ from "@/components/faq/Faq";
import Header from "@/components/header/Header1";
import Footer from "@/components/footer/Footer1";
import FaqBanner from "@/components/faq/faqBanner";
function faqs() {
  return (
    <div>
      <Header />
      <FaqBanner />
      <FAQ />
      <Footer />
    </div>
  );
}

export default faqs;
