import Image from 'next/image'

import image1 from '../../../public/images/gallery/image1.png'
import image2 from '../../../public/images/gallery/image1.png'
import image3 from '../../../public/images/gallery/image1.png'
import image4 from '../../../public/images/gallery/image2.png'
import image5 from '../../../public/images/gallery/image2.png'

const images = [image1, image2, image3, image4, image5]

const RoomsGallery = () => {
  return (
    <section className="max-w-7xl mx-auto md:px-8 px-4 py-16 text-center">
      <p className="text-secondary font-medium mb-2 flex justify-start md:justify-center items-center gap-2">
        <span className="w-5 h-px bg-secondary inline-block"></span>
        Facilities
        <span className="w-5 h-px bg-secondary inline-block"></span>
      </p>

      <h2 className="md:text-4xl text-2xl font-serif text-left md:text-center font-bold text-gray-900 mb-12">
        Lorem Ipsum Dolo
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
        {images.slice(0, 3).map((src, index) => (
          <div key={index} className="overflow-hidden rounded-md">
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              width={500}
              height={400}
              className="rounded-lg object-cover hover:scale-105 transition-transform duration-300 w-full h-auto"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-5">
        {images.slice(3).map((src, index) => (
          <div key={index} className="w-full sm:w-1/2 overflow-hidden rounded-md">
            <Image
              src={src}
              alt={`Gallery image ${index + 4}`}
              width={600}
              height={400}
              className="rounded-lg object-cover hover:scale-105 transition-transform duration-300 w-full h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default RoomsGallery
