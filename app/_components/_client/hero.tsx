"use client";

import Banner from "./banner";
import Landing from "./landing-page";

export const Hero = () => {
  return (
    <>
      <div className="relative min-h-screen w-full">
        <div className="grid !min-h-[30rem] px-8">
          <Landing />
          <Banner />
        </div>
      </div>
    </>
  );
};
export default Hero;
