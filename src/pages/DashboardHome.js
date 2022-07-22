import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PuffLoader, SyncLoader } from "react-spinners";
import FundWAlletModal from "../components/Modals/FundWAlletModal";
import Carousel from "../components/Carousel";
import Modal from "../components/Modal";
import { Menu } from "@headlessui/react";
const DashboardHome = () => {
  const [user, setUser] = useState({
    profile: null,
    fn: null,
    number: null,
    name: null,
    token: null,
  });
  const [balance, setBalance] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [profile, setProfile] = useState("");
  const [profil, setProfil] = useState(false);
  const refreshHandler = async () => {
    try {
      setRefresh(true);
      const { data } = await axios.get(
        "https://payx-server.herokuapp.com/user/me",
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setBalance(data.balance);
      setRefresh(false);
    } catch (error) {
      //nsole.log(error);
      setRefresh(false);
    }
  };

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
        setBalance(data.balance);
        console.log(data.balance);
      } catch (error) {}
    };
    if (Cookies.get("user")) {
      const userInfo = JSON.parse(Cookies.get("user"));
      setUser(userInfo);
      fetch(userInfo.token);
    }
    setProfile(localStorage.getItem("gbeseprofile"));
  }, [setUser, user.token]);
  const Menus = [
    // { title: "Files ", src: "Folder", gap: true },
    { title: <Modal />, k: <Modal />, gap: true },
  ];

  return (
    <div>
      <div className="w-full  lg:flex hidden">
        <div className="w-[80rem] lg:ml-40 2xl:ml-[20rem]   mx-auto container">
          <div className="w-full border-green-300 border-b-2 flex items-center px-2 py-2 justify-between">
            <h1 className="font-bold text-xl ">Account Overview</h1>
            <div
              className="flex items-center relative cursor-pointer"
              onClick={() => setProfil(!profil)}
            >
              <div className="rounded-full">
                {profil ? (
                  <ul className="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16 ">
                    <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                      <div className="flex  items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-user"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <circle cx={12} cy={7} r={4} />
                          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                        <a href="/account" className="text-sm  ml-2">
                          My Profile
                        </a>
                      </div>
                    </li>
                    <li className="flex w-full justify-between relative text-gray-600 hover:text-indigo-700 cursor-pointer items-center mt-2">
                      {Menus.map((menu) => {
                        return <a href={menu.gap}>{menu.title}</a>;
                      })}
                    </li>
                  </ul>
                ) : (
                  ""
                )}
                <div className="relative">
                  {profile === null ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      class="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  ) : (
                    <>
                      <img
                        src={profile}
                        alt=""
                        className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                      />
                    </>
                  )}
                  <div className="w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto" />
                </div>
              </div>
              <p className="text-gray-800 text-sm mx-3">{user.fn}</p>
              <div className="cursor-pointer text-gray-600">
                <svg
                  aria-haspopup="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-down"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>{" "}
          <div className="w-full mt-4 h-40 px-2 container ">
            <div className="w-full flex flex-col justify-between bg-zinc-900 py-2 px-2 rounded-xl h-full">
              <h1 className="text-white font-bold text-xl">Total money</h1>

              <div className="flex justify-between items-center w-60 ">
                {!refresh ? (
                  <>
                    {" "}
                    <div className="">
                      {!showBalance ? (
                        <>
                          <h1 className="text-5xl text-white font-bold">
                            *****
                          </h1>
                        </>
                      ) : (
                        <>
                          {" "}
                          <h1 className="text-3xl text-white font-bold">
                            <span className="text-lg ">₦</span>
                            {balance}.00
                          </h1>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <SyncLoader color="#00b400" />
                  </>
                )}

                <div className="relative flex   justify-center w-40  rounded-xl ">
                  {refresh ? (
                    <PuffLoader color="#00b400" size={34} />
                  ) : (
                    <lord-icon
                      src="https://cdn.lordicon.com/nxaaasqe.json"
                      trigger="hover"
                      // style="width:250px;height:250px"
                      style={{
                        color: "red",
                        width: "100px",
                        height: "50px",
                        fontWeight: "bold",
                      }}
                      onClick={refreshHandler}
                    ></lord-icon>
                  )}
                  <div className="mt-4">
                    {!showBalance ? (
                      <>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          class="bi bi-eye-fill"
                          viewBox="0 0 16 16"
                          onClick={() => {
                            setShowBalance(true);
                          }}
                          className={
                            !setShowBalance ? "hidden" : "flex relative"
                          }
                        >
                          <path
                            className="fill-current text-green-400"
                            d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                          />
                          <path
                            className="fill-current text-green-400"
                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          fill="currentColor"
                          class="bi bi-eye-slash-fill"
                          viewBox="0 0 16 16"
                          className="relative"
                          onClick={() => {
                            setShowBalance(false);
                          }}
                        >
                          <path
                            className="text-green-400 fill-current"
                            d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                          />
                          <path
                            className="text-green-400 fill-current"
                            d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg">
                  <FundWAlletModal />
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="text-center mt-20 my-4 font-bold text-gray-700">
              Download our mobile app(coming soon X fans)
            </p>
            <div className="flex justify-center">
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
          <div className="w-full container bg-gray-100 h-60 px-2 mt-10">
            <div className="w-full  bg-gray-900 rounded-2xl h-52 px-4 mt-10">
              <h1 className="text-white font-bold text-lg pt-14">
                Account Number
              </h1>
              <h1 className="text-white text-4xl font-bold pt-4">
                {user.number}
              </h1>
            </div>
          </div>
          <div className="w-full container bg-gray-100 h-60 px-2 mt-10">
            <div className="w-full  bg-gray-900 rounded-2xl h-52 px-4 mt-10">
              <h1 className="text-white font-bold text-lg pt-14">
                Account Number
              </h1>
              <h1 className="text-white text-4xl font-bold pt-4">
                {user.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:hidden flex bg-gray-100 h-full pb-40">
        <div className="w-full">
          <div className="w-full h-20  flex flex-col justify-between">
            <div className="w-full border-green-300 border-b-2 flex items-center px-2 py-2 justify-between">
              <h1 className="font-bold text-xl ">Account Overview</h1>
              <div
                className="flex items-center relative cursor-pointer"
                onClick={() => setProfil(!profil)}
              >
                <div className="rounded-full">
                  {profil ? (
                    <ul className="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16 ">
                      <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                        <div className="flex  items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-user"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <circle cx={12} cy={7} r={4} />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                          </svg>
                          <a href="/account" className="text-sm  ml-2">
                            My Profile
                          </a>
                        </div>
                      </li>
                      <li className="flex w-full justify-between relative text-gray-600 hover:text-indigo-700 cursor-pointer items-center mt-2">
                        {Menus.map((menu) => {
                          return <a href={menu.gap}>{menu.title}</a>;
                        })}
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                  <div className="relative">
                    {profile === null ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        class="bi bi-person-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      </svg>
                    ) : (
                      <>
                        <img
                          src={profile}
                          alt=""
                          className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                        />
                      </>
                    )}
                    <div className="w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto" />
                  </div>
                </div>
                <p className="text-gray-800 text-sm mx-3">{user.fn}</p>
                <div className="cursor-pointer text-gray-600">
                  <svg
                    aria-haspopup="true"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-down"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>
            {/* <h1 className="text-xl">
              Howdy, <span className="text-2xl font-bold">{user.fn}</span>
            </h1> */}
          </div>
          <div className="w-full mt-4 h-40 px-2 container ">
            <div className="w-full flex flex-col justify-between bg-zinc-900 py-2 px-2 rounded-xl h-full">
              <h1 className="text-white font-bold text-xl">Total money</h1>

              <div className="flex justify-between items-center w-1/2 ">
                {!refresh ? (
                  <>
                    {" "}
                    <div className="">
                      {!showBalance ? (
                        <>
                          <h1 className="text-5xl text-white font-bold">
                            *****
                          </h1>
                        </>
                      ) : (
                        <>
                          {" "}
                          <h1 className="text-3xl text-white font-bold">
                            <span className="text-lg ">₦</span>
                            {balance}.00
                          </h1>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <SyncLoader color="#00b400" />
                  </>
                )}

                <div className="relative">
                  {refresh ? (
                    <PuffLoader color="#00b400" size={34} />
                  ) : (
                    <lord-icon
                      src="https://cdn.lordicon.com/nxaaasqe.json"
                      trigger="hover"
                      // style="width:250px;height:250px"
                      style={{
                        color: "red",
                        width: "100px",
                        height: "50px",
                        fontWeight: "bold",
                      }}
                      onClick={refreshHandler}
                    ></lord-icon>
                  )}
                </div>
                <div>
                  {!showBalance ? (
                    <>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        class="bi bi-eye-fill"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          setShowBalance(true);
                        }}
                        className={!setShowBalance ? "hidden" : "flex relative"}
                      >
                        <path
                          className="fill-current text-green-400"
                          d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                        />
                        <path
                          className="fill-current text-green-400"
                          d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="currentColor"
                        class="bi bi-eye-slash-fill"
                        viewBox="0 0 16 16"
                        className="relative"
                        onClick={() => {
                          setShowBalance(false);
                        }}
                      >
                        <path
                          className="text-green-400 fill-current"
                          d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                        />
                        <path
                          className="text-green-400 fill-current"
                          d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                        />
                      </svg>
                    </>
                  )}
                </div>
              </div>
              <div>
                <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg">
                  <FundWAlletModal />
                </button>
              </div>
            </div>
          </div>
          {/* <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Carousel /> */}
          {/* <div className=" container mt-10   w-full h-full">
            <div className="  w-full  h-1/3 ">
              <img
                src="https://images.unsplash.com/photo-1609429019995-8c40f49535a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmlzYSUyMGNhcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
                className="absolute px-2 rounded-xl"
              />
              <div>
                <h1 className="relative px-4 text-white  font-bold text-3xl top-32">
                  Fast and reliable payment you can trust
                </h1>
              </div>
            </div>
            <div>
              <p className="text-center mt-20 my-4 font-bold text-gray-700">
                Download our mobile app(coming soon X fans)
              </p>
              <div className="flex justify-center">
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
              <div className="w-full flex flex-col justify-between bg-zinc-900 py-2 px-2 rounded-xl h-full">
                <h1 className="text-white font-bold text-xl">Account Number</h1>

                <div></div>
              </div>
            </div>
          </div> */}
          <div>
            <p className="text-center mt-20 my-4 font-bold text-gray-700">
              Download our mobile app(coming soon X fans)
            </p>
            <div className="flex justify-center">
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
          <div className="w-full container bg-gray-100 h-60 px-2 mt-10">
            <div className="w-full  bg-gray-900 rounded-2xl h-52 px-4 mt-10">
              <h1 className="text-white font-bold text-lg pt-14">
                Account Number
              </h1>
              <h1 className="text-white text-4xl font-bold pt-4">
                {user.number}
              </h1>
            </div>
          </div>
          <div className="w-full container bg-gray-100 h-60 px-2 mt-10">
            <div className="w-full  bg-gray-900 rounded-2xl h-52 px-4 mt-10">
              <h1 className="text-white font-bold text-lg pt-14">
                Account Number
              </h1>
              <h1 className="text-white text-4xl font-bold pt-4">
                {user.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
