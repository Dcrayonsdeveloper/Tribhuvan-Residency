import Image from "next/image";
import image1 from "../../../public/images/about/image1.png";
import image2 from "../../../public/images/about/image2.png";

export default function TwoImageWithContent() {
  return (
    <div className="container mx-auto py-16 md:px-8 px-4">
      <div className="flex flex-col md:flex-row items-center space-x-6">
        <div className="w-full md:w-1/2 relative mb-32 hidden md:block">
          <Image
            src={image1}
            alt="Hotel image"
            width={420}
            height={474}
            className="rounded-lg shadow-sm"
          />
          <Image
            src={image2}
            alt="Hotel image"
            width={365}
            height={385}
            className="rounded-lg border-t-4 border-l-4 border-[#FFFFFF] shadow-sm absolute z-1000000 right-4 bottom-[-119px]"
          />
        </div>
        <div className="w-full md:w-1/2 text-left">
          <p className="text-secondary  font-medium mb-2 flex justify-left items-center gap-2">
            <span className="w-5 h-px bg-secondary inline-block"></span>
            Facilities
            <span className="w-5 h-px bg-secondary inline-block"></span>
          </p>

          <h2 className="md:text-4xl text-2xl font-serif font-bold text-gray-900 mb-8">
            Lorem Ipsum Dolo
          </h2>

          <p className="md:text-lg text-gray-600 mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
}
