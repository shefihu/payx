import React from "react";
import Features from "../components/Features";
import Hero from "../components/Hero/Hero";
import Hero2 from "../components/Hero/Hero2";
// import Hero from "../components/Hero";
import Stats from "../components/Stats";

const Home = () => {
  return (
    <div className="h-screen lg:h-[140vh] bg-zinc-900">
      <Hero />
      <Stats />
      {/* <Features /> */}
      <Hero2 />
    </div>
  );
};

export default Home;
