import { FaMapMarkerAlt, FaDirections } from "react-icons/fa";
import { site, attractions } from "@/data/site";

const Location = () => {
  return (
    <section className="pb-10 max-w-7xl mx-auto md:px-8 px-4 pt-10 md:pt-0">
      <p className="text-secondary font-medium mb-2 flex justify-start md:justify-center items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Where to Find Us
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>
      <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-10 text-left md:text-center">
        Location &amp; Nearby
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="w-full h-[280px] sm:h-[360px] md:h-[400px] rounded-lg overflow-hidden shadow-sm">
            <iframe
              src={site.mapEmbed}
              title={`${site.name} location map`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="flex items-start gap-2 text-gray-600 text-sm sm:text-base">
              <FaMapMarkerAlt className="text-secondary mt-1 shrink-0" />
              {site.address}
            </p>
            <a
              href={site.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-full sm:w-auto"
            >
              <button className="btn-gold w-full sm:w-auto">
                <span className="flex items-center justify-center gap-2">
                  <FaDirections /> Get Directions
                </span>
              </button>
            </a>
          </div>
        </div>

        {/* Nearby Attractions */}
        <div className="bg-cream rounded-lg p-6">
          <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">
            Nearby Attractions
          </h3>
          <ul className="space-y-4">
            {attractions.map((spot, i) => (
              <li key={i} className="flex items-start justify-between gap-3">
                <span className="flex items-start gap-2 text-gray-700">
                  <FaMapMarkerAlt className="text-secondary mt-1 shrink-0" />
                  {spot.name}
                </span>
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {spot.distance}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Location;
