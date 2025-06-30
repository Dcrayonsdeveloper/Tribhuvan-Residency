"use client";

import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const categories = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"];

const AddReview = ({ onReviewSubmit }) => {
  const [ratings, setRatings] = useState({
    Lorem: 0,
    Ipsum: 0,
    Dolor: 0,
    Sit: 0,
    Amet: 0,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleStarClick = (category, index) => {
    const newRating = index + 1;
    setRatings((prev) => ({
      ...prev,
      [category]: prev[category] === newRating ? 0 : newRating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      name,
      email,
      message,
      ratings,
    };
    onReviewSubmit(reviewData);

    setName("");
    setEmail("");
    setMessage("");
    setRatings({
      Lorem: 0,
      Ipsum: 0,
      Dolor: 0,
      Sit: 0,
      Amet: 0,
    });
  };

  return (
    <div className="max-w-7xl mx-auto md:px-8 px-4 py-10">
      <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-8">
        Review Score
      </h2>

      <div className="space-y-4 mb-10">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-6">
            <div className="w-24 text-gray-700 font-medium">{category}</div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) =>
                index < ratings[category] ? (
                  <FaStar
                    key={index}
                    className="cursor-pointer text-2xl text-secondary"
                    onClick={() => handleStarClick(category, index)}
                  />
                ) : (
                  <FaRegStar
                    key={index}
                    className="cursor-pointer text-2xl text-secondary"
                    onClick={() => handleStarClick(category, index)}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-[#f4f4f4] text-gray-700 px-4 py-3 rounded focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-[#f4f4f4] text-gray-700 px-4 py-3 rounded focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <textarea
          rows={6}
          placeholder="Write a Message"
          className="w-full bg-[#f4f4f4] text-gray-700 px-4 py-3 rounded focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

       <button className="relative overflow-hidden bg-primary cursor-pointer w-full md:w-auto text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-[#4e6956f7] hover:before:w-full before:transition-all before:duration-300 before:ease-in-out">
            <span className="relative z-10">Submit Review</span>
          </button>
      </form>
    </div>
  );
};

export default AddReview;
