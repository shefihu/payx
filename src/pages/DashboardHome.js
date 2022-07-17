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
                      <h1 className="text-5xl text-white font-bold">
                        <span className="text-lg ">₦</span>
                        {balance}.00
                      </h1>
                    </div>
                  </>
                ) : (
                  <>
                    <SyncLoader color="#00b400" />
                  </>
                )}

                <div>
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
              </div>
              <div>
                <FundWAlletModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
