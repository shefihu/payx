import React from "react";
import card from "../../assets/images/card.png";
import arrow from "../../assets/icons/arrow.png";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-zinc-900 w-full lg:flex hidden  h-[40rem]">
        <div className="flex justify-between mx-auto container items-center w-full h-full ">
          <div className="w-1/2  h-[29rem] flex flex-col justify-between">
            <div className="flex flex-col w-full justify-between  h-36">
              <h1 className="text-6xl text-white font-bold">
                Securing your <span className="text-green-500">future</span>
              </h1>
              <h1 className="text-6xl text-white font-bold">with one click</h1>
            </div>
            <div className="w-full text-white h-24 flex flex-col justify-between ">
              <p>
                Saving, Spending and Transfers are part of our lives we only
              </p>
              <p> help you make it better. With PayX we run decentralized</p>
              <p>transactions accross the globe.</p>
            </div>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="bg-green-500 w-72 text-white font-bold rounded py-4"
            >
              Sign Up for free
            </button>
          </div>
          <div className="mb-20">
            <img src={card} alt="" />
            <div className="absolute  top-[36rem] left-[34rem]">
              {" "}
              <img src={arrow} alt="" className="w-[30rem]" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-10 bg-zinc-900 lg:hidden">
        <div className="flex justify-between mx-auto  flex-col  w-full h-full ">
          <div className="w-full h-[25rem] flex flex-col justify-between">
            <div className="flex flex-wrap w-full justify-center items-center h-20">
              <h1 className="text-3xl text-white text-center font-bold">
                Securing your <span className="text-green-500">future </span>
                with one click
              </h1>
            </div>
            <div className="w-full text-white h-24 px-4 text-center flex flex-col justify-between ">
              <p>
                Saving, Spending and Transfers are part of our lives we only
              </p>
              <p> help you make it better. With PayX we run decentralized</p>
              <p>transactions accross the globe.</p>
            </div>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="bg-green-500 w-72 mx-auto text-white font-bold rounded py-4"
            >
              Sign Up for free
            </button>
            <div className="flex justify-center ">
              <div className="flex space-x-5">
                <img
                  className="w-38 h-10"
                  src="https://www.piggyvest.com/images/iosbadge-101-image.png"
                  alt="ios"
                />
                <img
                  className="w-38 h-10"
                  src="https://www.piggyvest.com/images/google-play-badge.png"
                  alt="andriod"
                />
              </div>
            </div>
          </div>
          <div className="mt-16 mx-auto">
            <img src={card} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
