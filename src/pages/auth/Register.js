import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <ToastContainer />
      <div>
        <section class="w-full h-full pb-10 px-4 bg-gray-100">
          <div class="mx-auto max-w-7xl">
            <div class="flex flex-col lg:flex-row">
              <div class="relative w-full bg-cover lg:w-6/12 xl:w-7/12 bg-gradient-to-r ">
                <div class="relative flex flex-col items-center justify-center w-full h-full px-10 2xl:my-20 lg:px-16 lg:my-0">
                  <div class="lg:flex hidden flex-col items-start space-y-8 tracking-tight lg:max-w-3xl">
                    <div class="relative">
                      <p class="mb-2 font-medium text-gray-700 uppercase">
                        Work smarter
                      </p>
                      <h2 class="text-5xl font-bold text-gray-900 xl:text-6xl">
                        Features to help you work smarter
                      </h2>
                    </div>
                    <p class="text-2xl text-gray-700">
                      We've created a simple formula to follow in order to gain
                      more out of your business and your application.
                    </p>
                    <a
                      href="#_"
                      class="inline-block px-8 py-5 text-xl font-medium text-center text-white transition duration-200 bg-green-600 rounded-lg hover:bg-green-700 ease"
                    >
                      Get Started Today
                    </a>
                  </div>
                </div>
              </div>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  phone: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }

                  if (!values.password) {
                    errors.password = "Required";
                  }
                  if (!values.firstName) {
                    errors.firstName = "This is required";
                  }
                  if (!values.lastName) {
                    errors.lastName = "This is required";
                  }
                  if (!values.phone) {
                    errors.phone = "This is required";
                  }

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  const firstName = values.firstName;
                  const lastName = values.lastName;
                  const phone = values.phone;
                  const email = values.email;
                  const password = values.password;
                  setLoading(true);

                  try {
                    const response = await axios.post(
                      "https://payx-server.herokuapp.com/auth/signup",
                      {
                        firstName,
                        lastName,
                        phone,
                        email,
                        password,
                      }
                    );

                    if (response.status === 201) {
                      navigate("/login");
                    }
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
                    class="w-full shadow-lg mt-10 bg-white lg:w-6/12 xl:w-8/12"
                  >
                    <div class="flex flex-col items-start  justify-start w-full h-full p-10 lg:p-16 xl:p-24">
                      <h4 class="w-full text-3xl font-bold">Signup</h4>
                      <p class="text-lg text-gray-500">
                        or, if you have an account you can{" "}
                        <a href="#_" class="text-blue-600 underline">
                          sign in
                        </a>
                      </p>
                      <div class="relative w-full mt-10 space-y-6 lg:space-y-8">
                        <div className="w-full lg:flex lg:space-x-10 lg:space-y-0 space-y-6 justify-between ">
                          <div class="relative">
                            <label class="font-medium text-gray-900">
                              first name
                            </label>
                            <input
                              type="text"
                              class="block w-full lg:px-4 lg:py-4 px-2 py-2 mt-2 text-xl placeholder-gray-300 bg-green-50 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                              placeholder="Enter Your First Name"
                              name="firstName"
                              id="firstName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.firstName}
                            />
                          </div>
                          <div class="relative">
                            <label class="font-medium text-gray-900">
                              last Name
                            </label>
                            <input
                              type="text"
                              class="block w-full lg:px-4 lg:py-4 px-2 py-2 mt-2 text-xl placeholder-gray-400 bg-green-50  rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                              placeholder="Enter Your Last Name"
                              name="lastName"
                              id="lastName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.lastName}
                            />
                          </div>
                        </div>
                        <div class="relative">
                          <label class="font-medium text-gray-900">Email</label>
                          <input
                            type="email"
                            class="block w-full lg:px-4 lg:py-4 px-2 py-2 mt-2 text-xl placeholder-gray-400 bg-green-50  rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                            placeholder="Enter Your Email Address"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                        </div>
                        <div class="relative">
                          <label class="font-medium text-gray-900">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            class="block w-full lg:px-4 lg:py-4 px-2 py-2 mt-2 text-xl placeholder-gray-400 bg-green-50  rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                            placeholder="Enter Your Phone Number"
                            name="phone"
                            id="phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                          />
                        </div>
                        <div class="relative">
                          <label class="font-medium text-gray-900">
                            Password
                          </label>
                          <input
                            type="password"
                            class="block w-full lg:px-4 lg:py-4 px-2 py-2 mt-2 text-xl placeholder-gray-400 bg-green-50  rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                            placeholder="Password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                        </div>
                        <div class="relative">
                          {!loading ? (
                            <>
                              <button
                                type="submit"
                                class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-green-600 rounded-lg hover:bg-green-600 ease"
                              >
                                Create Account
                              </button>
                            </>
                          ) : (
                            <>
                              <button class="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-green-600 rounded-lg hover:bg-green-700 ease">
                                <div class="w-8 h-8 border-4 border-dashed mx-auto rounded-full animate-spin dark:border-violet-400"></div>
                              </button>
                            </>
                          )}

                          <a
                            href="#_"
                            class="inline-block w-full px-5 py-4 mt-3 text-lg font-bold text-center text-gray-900 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 ease"
                          >
                            Sign up with Google
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
