import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { Formik } from "formik";
const FundWAlletModal = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState({
    profile: null,
    fn: null,
    number: null,
    name: null,
    token: null,
  });
  const navigate = useNavigate();
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
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <Formik
                      initialValues={{
                        amount: 0,
                      }}
                      validate={(values) => {
                        const errors = {};
                        if (!values.amount) {
                          errors.amount = "Required";
                        }

                        return errors;
                      }}
                      onSubmit={async (values, { setSubmitting }) => {
                        const amount = values.amount;

                        setLoading(true);

                        try {
                          if (amount < 499) {
                            toast.error(
                              "You can only deposit more than #500 (Be free it's not real money)"
                            );
                            return setLoading(false);
                          }
                          if (amount > 1000000) {
                            toast.error(
                              " Whoa (Thsis is fake money, take it easy) maximale est #1000000"
                            );
                            return setLoading(false);
                          }
                          const { data } = await axios.post(
                            "https://payx-server.herokuapp.com/payment/init",
                            {
                              amount: amount.toString(),
                              message: "Fund Wallet",
                            },
                            {
                              headers: {
                                authorization: `Bearer ${user.token}`,
                              },
                            }
                          );
                          console.log(data);

                          // localStorage.setItem("payxprofile", data.profile);

                          //nsole.log(payload);
                        } catch (errors) {
                          console.log(errors);
                          toast.error(errors.response.data.message);
                        }
                        // router.push("/");
                        setLoading(false);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <form
                          onSubmit={handleSubmit}
                          class="w-full mt-16 md:mt-0 md:w-2/5"
                        >
                          {loading && (
                            <>
                              {" "}
                              {/* <>
                            <button class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-green-600 rounded-lg hover:bg-green-700 ease">
                              <div class="w-8 h-8 border-4 border-dashed mx-auto rounded-full animate-spin dark:border-violet-400"></div>
                            </button>
                          </> */}
                              <div className="w-full">
                                {/* <BarLoader
                                  color={loaderColor}
                                  speedMultiplier={2.5}
                                  cssOverride={override}
                                /> */}
                              </div>
                            </>
                          )}
                          <div>
                            <h3 class="mb-6 text-2xl font-medium text-center">
                              Fund Your Wallet
                            </h3>
                            <label htmlFor="amount">Amount</label>
                            <input
                              type="number"
                              name="amount"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                              placeholder="Amount"
                            />
                            <p className="text-red-500">{errors.amount}</p>
                          </div>
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                          >
                            Fund Now
                          </button>
                        </form>
                      )}
                    </Formik>
                  </div>

                  <div className="mt-4"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="  relative  ">
        <button type="button" onClick={openModal}>
          Fund Wallet
        </button>
      </div>
    </div>
  );
};

export default FundWAlletModal;
