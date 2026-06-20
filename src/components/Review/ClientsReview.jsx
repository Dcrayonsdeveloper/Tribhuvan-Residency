import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { site, reviews } from "@/data/site";

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

const ReviewCard = ({ review }) => (
  <div className="flex items-start gap-4 border-b border-gray-100 pb-6">
    <div className="w-12 h-12 shrink-0 rounded-full bg-primary text-white flex items-center justify-center font-serif text-lg uppercase">
      {review.name?.charAt(0) || "G"}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-lg font-semibold text-gray-900">{review.name}</p>
          <p className="text-sm text-gray-500">{review.meta}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-3 text-gray-600 md:text-lg leading-relaxed">
        {review.text}
      </p>
    </div>
  </div>
);

const ClientsReview = ({ newReview }) => {
  const allReviews = newReview ? [newReview, ...reviews] : reviews;

  return (
    <section className="max-w-7xl bg-white md:px-8 px-4 py-12 mx-auto">
      <p className="text-secondary font-medium mb-2 flex justify-start items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Reviews
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>
      <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-8">
        Guest Reviews
      </h2>

      {/* Overall summary */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 bg-cream rounded-lg p-6 mb-10">
        <div className="text-center sm:border-r sm:border-secondary/30 sm:pr-8">
          <div className="text-5xl font-serif font-bold text-primary">
            {site.rating}
          </div>
          <p className="text-secondary font-semibold mt-1">{site.ratingText}</p>
        </div>
        <div>
          <StarRating rating={site.rating} />
          <p className="text-gray-600 mt-2">
            Based on {site.ratingsCount} ratings &amp; {site.reviewsCount}{" "}
            guest reviews
          </p>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-6">
        {allReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </section>
  );
};

export default ClientsReview;
