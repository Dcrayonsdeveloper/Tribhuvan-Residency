import React from "react";
import Bloggrid from "@/components/blog/Bloggrid";
import Header from "@/components/header/Header1";
import Footer from "@/components/footer/Footer1";
import BlogsBanner from "@/components/blog/BlogsBanner";

export default function Blogs() {
  return (
    <>
      <Header />
      <BlogsBanner />
      <Bloggrid />
      <Footer />
    </>
  );
}
