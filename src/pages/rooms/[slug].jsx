import React, { useState } from "react";
import Header from "../../components/header/Header1";
import Footer from "@/components/footer/Footer1";
import RoomDetailBanner from "@/components/Rooms/Banner2";
import RoomInfoCard from "@/components/Rooms/AboutRooms";
import RoomsGallery from "@/components/Rooms/RoomsGallery";
import RoomDetailSection from "@/components/Rooms/RoomInfo";
import Location from "@/components/Rooms/Map";
import ClientsReview from "@/components/Review/ClientsReview";
import AddReview from "@/components/Review/AddReview";
import SimilarRooms from "@/components/Rooms/SimilarRoom";
import { rooms } from "@/data/site";
import { openBookingEngine } from "@/lib/booking";

export async function getStaticPaths() {
  return {
    paths: rooms.map((r) => ({ params: { slug: r.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const room = rooms.find((r) => r.slug === params.slug) || null;
  if (!room) return { notFound: true };
  return { props: { room } };
}

function RoomDetail({ room }) {
  const [submittedReview, setSubmittedReview] = useState(null);

  return (
    <div>
      <Header />
      <RoomDetailBanner room={room} />
      <RoomInfoCard room={room} onBook={openBookingEngine} />
      <RoomsGallery room={room} />
      <RoomDetailSection room={room} onBook={openBookingEngine} />
      <Location />
      <ClientsReview newReview={submittedReview} />
      <AddReview onReviewSubmit={setSubmittedReview} />
      <SimilarRooms currentSlug={room.slug} />
      <Footer />
    </div>
  );
}

export default RoomDetail;
