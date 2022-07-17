import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PuffLoader, SyncLoader } from "react-spinners";
import FundWAlletModal from "../components/Modals/FundWAlletModal";
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
  }, [setUser, user.token]);
  return (
    <div>
      <div className="w-full h-screen bg-red-100 lg:flex hidden justify-center">
        <div>
          <h1>Trust me you will soon start saving soon. You X fan</h1>
        </div>
      </div>
      <div className="w-full lg:hidden flex bg-gray-100 h-screen">
        <div className="w-full">
          <div className="w-full h-20  flex flex-col justify-between">
            <h1 className="font-bold text-xl border-green-300 border-b-2">
              Account Overview
            </h1>
            <h1 className="text-xl">
              Howdy, <span className="text-2xl font-bold">{user.fn}</span>
            </h1>
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
                          <h1 className="text-5xl text-white font-bold">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
