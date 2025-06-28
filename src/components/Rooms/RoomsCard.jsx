import Image from "next/image";
import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaVideo,
  FaCamera,
  FaUsers,
  FaClock,
  FaExpandArrowsAlt,
} from "react-icons/fa";
import roomImage from "../../../public/images/rooms/roomImage.png";
import Link from "next/link";

const RoomCard = () => {
  const dummyRooms = [
    {
      title: "Deluxe Room",
      price: "$120.00",
      rating: 4,
      guests: "8 Person",
      duration: "3 Days",
      size: "460 sqft",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fringilla placerat orci.",
    },
    {
      title: "Ocean View Suite",
      price: "$180.00",
      rating: 5,
      guests: "6 Person",
      duration: "2 Days",
      size: "520 sqft",
      description:
        "Enjoy serene ocean views and peaceful nights with this premium suite option.",
    },
    {
      title: "Mountain Cabin",
      price: "$90.00",
      rating: 3,
      guests: "4 Person",
      duration: "5 Days",
      size: "390 sqft",
      description:
        "Rustic charm and cozy comfort meet in this scenic mountain getaway.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto md:my-20 my-10 space-y-10">
      {dummyRooms.map((room, index) => (
        <div
          key={index}
          className="bg-white md:h-80 rounded-lg overflow-hidden md:shadow-md flex flex-col md:flex-row"
        > 
          <div className="relative md:w-1/2 w-full md:h-auto">
                  <Link href="/rooms/rooms-detail">
            <Image src={roomImage} alt={room.title} fill className="object-cover" />
            <span className="absolute md:top-4 top-0  left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded shadow">
              FEATURED
            </span>
            <button className="absolute md:top-4 top-0 right-4 bg-white rounded-full p-2 shadow text-red-500 text-xl">
              <FaHeart className="text-gray-400" />
            </button>
              </Link>
          </div>

          {/* Details Section */}
          <div className="flex-1 p-6 flex flex-col justify-between pt-10">
            <div>
              <div className="flex justify-between items-center md:items-start pt-4 md:pt-0">
                <Link href="/rooms/rooms-details">
                <h2 className="md:text-2xl text-lg font-semibold text-gray-900">{room.title}</h2>
                </Link>
                <div className="flex items-center space-x-1">
                  {[...Array(room.rating)].map((_, i) => (
                    <FaStar key={i} className="text-secondary" />
                  ))}
                  {[...Array(5 - room.rating)].map((_, i) => (
                    <FaRegStar key={i} className="text-gray-300" />
                  ))}
                  <div className="flex space-x-2 ml-3">
                    <div className="bg-secondary text-white p-1 rounded">
                      <FaVideo />
                    </div>
                    <div className="relative bg-secondary text-white p-1 rounded">
                      <FaCamera />
                      <span className="absolute -top-2 -right-2 bg-secondary text-xs text-white px-1 rounded-full">
                        3
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xl font-bold text-secondary mt-2">
                {room.price}{" "}
                <span className="text-sm font-normal text-gray-500">/ Night</span>
              </p>
              <p className="text-gray-600 mt-2">{room.description}</p>
            </div>

            {/* Info Bar */}
            <div className="bg-gray-100 rounded-lg mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
              <div className="flex items-center gap-4">
                <FaUsers className="text-secondary text-xl" />
                <div>
                  <p className="text-sm font-semibold">{room.guests}</p>
                  <p className="text-xs text-gray-500">Guests</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaClock className="text-secondary text-xl" />
                <div>
                  <p className="text-sm font-semibold">{room.duration}</p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaExpandArrowsAlt className="text-secondary text-xl" />
                <div>
                  <p className="text-sm font-semibold">{room.size.split(" ")[0]}</p>
                  <p className="text-xs text-gray-500">{room.size.split(" ")[1]} size</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomCard;
