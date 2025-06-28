import {
  FaUsers,
  FaClock,
  FaExpandArrowsAlt,
  FaHeart,
  FaShareAlt,
  FaStar,
} from "react-icons/fa";

const RoomInfoCard = () => {
  return (
    <section>
      <div className="rounded-md shadow-sm">
        {/* Top Section */}
        <div className="bg-[#f4f4f4] lg:p-10 px-4 md:py-4 py-8 flex flex-col md:flex-row md:items-center justify-between">
          {/* Title and Price */}
          <div>
            <h2 className="text-2xl pb-3 font-semibold text-gray-900">
              Deluxe Room
            </h2>
            <p className="text-gray-500 mt-1">
              From{" "}
              <span className="text-secondary font-semibold text-xl">
                $129.00
              </span>
              <span className="ml-1 text-sm">Per Night</span>
            </p>
          </div>

          {/* Info Badges */}
          <div className="flex gap-8 mt-6 md:mt-0 flex-wrap flex-nowrap">
            {/* Guests */}
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <FaUsers className="text-secondary text-lg w-6 h-6" />
              </div>
              <div>
              <p className="md:text-lg text-md font-semibold mt-1">8 Person</p>
              <p className="text-sm text-gray-500">Guests</p>
              </div>
              </div>
            </div>

            {/* Duration */}
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <FaClock className="text-secondary text-lg w-6 h-6" />
                  </div>

                  <div>
                    <p className="md:text-lg text-md font-semibold mt-1">3 days</p>
                    <p className="text-sm text-gray-500">Duration</p>
                  </div>
              </div>
            </div>

            {/* Size */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-4">
                
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <FaExpandArrowsAlt className="text-secondary text-lg w-6 h-6" />
                </div>
                <div>
                  <div>
                    <p className="md:text-lg text-md font-semibold mt-1">460</p>
                    <p className="text-sm text-gray-500">Guests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-1 border-gray-200" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between lg:p-10 px-4 md:py-4 py-8">
          {/* Posted Info & Rating */}
          <div className="md:flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center md:gap-2 gap-4 pb-4 md:gap-0 md:pb-0">
              <FaClock className="text-secondary text-base  mr-3 w-6 h-6" />
              <span className="text-lg">Posted 3 Days ago</span>
            </div>
            <div className="flex items-center md:gap-1 gap-2 text-secondary md:ml-4 ">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-secondary text-sm" />
              ))}
              <span className="text-gray-500 ml-1 text-lg">4.60 reviews</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-4 py-2 text-sm text-gray-700 shadow-sm">
              <FaHeart className="text-gray-500" />
              Whichlist
            </button>
            <button className="flex items-center gap-2 bg-white border rounded-md border-gray-200 px-4 py-2 text-sm text-gray-700 shadow-sm">
              <FaShareAlt className="text-gray-500" />
              Share
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomInfoCard;
