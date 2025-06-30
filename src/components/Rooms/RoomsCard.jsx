"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaVideo,
  FaCamera,
  FaUsers,
  FaClock,
  FaExpandArrowsAlt,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import roomImage from "../../../public/images/rooms/roomImage.png";
import image1 from "../../../public/images/rooms/image.png";
import image2 from "../../../public/images/rooms/image1.png";

import Link from "next/link";

const RoomCard = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (showVideoModal || showGalleryModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showVideoModal, showGalleryModal]);

  const dummyRooms = [
    {
      title: "Deluxe Room",
      price: "$120.00",
      rating: 4,
      guests: "8 Person",
      duration: "3 Days",
      size: "460 sqft",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      video: "https://youtube.com/embed/UPRdectauDI",
      images: [image1, image2, image1],
    },
    {
      title: "Ocean View Suite",
      price: "$180.00",
      rating: 5,
      guests: "6 Person",
      duration: "2 Days",
      size: "520 sqft",
      description: "Enjoy serene ocean views and peaceful nights.",
      video: "https://youtube.com/embed/UPRdectauDI",
      images: [image1, image2, image1],
    },
    {
      title: "Mountain Cabin",
      price: "$90.00",
      rating: 3,
      guests: "4 Person",
      duration: "5 Days",
      size: "390 sqft",
      description: "Rustic charm and cozy comfort meet in this getaway.",
      video: "https://youtube.com/embed/UPRdectauDI",
      images: [image1, image2, image1],
    },
  ];

  const openVideoModal = (url) => {
    setVideoUrl(url);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setVideoUrl("");
  };

  const openGalleryModal = (images) => {
    setCurrentImages(images);
    setCurrentIndex(0);
    setShowGalleryModal(true);
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
    setCurrentImages([]);
    setCurrentIndex(0);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-6xl mx-auto md:my-20 my-10 space-y-10">
      {dummyRooms.map((room, index) => (
        <div
          key={index}
          className="bg-white md:h-80 rounded-lg overflow-hidden md:shadow-md flex flex-col md:flex-row"
        >
          <div className="relative md:w-1/2 w-full md:h-auto">
            <Link href="/rooms/rooms-detail">
              <Image
                src={roomImage}
                alt={room.title}
                fill
                className="object-cover"
              />
              <span className="absolute md:top-4 top-0 left-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded shadow">
                FEATURED
              </span>
              <button className="absolute md:top-4 top-0 right-4 bg-white rounded-full p-2 shadow text-red-500 text-xl">
                <FaHeart className="text-gray-400" />
              </button>
            </Link>
          </div>

          <div className="flex-1 p-6 flex flex-col justify-between pt-10">
            <div>
              <div className="flex justify-between items-center md:items-start pt-4 md:pt-0">
                <Link href="/rooms/rooms-details">
                  <h2 className="md:text-2xl text-lg font-semibold text-gray-900">
                    {room.title}
                  </h2>
                </Link>
                <div className="flex items-center space-x-1">
                  {[...Array(room.rating)].map((_, i) => (
                    <FaStar key={i} className="text-secondary" />
                  ))}
                  {[...Array(5 - room.rating)].map((_, i) => (
                    <FaRegStar key={i} className="text-gray-300" />
                  ))}
                  <div className="flex space-x-2 ml-3">
                    <button
                      onClick={() => openVideoModal(room.video)}
                      className="bg-secondary text-white p-1 cursor-pointer rounded"
                    >
                      <FaVideo />
                    </button>
                    <button
                      onClick={() => openGalleryModal(room.images)}
                      className="relative bg-secondary text-white p-1 cursor-pointer rounded"
                    >
                      <FaCamera />
                      {/* <span className="absolute -top-2 -right-2 bg-secondary text-xs text-white px-1 rounded-full">
                        {room.images.length}
                      </span> */}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xl font-bold text-secondary mt-2">
                {room.price}{" "}
                <span className="text-sm font-normal text-gray-500">
                  / Night
                </span>
              </p>
              <p className="text-gray-600 mt-2">{room.description}</p>
            </div>

            <div className="bg-gray-100 rounded-lg mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
              <div className="flex items-center gap-4">
                <FaUsers className="text-secondary text-xl" />
                <div>
                  <p className="md:text-md font-semibold">{room.guests}</p>
                  <p className="text-xs text-gray-500">Guests</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaClock className="text-secondary text-xl" />
                <div>
                  <p className="text-md font-semibold">{room.duration}</p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaExpandArrowsAlt className="text-secondary text-xl" />
                <div>
                  <p className="text-md font-semibold">
                    {room.size.split(" ")[0]}
                  </p>
                  <p className="text-xs text-gray-500">
                    {room.size.split(" ")[1]} size
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg overflow-hidden max-w-2xl md:h-[400px] w-full">
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-2 cursor-pointer text-white bg-black bg-opacity-50 rounded-full p-2"
            >
              <FaTimes />
            </button>
            <iframe
              className="w-full h-[500px]"
              src={videoUrl}
              title="YouTube video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden max-w-2xl md:h-[400px] w-full">
            <button
              onClick={closeGalleryModal}
              className="absolute top-2 right-2 cursor-pointer text-white bg-black bg-opacity-50 rounded-full p-2"
            >
              <FaTimes />
            </button>
            <Image
              src={currentImages[currentIndex]}
              alt={`Gallery Image ${currentIndex + 1}`}
              width={800}
              height={500}
              className="w-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <FaArrowLeft className="cursor-pointer"/>
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <FaArrowRight className="cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCard;
