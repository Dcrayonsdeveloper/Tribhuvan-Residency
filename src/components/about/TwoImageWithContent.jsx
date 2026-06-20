import Image from "next/image";
import image1 from "../../../public/images/tribhuvan/hotel-3.jpg";
import image2 from "../../../public/images/tribhuvan/hotel-1.jpg";
import { attractions } from "@/data/site";

const nearby = attractions.slice(0, 4);

export default function TwoImageWithContent() {
  return (
    <div className="container mx-auto py-16 md:px-8 px-4">
      <div className="flex flex-col md:flex-row items-center space-x-6">
        <div className="w-full md:w-1/2 relative mb-32 hidden md:block">
          <Image
            src={image1}
            alt="Modern marble bathroom with 24-hour hot water"
            width={420}
            height={474}
            className="rounded-lg shadow-sm object-cover"
          />
          <Image
            src={image2}
            alt="Comfortable guest lounge and sitting area"
            width={365}
            height={385}
            className="rounded-lg border-t-4 border-l-4 border-[#FFFFFF] shadow-sm absolute z-10 right-4 bottom-[-119px] object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <p className="text-secondary font-medium mb-2 flex justify-left items-center gap-2">
            <span className="w-5 h-px bg-secondary inline-block"></span>
            Our Location
            <span className="w-5 h-px bg-secondary inline-block"></span>
          </p>

          <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-8">
            An Ideal Location for Your Ayodhya Yatra
          </h2>

          <p className="md:text-lg text-gray-600 mb-6 leading-relaxed">
            Tucked away behind Birla Dharamshala, just steps from the Ram Temple
            gate, The Tribhuvan Residency places the holiest sites of Ayodhya
            within an easy walk. Spend your day in darshan and return to clean,
            air-conditioned rooms with modern western bathrooms and 24-hour hot
            water. Enjoy fresh in-room dining from trusted nearby kitchens, free
            Wi-Fi, and the peace of mind that comes with secure on-site parking.
          </p>

          <ul className="space-y-3">
            {nearby.map((place) => (
              <li
                key={place.name}
                className="flex items-center justify-between border-b border-gray-200 pb-3"
              >
                <span className="text-gray-800 font-medium">{place.name}</span>
                <span className="text-secondary font-semibold text-sm whitespace-nowrap">
                  {place.distance}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
