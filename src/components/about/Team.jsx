import AmenityIcon from "@/components/common/AmenityIcon";
import { amenities } from "@/data/site";

const TeamSection = () => {
  return (
    <section className="py-16 max-w-7xl mx-auto text-left md:text-center">
      <div className="md:px-20 px-4 pb-4">
        <p className="text-secondary font-medium mb-2 flex justify-left md:justify-center items-center gap-2">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Why Choose Us
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>
        <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-10">
          Everything You Need for a Restful Stay
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:px-20 px-4">
        {amenities.map((a) => (
          <div
            key={a.title}
            className="flex md:flex-col items-center md:items-center gap-4 md:gap-3 bg-cream rounded-lg p-6 text-left md:text-center hover:shadow-md transition-shadow duration-300"
          >
            <div className="bg-secondary/15 p-4 rounded-full shrink-0">
              <AmenityIcon name={a.icon} className="text-secondary text-2xl" />
            </div>
            <h3 className="md:text-lg text-base font-semibold text-gray-800">
              {a.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
