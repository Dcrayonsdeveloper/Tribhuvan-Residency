import BlogDetail from "@/components/blog/BlogDetail1";
import React from "react"
import BlogsBanner from "@/components/blog/BlogsBanner";
import Header from "@/components/header/Header1";
import Footer from "@/components/footer/Footer1";



export default function Blog() {
    return (
        <>
        <Header />
        <BlogsBanner />
        <BlogDetail/>
        <Footer />
        </>
    );
  }