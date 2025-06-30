"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import image from "../../../public/images/home/parallex.png";
import { FaPlay } from "react-icons/fa";

export default function ParallaxSection() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (showVideo) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showVideo]);

  return (
    <section className="relative h-[500px] overflow-hidden my-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${image.src})` }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Circular Play Button */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div
          className="relative w-44 h-44 rounded-full bg-[#687406]/70 flex items-center justify-center text-white border-1 border-[#687406] cursor-pointer"
          onClick={() => setShowVideo(true)}
        >
          <svg
            className="absolute w-full h-full animate-spin-slow"
            viewBox="0 0 200 200"
          >
            <defs>
              <path
                id="circle"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text fill="white" fontSize="17" fontWeight="300">
              <textPath href="#circle" startOffset="0%">
                * Watch Now * Watch Full Video * Watch Now * Watch Full Video *
              </textPath>
            </text>
          </svg>

          <FaPlay className="text-white text-3xl" />
        </div>
      </div>

      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full">
          <div className="relative w-full max-w-3xl aspect-video">
            <iframe
              className="w-full h-full"
              src="https://youtube.com/embed/UPRdectauDI"
              title="YouTube video"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 text-white text-3xl font-bold cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
