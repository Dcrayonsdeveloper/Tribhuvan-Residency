import Image from "next/image";
import image from "../../../public/images/about/profile.png";

const TeamMember = ({ name, role, socials }) => {
  return (
    <div className="text-center lg:mx-8 mx-4">
      <div className="relative mb-4">
        <Image src={image} alt={name} width={301} height={330} className="w-100 md:w-auto" />
      </div>
      <h3 className="md:text-xl text-lg font-semibold pb-1 md:pt-2">{name}</h3>
      <p className="text-gray-600">{role}</p>
      <div className="flex justify-center gap-4 mt-2">
        {socials.map((social, index) => (
          <a
            href={social.url}
            key={index}
            className="text-gray-600 hover:text-gray-900"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <section className="py-16 max-w-7xl text-left md:text-center">
      <div className="md:px-20 px-4  pb-4">
        <p className="text-secondary font-medium mb-2 flex justify-left md:justify-center items-center gap-2">
          <span className="w-5 h-px bg-secondary inline-block"></span>
          Facilities
          <span className="w-5 h-px bg-secondary inline-block"></span>
        </p>
        <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-10">
          Lorem Ipsum Dolo
        </h2>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <TeamMember
          name="Emma Elizabeth"
          role="Manager"
          imgSrc="/path-to-image.jpg"
          socials={[
            { url: "#", icon: <i className="fab fa-facebook-f"></i> },
            { url: "#", icon: <i className="fab fa-linkedin-in"></i> },
            { url: "#", icon: <i className="fab fa-whatsapp"></i> },
          ]}
        />
        <TeamMember
          name="Jonathon Doe"
          role="Assistant Manager"
          imgSrc="/path-to-image.jpg"
          socials={[
            { url: "#", icon: <i className="fab fa-facebook-f"></i> },
            { url: "#", icon: <i className="fab fa-linkedin-in"></i> },
            { url: "#", icon: <i className="fab fa-whatsapp"></i> },
          ]}
        />
        <TeamMember
          name="Emma Elizabeth"
          role="General Manager"
          imgSrc="/path-to-image.jpg"
          socials={[
            { url: "#", icon: <i className="fab fa-facebook-f"></i> },
            { url: "#", icon: <i className="fab fa-linkedin-in"></i> },
            { url: "#", icon: <i className="fab fa-whatsapp"></i> },
          ]}
        />
        <TeamMember
          name="Jhon Doe"
          role="Quality Inspector"
          imgSrc="/path-to-image.jpg"
          socials={[
            { url: "#", icon: <i className="fab fa-facebook-f"></i> },
            { url: "#", icon: <i className="fab fa-linkedin-in"></i> },
            { url: "#", icon: <i className="fab fa-whatsapp"></i> },
          ]}
        />
      </div>
    </section>
  );
};

export default TeamSection;
