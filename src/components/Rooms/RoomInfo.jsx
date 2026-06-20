import { FaCheckCircle, FaSignInAlt, FaSignOutAlt, FaUserCheck, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { site, whatsappLink } from "@/data/site";

const RoomDetailSection = ({ room }) => {
  if (!room) return null;

  return (
    <section className="max-w-7xl mx-auto md:px-8 px-4 md:py-16 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Left Section */}
      <div className="lg:col-span-2 space-y-10">
        {/* Overview */}
        <div>
          <h2 className="lg:text-3xl text-2xl font-serif font-semibold text-gray-900 mb-3">
            Overview
          </h2>
          <p className="text-gray-600 md:text-lg leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="md:text-3xl text-2xl font-serif font-semibold text-gray-900 mb-4">
            Room Amenities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-gray-600 md:text-lg">
            {room.amenities.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <FaCheckCircle className="text-secondary text-base shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Policies */}
        <div>
          <h3 className="md:text-3xl text-2xl font-serif font-semibold text-gray-900 mb-4">
            Hotel Policies
          </h3>
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="flex items-start gap-3 bg-cream rounded-md p-4">
              <FaSignInAlt className="text-secondary text-xl mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Check-in</p>
                <p className="text-gray-600">{site.checkIn}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-cream rounded-md p-4">
              <FaSignOutAlt className="text-secondary text-xl mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Check-out</p>
                <p className="text-gray-600">{site.checkOut}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-cream rounded-md p-4">
              <FaUserCheck className="text-secondary text-xl mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-gray-800">Guest Policy</p>
                <p className="text-gray-600">Primary guest must be 18+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="bg-secondary/10 border border-secondary/30 md:p-6 p-6 rounded-md shadow-sm relative pt-16 h-fit">
        <div className="room-details__sidebar__top__item">
          <h4 className="room-details__sidebar__top__title">Book This Room</h4>
        </div>

        <div className="pt-10 space-y-5">
          <div className="flex items-baseline justify-between border-b border-secondary/30 pb-4">
            <span className="text-gray-700 font-medium">Tariff</span>
            <span className="text-2xl font-bold text-secondary">
              {room.priceLabel}
              <span className="text-sm font-normal text-gray-500"> / night</span>
            </span>
          </div>

          <p className="text-gray-600">
            Reserve the {room.name} for your Ayodhya yatra. Call us directly for
            the best available rate and instant confirmation.
          </p>

          <a
            href={`tel:${site.phone}`}
            className="flex items-center gap-3 text-gray-800 font-semibold"
          >
            <FaPhoneAlt className="text-secondary" />
            {site.phoneDisplay}
          </a>

          <a
            href={whatsappLink(
              `Hello! I'd like to book the ${room.name} (${room.priceLabel}/night) at The Tribhuvan Residency. Please confirm availability.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <button className="btn-primary w-full">
              <span className="flex items-center justify-center gap-2">
                <FaWhatsapp /> Book on WhatsApp
              </span>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RoomDetailSection;
