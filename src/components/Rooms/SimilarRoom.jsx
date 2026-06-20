import { FaUsers, FaBed } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/data/site";

const SimilarRoomCard = ({ room }) => {
  return (
    <Link
      href={`/rooms/${room.slug}`}
      className="w-full md:min-w-[300px] md:flex-1 p-4 bg-white shadow-lg rounded-lg relative mb-6 block group"
    >
      <div className="relative h-56 rounded-lg overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {room.featured && (
          <div className="absolute top-4 left-4 font-semibold bg-secondary text-espresso text-xs px-3 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-serif font-semibold text-gray-900 group-hover:text-secondary transition-colors">
          {room.name}
        </h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FaUsers className="text-secondary" /> {room.guests} Guests
          </span>
          <span className="flex items-center gap-1">
            <FaBed className="text-secondary" /> {room.bed}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold text-secondary">
            {room.priceLabel}
            <span className="text-sm font-normal text-gray-500"> / night</span>
          </p>
          <span className="text-sm font-semibold text-primary">View Details →</span>
        </div>
      </div>
    </Link>
  );
};

const SimilarRooms = ({ currentSlug }) => {
  const similar = rooms.filter((r) => r.slug !== currentSlug);

  if (!similar.length) return null;

  return (
    <section className="pt-8 max-w-7xl mx-auto md:px-8 px-4">
      <p className="text-secondary font-medium mb-2 flex justify-start md:justify-center items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Explore More
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>

      <h2 className="md:text-4xl text-2xl font-serif md:text-center text-left font-bold text-gray-900 mb-12">
        Other Rooms You May Like
      </h2>
      <div className="md:flex md:space-x-6 pb-16">
        {similar.map((room) => (
          <SimilarRoomCard key={room.slug} room={room} />
        ))}
      </div>
    </section>
  );
};

export default SimilarRooms;
