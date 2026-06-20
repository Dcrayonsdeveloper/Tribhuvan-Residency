"use client";

import Image from "next/image";

export default function RoomDetailBanner({ room }) {
  if (!room) return null;

  return (
    <section className="relative w-full h-[400px]">
      <Image
        src={room.image}
        alt={room.name}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-espresso/65 via-espresso/65 to-espresso/80"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="mb-3 text-3xl md:text-5xl font-serif font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          {room.name}
        </h1>
        <div className="w-20 border-t-2 border-secondary my-2"></div>
      </div>
    </section>
  );
}
