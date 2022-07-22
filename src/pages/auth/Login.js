import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { BarLoader } from "react-spinners";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loaderColor, setLoaderColor] = useState("#00FF00");
  const navigate = useNavigate();
  const override = {
    width: "100%",
    margin: "0 auto",
    backgroundColor: "white",
    BarLoader: "green",
  };
  return (
    <div>
      <ToastContainer />
      <section class="w-full h-screen px-8 py-16 bg-gray-100 xl:px-8">
        <div class="max-w-5xl mx-auto">
          <div class="flex flex-col items-center md:flex-row">
            <div class="w-full md:flex lg:flex flex-col hidden space-y-5 md:w-3/5 md:pr-16">
              <p class="font-medium text-green-500 uppercase">
                Building Financial
              </p>
              <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                Building financial solutions
              </h2>
              <p class="text-xl text-gray-600 md:pr-16">
                Learn how to engage with your visitors and teach them about your
                mission. We're revolutionizing the way customers and businesses
                interact.
              </p>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (!values.password) {
                  errors.password = "Required";
                }

                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const email = values.email;
                const password = values.password;
                setLoading(true);

                try {
                  const { data } = await axios.post(
                    "https://payx-server.herokuapp.com/auth/signin",
                    {
                      email,
                      password,
                    }
                  );
                  console.log(data);

                  // localStorage.setItem("payxprofile", data.profile);
                  const payload = {
                    ...data,
                    profile: null,
                  };
                  //nsole.log(payload);
                  Cookies.set("user", JSON.stringify(payload), {
                    expires: 1 / 24,
                  });
                  navigate("/admin");
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
                        <BarLoader
                          color={loaderColor}
                          speedMultiplier={2.5}
                          cssOverride={override}
                        />
                      </div>
                    </>
                  )}
                  <div class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7">
                    <h3 class="mb-6 text-2xl font-medium text-center">
                      Sign in to your Account
                    </h3>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                      placeholder="Email address"
                    />
                    <input
                      type="password"
                      name="password"
                      required
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                      placeholder="Password"
                    />
                    <div class="block">
                      <>
                        <button
                          type="submit"
                          class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-green-600 rounded-lg hover:bg-green-600 ease"
                        >
                          Log in
                        </button>
                      </>
                    </div>
                    <p class="w-full mt-4 text-sm text-center text-gray-500">
                      Don't have an account?{" "}
                      <a href="#_" class="text-blue-500 underline">
                        Sign up here
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
