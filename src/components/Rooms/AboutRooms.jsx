import { FaUsers, FaExpandArrowsAlt, FaBed, FaBath, FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "@/data/site";

const RoomInfoCard = ({ room }) => {
  if (!room) return null;

  const facts = [
    { icon: FaUsers, value: `${room.guests} Guests`, label: "Occupancy" },
    { icon: FaExpandArrowsAlt, value: room.size, label: "Room Size" },
    { icon: FaBed, value: room.bed, label: "Bedding" },
    {
      icon: FaBath,
      value: `${room.bathrooms} Bathroom${room.bathrooms > 1 ? "s" : ""}`,
      label: "Western Attached",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto md:px-8 px-4 pt-12">
      <div className="rounded-md shadow-sm border border-gray-100 overflow-hidden">
        {/* Top Section */}
        <div className="bg-cream lg:p-10 px-4 md:py-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Title and Price */}
          <div>
            <p className="text-secondary font-medium mb-2 flex items-center gap-2">
              <span className="w-5 h-px bg-secondary inline-block"></span>
              Room Overview
            </p>
            <h2 className="text-2xl md:text-3xl pb-2 font-serif font-semibold text-gray-900">
              {room.name}
            </h2>
            <p className="text-gray-500 mt-1">
              From{" "}
              <span className="text-secondary font-semibold text-xl">
                {room.priceLabel}
              </span>
              <span className="ml-1 text-sm">/ night</span>
            </p>
            <p className="text-gray-600 mt-3 max-w-xl">{room.short}</p>
            <a
              href={whatsappLink(
                `Hello! I'd like to book the ${room.name} (${room.priceLabel}/night) at The Tribhuvan Residency. Please confirm availability.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-5"
            >
              <button className="btn-gold">
                <span className="flex items-center gap-2">
                  <FaWhatsapp /> Book Now
                </span>
              </button>
            </a>
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-2 gap-6">
            {facts.map((fact, i) => {
              const Icon = fact.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-white p-3 rounded-full shadow-sm">
                    <Icon className="text-secondary text-lg w-5 h-5" />
                  </div>
                  <div>
                    <p className="md:text-lg text-md font-semibold leading-tight">
                      {fact.value}
                    </p>
                    <p className="text-sm text-gray-500">{fact.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomInfoCard;
