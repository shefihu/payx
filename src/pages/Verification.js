import axios from "axios";
import Cookie from "js-cookie";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";

const Verification = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const verify = async (reference, token) => {
    try {
      const response = await axios.post(
        "https://payx-server.herokuapp.com/payment/verify",
        {
          ref: reference,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/admin");
    } catch (error) {
      toast.error("This transaction was not processed");
    }
  };
  const search = location.search;
  const reference = new URLSearchParams(search).get("reference");
  if (Cookie.get("user")) {
    const user = JSON.parse(Cookie.get("user"));
    verify(reference, user.token);
  }
  return (
    <div>
      <ToastContainer />
      <div className="h-screen flex flex-col items-center justify-center w-full bg-black">
        <h1 className="text-white font-bold text-xl ">
          Your payment is being processed ...
        </h1>
        <PuffLoader color="green" size={100} />
      </div>
    </div>
  );
};

export default Verification;
