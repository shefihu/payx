import React, { useEffect, useState } from "react";
import Control from "../assets/icons/control.png";
import Home from "../assets/icons/home.png";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "../components/Modal";
import { Menu } from "@headlessui/react";
import { withAuth } from "./auth/withAuth";
import TransferModal from "../components/Modals/TransferModal";
const Dashboard = () => {
  //Large Screen
  const [open, setOpen] = useState(false);
  const Menus = [
    {
      title: "Dashboard",
      href: "/admin",
      src: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-house-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
          />
          <path
            fill-rule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
          />
        </svg>
      ),
    },
    {
      title: "Save",
      href: "/wallet",
      src: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-wallet-fill"
          viewBox="0 0 16 16"
        >
          <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
          <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
        </svg>
      ),
    },
    // {
    //   title: "Stash",
    //   src: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="16"
    //       height="16"
    //       fill="currentColor"
    //       class="bi bi-credit-card-fill"
    //       viewBox="0 0 16 16"
    //     >
    //       <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z" />
    //     </svg>
    //   ),
    // },
    {
      title: <TransferModal />,
      src: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
      ),
    },
    {
      title: "History",
      href: "/history",
      src: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 cursor-pointer w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            className="fill-current text-gray-300 group-hover:text-green-600"
            fill-rule="evenodd"
            d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
            clip-rule="evenodd"
          />
          <path
            className="fill-current text-gray-600 group-hover:text-green-300"
            d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
          />
        </svg>
      ),
    },
    {
      href: "/account",
      title: "Account",
      src: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
      ),
    },
    // { title: "Files ", src: "Folder", gap: true },
    { title: <Modal />, k: <Modal />, gap: true },
  ];

  //Small Screen
  const SmallMenu = [
    {
      title: "Dashboard",
      href: "/admin",
      src: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          class="bi bi-house-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            className="fill-current text-green-400 dark:text-green-400"
            d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
          />
          <path
            fill-rule="evenodd"
            className="fill-current text-green-400 dark:text-green-400"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
          />
        </svg>
      ),
    },
    {
      title: "Save",
      href: "/wallet",
      src: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          class="bi bi-wallet-fill"
          viewBox="0 0 16 16"
        >
          <path
            className="fill-current text-green-400 dark:text-green-400"
            d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z"
          />
          <path
            className="fill-current text-green-400 dark:text-green-400"
            d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z"
          />
        </svg>
      ),
    },
    {
      title: "Stash",
      href: "/stash",
      src: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          class="bi bi-credit-card-fill"
          viewBox="0 0 16 16"
        >
          <path
            className="fill-current text-green-400 dark:text-green-400"
            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z"
          />
        </svg>
      ),
    },
    // {
    //   title: "Transfer ",
    //   src: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="36"
    //       height="36"
    //       fill="currentColor"
    //       class="bi bi-arrow-left-right"
    //       viewBox="0 0 16 16"
    //     >
    //       <path
    //         fill-rule="evenodd"
    //         className="fill-current text-green-400 dark:text-green-400"
    //         d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
    //       />
    //     </svg>
    //   ),
    // },
    {
      title: "History",
      href: "/history",
      src: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 cursor-pointer w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            className="fill-current text-gray-300 group-hover:text-green-600"
            fill-rule="evenodd"
            d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
            clip-rule="evenodd"
          />
          <path
            className="fill-current text-gray-600 group-hover:text-green-300"
            d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"
          />
        </svg>
      ),
    },
    {
      title: "Account",
      href: "/account",
      src: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          class="bi bi-person-fill"
          viewBox="0 0 16 16"
        >
          <path
            className="fill-current text-green-400 dark:text-green-400"
            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
          />
        </svg>
      ),
    },
    // { title: "Files ", src: "Folder", gap: true },
    // { title: <Modal />, k: <Modal />, gap: true },
  ];
  const [active, setActive] = useState(0);

  const [user, setUser] = useState({
    profile: null,
    fn: null,
    number: null,
    name: null,
    token: null,
  });
  useEffect(() => {
    const fetch = async (token) => {
      try {
        const { data } = await axios.get(
          "https://payx-server.herokuapp.com/user/me",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {}
    };
    if (Cookies.get("user")) {
      const userInfo = JSON.parse(Cookies.get("user"));
      setUser(userInfo);
      fetch(userInfo.token);
    }
  }, [setUser, user.token]);
  return (
    <div>
      <div className="lg:flex hidden  absolute">
        <div
          className={` ${
            open && "w-72"
          } bg-zinc-900 h-[140vh]   pt-8 relative duration-300`}
        >
          <img
            src={Control}
            alt=""
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex  flex-col gap-y-10 items-center">
            <div>
              {" "}
              <h1
                className={`cursor-pointer duration-500 ${
                  open && "rotate-[360deg]"
                } font-bold text-white text-3xl`}
                alt="ldl"
              >
                PAYX
              </h1>
            </div>
            <div className="flex gap-x-4 items-center">
              <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${
                  !open && "scale-0"
                }`}
              >
                Yo,
              </h1>
              <h1 className="font-bold text-green-600 text-2xl">{user.fn}</h1>
            </div>
          </div>
          <ul className="pt-6  justify-center flex flex-col items-center w-full">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-green-50 text-gray-300 text-sm items-center w-7/12 gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <a href={Menu.href}>
                  {!open ? (
                    <div className="flex ">
                      <div>{Menu.src}</div>
                      <>{!open ? Menu.k : <></>}</>
                    </div>
                  ) : (
                    <>
                      <div>{Menu.src}</div>
                    </>
                  )}
                </a>

                <a
                  href={Menu.href}
                  className={`${
                    !open && "hidden"
                  } origin-left duration-200 text-green-400 font-bold text-lg`}
                >
                  {Menu.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full  lg:hidden flex flex-col items-end  justify-end h-full fixed ">
        <div className="w-full bg-zinc-900 flex items-center justify-center h-20">
          <ul className=" w-full bg-zinc-900 pl-4 flex justify-between">
            {SmallMenu.map((menu) => {
              return (
                <>
                  <li className="w-20">
                    <a className="w-20 h-20" href={menu.href}>
                      {menu.src}
                    </a>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
