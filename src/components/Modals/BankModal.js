import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarLoader,
  BounceLoader,
  ClipLoader,
  PropagateLoader,
} from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { Formik } from "formik";
const BankModal = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    profile: null,
    fn: null,
    number: null,
    name: null,
    token: null,
  });
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [fund, setFund] = useState(false);
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState("");
  const [pin, setPin] = useState("");
  const [transfer, setTransfer] = useState(false);
  const [message, setMesage] = useState("");
  const [accountName, setAccountName] = useState("");
  const [pay, setPay] = useState(false);
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState("");
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
        setBanks(data.data.data);
        setBalance(data.balance);
      } catch (error) {}
    };
    if (Cookies.get("user")) {
      const userInfo = JSON.parse(Cookies.get("user"));
      setUser(userInfo);
      fetch(userInfo.token);
    }
  }, [setUser, user.token]);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const getName = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://payx-server.herokuapp.com/user/getName",
        {
          account: parseInt(account),
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAccountName(data);
      setLoading(false);
    } catch (error) {
      setAccountName("");
      //nsole.log(error);
      toast.error("This account number is not a Gbese account number");
      setLoading(false);
    }
    setLoading(false);
  };

  const getPname = async () => {
    try {
      setLoading(true);
      const b = banks.find((b) => b.name === bank);
      //nsole.log(b, account);
      const { data } = await axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${account}&bank_code=${b.code}`,
        {
          headers: {
            Authorization:
              "Bearer sk_test_c12b45c4a24b3f2822dc455384aae998665807ea",
          },
        }
      );
      setAccountName(data.data.account_name);
      setLoading(false);
    } catch (error) {
      toast.error("This account number doesn't belong to this bank");
      setLoading(false);
      setAccountName("");
      //nsole.log(error);
    }
  };
  return (
    <div>
      <ToastContainer />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <h3 class="mb-6 text-2xl font-medium text-center">
                      Bank Transfer
                    </h3>
                  </Dialog.Title>{" "}
                  <div className="mt-2 w-full ">
                    {" "}
                    Coming soon
                    {/* <div class="w-full  mt-16 md:mt-0 ">
                      <div className="w-full">
                        <select
                          required
                          className="block  w-full px-4 mb-4 pt-2 mt-2 text-gray-700 bg-white border rounded-md :bg-gray-800 :text-gray-300 :border-gray-600 focus:border-blue-400 :focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                          value={bank}
                          onChange={(e) => {
                            setBank(e.target.value);
                            //nsole.log(e.target.value);
                          }}
                          style={{
                            paddingRight: "300px",
                            paddingBottom: "5px",
                          }}
                        >
                          {banks.map((b) => (
                            <option key={b.code} className="bg-white">
                              {b.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-full">
                        <label htmlFor="amount">Account No</label>
                        <input
                          type="number"
                          name="accountNo"
                          value={account}
                          onChange={(e) => setAccount(e.target.value)}
                          onBlur={getPname}
                          required
                          class=" w-full px-4 py-3 mb-4  border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="w-full">
                        <label htmlFor="amount">Account Name</label>
                        <input
                          type="text"
                          name="accountName"
                          value={accountName}
                          disabled
                          required
                          class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                          //
                        />
                      </div>

                      <div className="w-full">
                        <label htmlFor="amount">Amount</label>
                        <input
                          type="number"
                          name="amount"
                          value={amount}
                          onChange={(e) => setAmount(parseInt(e.target.value))}
                          reqired
                          class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="amount">Message</label>
                        <input
                          type="text"
                          required
                          class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="w-full">
                        <label htmlFor="amount">Pin</label>
                        <input
                          type="password"
                          name="pin"
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          required
                          class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      {!loading ? (
                        <div>
                          {" "}
                          <button
                            onClick={"transferHandler"}
                            disabled
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                          >
                            Send
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            disabled
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                          >
                            <ClipLoader color="green" size={15} />
                          </button>
                        </div>
                      )}
                    </div> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="    ">
        <button type="button" onClick={openModal}>
          Bank Transfer
        </button>
      </div>
    </div>
  );
};

export default BankModal;
