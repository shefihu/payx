import React from "react";
import Notebook from "../../assets/images/notebook.png";
const Hero2 = () => {
  return (
    <div className="mb-20">
      <div className="w-full mx-auto mt-40 container items-center hidden lg:flex justify-between bg-zinc-900 h-[30rem] rounded-3xl">
        <div className=" h-40 ml-20 flex flex-col justify-between w-7/12">
          <h1 className="text-5xl text-white font-bold ">Join the soft life</h1>
          <p className="text-2xl text-white">Sign up to get started</p>
          <button className="px-4 py-2 text-white bg-green-600 w-60 rounded-lg font-bold">
            Sign up for Free
          </button>
        </div>
        <img src={Notebook} alt="" className="mr-40" />
      </div>
    </div>
  );
};

export default Hero2;
