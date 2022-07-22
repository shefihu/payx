import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Modal from "../../components/Modal";
import { PuffLoader, SyncLoader } from "react-spinners";
import FundWAlletModal from "../../components/Modals/FundWAlletModal";
import TransferModal from "../../components/Modals/TransferModal";
import BankModal from "../../components/Modals/BankModal";
const Wallet = () => {
  const [user, setUser] = useState({
    profile: null,
    fn: null,
    number: null,
    name: null,
    token: null,
  });
  const [balance, setBalance] = useState(0);
  const [profil, setProfil] = useState(false);
  const [profile, setProfile] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
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
    <div className="">
      <div className="lg:flex hidden w-full">
        <div className="w-[80rem]  lg:ml-40 2xl:ml-[20rem] mx-auto container">
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
          <div className="w-full h-60 rounded-2xl mt-4 bg-gray-900">
            <div className="w-full flex h-60 flex-col items-center justify-center">
              <h1 className="text-3xl text-white font-bold">Your Balance is</h1>
              <div className="flex  justify-between items-center w-60 ">
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
                    <PuffLoader color="#00b400" size={60} />
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
            </div>
          </div>
          <div className="w-full flex justify-between px-6  mt-10">
            <div className="w-60 h-28 rounded-lg font-bold text-white flex flex-col justify-center items-center bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                fill="currentColor"
                class="bi bi-wallet2"
                viewBox="0 0 16 16"
              >
                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
              </svg>
              <FundWAlletModal />
            </div>
            <div className="w-60 h-28 rounded-lg font-bold text-green-300 flex flex-col justify-center items-center bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                fill="currentColor"
                class="bi bi-arrow-left-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
              <TransferModal />
            </div>
            <div className="w-60 h-28 rounded-lg font-bold  text-white flex flex-col justify-center items-center bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                fill="currentColor"
                class="bi bi-building"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"
                />
                <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
              </svg>
              <BankModal />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden pb-20 flex w-full">
        <div className="w-full mx-auto container">
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
                      {/* {Menus.map((menu) => {
                        return <a href={menu.gap}>{menu.title}</a>;
                      })} */}
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
          <div className="w-full h-40 rounded-2xl mt-4 bg-gray-900">
            <div className="w-full flex flex-col h-52 items-center justify-center">
              <h1 className="text-2xl text-white font-bold">Your Balance is</h1>
              <div className="flex  justify-between items-center w-60 ">
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
                    <PuffLoader color="#00b400" size={60} />
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
            </div>
          </div>
          <div className="w-full flex flex-col justify-between items-center px-6 h-[15rem] mt-10">
            <div className="w-60 h-28 rounded-lg font-bold text-green-300 flex flex-col justify-center items-center bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                fill="currentColor"
                class="bi bi-wallet2"
                viewBox="0 0 16 16"
              >
                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
              </svg>
              <div className="relative">
                <FundWAlletModal />
              </div>
            </div>
            <div className="w-60 h-28 rounded-lg font-bold text-green-300 flex flex-col justify-center items-center bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                fill="currentColor"
                class="bi bi-arrow-left-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
              <div className="relative">
                <TransferModal />
              </div>
            </div>

            {/* <div className="w-60 h-28 rounded-lg font-bold text-green-300 flex flex-col justify-center items-center bg-gray-900">
              <div className="relative">
                <BankModal />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
