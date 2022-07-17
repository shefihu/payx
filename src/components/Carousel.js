import React from "react";
import AliceCarousel from "react-alice-carousel";
import "../styles/alicecarousel.css";
const Carousel = () => {
  const boxes = [
    {
      id: 1,
      name: "yo waimo",
      subname: "Fund Your Wallet in one instance",
      href: "/account",
    },
    {
      id: 2,
      name: "yo waimo",
      subname: "super fast transactions",
      href: "/account",
    },
    {
      id: 3,
      name: "yo waimo",
      subname: "keep track of your savings",
      href: "/account",
    },
    {
      id: 4,
      name: "yo waimo",
      subname: "Access your account with one tap",
      href: "/account",
    },
  ];
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  const items = boxes.map((box) => {
    return (
      <>
        <div
          href={box.href}
          className="w-40 h-40 rounded-xl bg-green-50 shadow mt-20 fixed"
        >
          <a
            className=" flex flex-col justify-between px-2 py-2 w-full text-black h-full  "
            href={box.href}
          >
            <h1 className="text-xl">{box.subname}</h1>
            <h1>{box.name}</h1>
          </a>
        </div>
      </>
    );
  });
  return (
    <div className="">
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  );
};

export default Carousel;
