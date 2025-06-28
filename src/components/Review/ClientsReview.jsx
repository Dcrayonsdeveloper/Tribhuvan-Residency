import React from "react";
import image from "../../../public/images/rooms/profile.png";
import Image from "next/image";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const ClientsReview = ({ newReview }) => {
  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-secondary" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-secondary" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-secondary" />);
      }
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  const renderReviewCard = (review) => {
    const { name, message, ratings } = review;
    const date = new Date();

    return (
      <div className="flex items-start space-x-6 pt-3 w-[60%]">
        <Image
          src={image}
          alt="Reviewer"
          className="rounded-full w-36 h-36 object-cover"
        />
        <div>
          <div className="flex items-center justify-between flex-wrap">
            <div className="text-2xl font-semibold text-gray-800">{name}</div>
            <div className="text-secondary">
              {date.toLocaleDateString()} · {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>

          <div className="mt-4 space-y-3 text-gray-700">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-6 pb-3">
              {Object.entries(ratings).map(([key, val]) => (
                <div key={key} className="flex items-center space-x-2">
                  <span className="w-20 text-lg">{key}</span>
                  <StarRating rating={val} />
                </div>
              ))}
            </div>

            <p className="mt-2 text-gray-600 text-lg">{message}</p>
          </div>

          <button className="mt-4 cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded hover:bg-gray-200">
            Reply
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl bg-white md:px-8 px-4 py-8 mx-auto">
      <div className="rounded-lg">
        <p className="text-secondary font-medium mb-2 flex justify-start items-center gap-2">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Reviews
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>
        <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-12">
          What our clients say
        </h2>

      
        {newReview ? (
          renderReviewCard(newReview)
        ) : (
          <p className="text-gray-500 text-lg">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
    </section>
  );
};

export default ClientsReview;
