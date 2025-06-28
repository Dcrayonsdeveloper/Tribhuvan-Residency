import { FaHeart, FaStar } from "react-icons/fa";
import Image from "next/image";
import image from "../../../public/images/rooms/roomImage.png";

const RoomCard = ({ room }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-secondary ${i <= rating ? "fill-current" : ""}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg relative mb-6">
      
      <div className="relative">
        <Image
          src={room.image}
          alt={room.name}
          width={600}
          height={400}
          className="object-cover rounded-lg"
        />
        <div className="absolute top-4 left-4 font-sembold bg-white text-black text-sm px-2 py-1">
          FEATURE
        </div>
        <div className="absolute top-4 right-4 font-semibold bg-white rounded-full w-7 h-7 text-black text-sm px-1 py-1 flex items-center justify-center ">
          <FaHeart className="text-[#7d8b90]" size={16} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{room.name}</h3>
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex space-x-1">{renderStars(room.rating)}</div>
          <span className="text-gray-500">({room.reviews})</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-semibold">{`$${room.price}/night`}</p>
          <p className="text-sm text-gray-500">Person: {room.persons}</p>
        </div>
      </div>
    </div>
  );
};

const SimilarRooms = () => {
  const rooms = [
    {
      name: "Deluxe Room",
      price: 120,
      persons: 10,
      discount: null,
      image: image,
      reviews: 200,
      rating: 4,
    },
    {
      name: "Triple Room",
      price: 130,
      persons: 10,
      image: image,
      reviews: 150,
      rating: 5,
    },
    {
      name: "Master Suite Room",
      price: 200,
      persons: 10,
      discount: null,
      image: image,
      reviews: 100,
      rating: 3,
    },
  ];

  return (
    <section className="pt-8 max-w-7xl md:px-8 px-4">
      <p className="text-secondary font-medium mb-2 flex justify-start md:justify-center items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Facilities
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>

      <h2 className="md:text-4xl text-2xl font-serif md:text-center text-left font-bold text-gray-900 mb-12">
        Similar Rooms
      </h2>
      <div className="md:flex md:space-x-6 md:overflow-x-auto pb-16">
        {rooms.map((room, index) => (
          <RoomCard key={index} room={room}  />
        ))}
      </div>
    </section>
  );
};

export default SimilarRooms;
