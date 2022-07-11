import React from "react";
import Secure from "../assets/images/secure.png";
import DebitCArd from "../assets/images/debitcard.png";
import Lifestyle from "../assets/images/Lifestyle.png";
const Features = () => {
  return (
    <>
      <div className="lg:flex hidden">
        <div className="  mx-auto h-full w-full">
          <div className="w-full text-center font-bold text-5xl py-10">
            <h1>WHY PAYX?</h1>
          </div>
          <div className="flex justify-between mt-20">
            <img src={Secure} alt="" className="w-[27rem] h-[27rem] ml-40" />
            <div className="w-[45rem] rounded-l-full  flex items-center flex-col justify-center bg-gray-200 h-[25rem]">
              <h1 className=" w-[30rem] font-extrabold text-4xl">
                Secure Payment
              </h1>
              <div className="w-[30rem]">
                <p className="mt-5 text-xl ">
                  With PAYX you be rest assured that your money is being secured
                  and accountable for while living your best life
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-64">
            <div className="w-[45rem] rounded-r-full  flex items-center flex-col justify-center bg-green-100 h-[25rem]">
              <h1 className=" w-[30rem] font-extrabold text-4xl">
                Get A Free Debit Card !!!!
              </h1>
              <div className="w-[30rem]">
                <p className="mt-5 text-xl ">
                  No Delivery , Maintenance or Card fee . The definition of true
                  financial freedom.
                </p>
              </div>
            </div>
            <img src={DebitCArd} alt="" className="w-[27rem] h-[27rem] mr-40" />
          </div>
          <div className="flex justify-between mt-64">
            <img src={Lifestyle} alt="" className="w-[27rem] h-[27rem] ml-40" />
            <div className="w-[45rem] rounded-l-full  flex items-center flex-col justify-center bg-orange-100 h-[25rem]">
              <h1 className=" w-[30rem] font-extrabold text-4xl">
                PAYX is more than an app It’s a Lifestyle
              </h1>
              <div className="w-[30rem]">
                <p className="mt-5 text-xl ">
                  Join our diverse community , be part of our family. Get tips
                  on saving and financial freedom on our community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
