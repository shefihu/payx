import React from "react";

const Stats = () => {
  return (
    <div>
      <section className="p-6 lg:flex hidden bg-zinc-900 dark:text-gray-100">
        <div className=" 2xl:ml-14 container grid 2xl:w-[70rem] pt-20   grid-cols-2 text-center lg:grid-cols-3">
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl text-white font-bold leading-none lg:text-6xl">
              200K
            </p>
            <p className="lg:text-2xl text-white sm:text-base">
              Registered users
            </p>
          </div>
          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leading-none text-white lg:text-6xl">
              50+
            </p>
            <p className="text-sm text-white sm:text-base">Countries</p>
          </div>

          <div className="flex flex-col justify-start m-2 lg:m-6">
            <p className="text-4xl font-bold leading-none text-white lg:text-6xl">
              3
            </p>
            <p className="text-sm text-white sm:text-base">Published books</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stats;
