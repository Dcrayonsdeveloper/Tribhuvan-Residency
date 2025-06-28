import RoomBanner from '@/components/Rooms/Banner';
import React , {useState} from 'react'
import Header from "../../components/header/Header1";
import Footer from '@/components/footer/Footer1';
import RoomDetailBanner from '@/components/Rooms/Banner2';
import RoomInfoCard from '@/components/Rooms/AboutRooms';
import RoomsGallery from '@/components/Rooms/RoomsGallery';
import RoomDetailSection from '@/components/Rooms/RoomInfo';
import Location from '@/components/Rooms/Map';
import ClientsReview from '@/components/Review/ClientsReview';
import AddReview from '@/components/Review/AddReview';
import SimilarRooms from '@/components/Rooms/SimilarRoom';

function Rooms() {
    const [submittedReview, setSubmittedReview] = useState(null); 

  return (
    <div>
      
      <Header />
      <RoomDetailBanner />
      <RoomInfoCard />
      <RoomsGallery />
      <RoomDetailSection />
      <Location />
      <ClientsReview newReview={submittedReview} />
      <AddReview onReviewSubmit={setSubmittedReview} />
      <SimilarRooms />
      
      <Footer />
    </div>
  )
}

export default Rooms;
