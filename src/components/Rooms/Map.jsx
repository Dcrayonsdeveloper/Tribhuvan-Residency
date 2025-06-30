const Location = () => {
  return (
    <section className="pb-10 max-w-7xl mx-auto md:px-8 px-4  pt-10 md:pt-0">
      <p className="text-secondary font-medium mb-2 flex justify-start items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Facilities
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>
      <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-12">
        Lorem Ipsum Dolo
      </h2>{" "}
      <div className="relative">
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.941594439809!2d77.14800170982943!3d28.69139368130584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d07732cddb5f7%3A0x7561823b80ed3903!2sDcrayons!5e0!3m2!1sen!2sin!4v1750936452379!5m2!1sen!2sin"
            width="1200"
            height="600"
            // style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Location;
