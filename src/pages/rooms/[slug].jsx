import React, { useState } from "react";
import { useRouter } from "next/router";
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
import BookingModal from "@/components/Rooms/BookingModal";
import { rooms } from "@/data/site";

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
  const router = useRouter();
  const [submittedReview, setSubmittedReview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { checkIn, checkOut, adults, children } = router.query;

  return (
    <div>
      <Header />
      <RoomDetailBanner room={room} />
      <RoomInfoCard room={room} onBook={openModal} />
      <RoomsGallery room={room} />
      <RoomDetailSection room={room} onBook={openModal} />
      <Location />
      <ClientsReview newReview={submittedReview} />
      <AddReview onReviewSubmit={setSubmittedReview} />
      <SimilarRooms currentSlug={room.slug} />
      <Footer />
      <BookingModal
        open={modalOpen}
        onClose={closeModal}
        room={room}
        initialCheckIn={typeof checkIn === "string" ? checkIn : undefined}
        initialCheckOut={typeof checkOut === "string" ? checkOut : undefined}
        initialAdults={typeof adults === "string" ? adults : undefined}
        initialChildren={typeof children === "string" ? children : undefined}
      />
    </div>
  );
}

export default RoomDetail;
