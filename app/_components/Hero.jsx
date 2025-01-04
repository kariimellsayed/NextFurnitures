import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="hero py-40">
      <div className="padding-x w-full">
        <div className="flex flex-col tap:items-center items-start">
          <h1 className="text-5xl font-bold text-primary md:text-8xl">
            Let us find your
            <span className="block">Next Furnitures.</span>
          </h1>

          <p className="mt-7 tap:max-w-[70%] w-full text-gray-400 sm:text-xl/relaxed tap:text-center">
            Discover a curated collection of premium furniture designed to
            complement your taste. From cozy sofas to modern tables, we bring
            you quality and style for an unforgettable shopping experience.
            Elevate every corner of your home with beauty.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="#product"
              className="px-7 py-2 text-white bg-primary rounded-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              href="/all"
              className="px-7 py-2 text-white rounded-lg font-semibold bg-gray-400"
            >
              More Furnitures
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
