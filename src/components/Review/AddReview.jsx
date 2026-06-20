"use client";

import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const AddReview = ({ onReviewSubmit }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;

    onReviewSubmit({
      name,
      rating,
      text,
      meta: "Just now",
    });

    setName("");
    setRating(0);
    setHover(0);
    setText("");
  };

  return (
    <div className="max-w-7xl mx-auto md:px-8 px-4 py-10">
      <p className="text-secondary font-medium mb-2 flex justify-start items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Share Your Experience
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>
      <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-8">
        Write a Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star rating */}
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Your Rating</span>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => {
              const value = index + 1;
              const filled = value <= (hover || rating);
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                  className="text-2xl text-secondary cursor-pointer focus:outline-none"
                  aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
                >
                  {filled ? <FaStar /> : <FaRegStar />}
                </button>
              );
            })}
          </div>
        </div>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full bg-cream text-gray-700 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-secondary/40"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          rows={6}
          placeholder="Tell us about your stay at The Tribhuvan Residency"
          className="w-full bg-cream text-gray-700 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-secondary/40"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary w-full md:w-auto">
          <span>Submit Review</span>
        </button>
      </form>
    </div>
  );
};

export default AddReview;
