import { FaCalendarAlt, FaCheck } from "react-icons/fa";

const RoomDetailSection = () => {
  return (
    <section className="max-w-7xl mx-auto md:px-8 px-4 md:py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-10">
        {/* Overview */}
        <div>
          <h2 className="lg:text-3xl text-2xl font-semibold text-gray-900 mb-3">
            Overview
          </h2>
          <p className="text-gray-500 md:text-lg">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteradution in some form by injected
            humour, or randomised words which don&apos;t look even slightly
            believable. If you are going There are many variations of passages
            of Lorem Ipsum available, but the majority have suffered
            alteradution in some form by injected humour
          </p>
        </div>

        {/* Facilities */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="md:text-3xl text-2xl font-semibold text-gray-900 mb-3">
              Advance Facilities
            </h3>
            <p className="text-gray-500 md:text-lg">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteradution in some form by
            </p>
          </div>
          <div>
            <h3 className="md:text-3xl  text-2xl font-semibold text-gray-900 mb-3">
              Challenge
            </h3>
            <p className="text-gray-500 md:text-lg">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteradution in some form by
            </p>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="md:text-3xl  text-2xl font-semibold text-gray-900 mb-4">
            Amenities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-gray-600 md:text-lg">
            {[
              "Conditioning",
              "Lawn",
              "TV Cable",
              "Barbeque",
              "Microwave",
              "Washer",
              "Dryer",
              "Dryer",
              "Dryer",
              "Dryer",
              "Dryer",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <FaCheck className="text-secondary text-sm" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary/50 md:p-6 rounded-md shadow-sm relative pt-20">
        {/* Label */}
        <div class="room-details__sidebar__top__item">
          <h4 class="room-details__sidebar__top__title">Book Room</h4>
        </div>

        <div className="pt-14 space-y-5 md:p-0 p-6">
          <div>
            <label className="block font-medium text-gray-800 mb-1">
              From:
            </label>
            <div className="relative">
              <input
                type="date"
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
              />
              <FaCalendarAlt className="absolute right-3 top-3 text-secondary" />
            </div>
          </div>
          <div>
            <label className="block font-medium text-gray-800 mb-1">To:</label>
            <div className="relative">
              <input
                type="date"
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm"
              />
              <FaCalendarAlt className="absolute right-3 top-3 text-secondary" />
            </div>
          </div>

          {/* Guests Dropdown */}
          <div>
            <label className="block font-medium text-gray-800 mb-1">
              Guests
            </label>
            <select className="w-full border border-gray-300 px-3 py-2 rounded text-sm">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>
          </div>

          {/* Extra Services */}
          <div>
            <p className="font-medium text-gray-800 mb-2">Add Extra</p>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Add service per booking
              </label>
              <span className="text-secondary font-medium">$30.00</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Add service per person
              </label>
              <span className="text-secondary font-medium">$30.00</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-lg text-primary">
            <span>Total:</span>
            <span>$160.00</span>
          </div>
          <button className="relative overflow-hidden bg-primary cursor-pointer w-full md:w-full text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 ease-in-out before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-[#4e6956f7] hover:before:w-full before:transition-all before:duration-300 before:ease-in-out">
            <span className="relative z-10">Check Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoomDetailSection;
