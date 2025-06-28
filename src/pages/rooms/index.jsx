import RoomBanner from '@/components/Rooms/Banner';
import React from 'react'
import Header from "../../components/header/Header1";
import Footer from '@/components/footer/Footer1';
import RoomCard from '@/components/Rooms/RoomsCard';

function Rooms() {
  return (
    <div>
      
      <Header />
      <RoomBanner />
      <RoomCard />
      <Footer />
    </div>
  )
}

export default Rooms;
