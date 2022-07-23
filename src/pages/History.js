import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { data } from "autoprefixer";
import { PropagateLoader } from "react-spinners";
const History = () => {
  const [user, setUser] = useState({
    profile: null,
    fn: null,
    number: null,
    name: null,
    token: null,
  });
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState("");
  useEffect(() => {
    const fetch = async (token) => {
      try {
        const { data } = await axios.get(
          "https://payx-server.herokuapp.com/transaction/history",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setTransaction(data);
        //nsole.log(data);
        setLoading(false);
      } catch (error) {
        //nsole.log(error);
        setLoading(false);
      }
    };
    if (Cookie.get("user")) {
      const u = JSON.parse(Cookie.get("user"));
      setUser(u);
      fetch(u.token);
    }
    setProfile(localStorage.getItem("gbeseprofile"));
  }, [setUser]);
  console.log(transaction);
  return (
    <div className="w-full container   mx-auto">
      {" "}
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-zinc-900 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-green-600">
              Transaction History
            </p>
            <div></div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5   overflow-y-auto">
          <table className="w-full overflow-x-scroll whitespace-nowrap">
            {transaction.length === 0 && (
              <>
                <h1 className="w-full text-center">No records found yet</h1>
              </>
            )}
            {loading ? (
              <div className="w-full flex justify-center">
                <PropagateLoader color="green" />
              </div>
            ) : (
              <>
                <thead>
                  <tr className="h-16 w-full text-sm leading-none text-gray-800">
                    <th className="font-normal text-left pl-12">Type</th>
                    <th className="font-normal text-left pl-32 md:pl-12 lg:pl-12">
                      Amount
                    </th>
                    <th className="font-normal md:block flex-col lg:block mt-6 hidden text-left pl-12">
                      Date
                    </th>
                    <th className="font-normal md:visible flex-col lg:visible  invisible text-left pl-20">
                      Debitor/creditor
                    </th>
                  </tr>
                </thead>
                <tbody className="w-60 ">
                  {transaction.map((history) => {
                    return (
                      <tr className="h-20 text-sm leading-none text-gray-800 bg-white  border-b border-t border-gray-100">
                        <>
                          <td className="pl-4 ">
                            <div className="flex items-center">
                              <div className="pl-4">
                                {history.debitorAccount == user.number ? (
                                  <td className="pt-2 ml-14 lg:pl-0 w-1/4">
                                    <button className="bg-red-200 text-red-600 font-bold py-2 px-4 rounded-full">
                                      Debit
                                    </button>
                                  </td>
                                ) : (
                                  <td className="ml-14 lg:pl-0 pt-2 w-1/4">
                                    <button className="bg-green-200  text-green-600 font-bold py-2 px-4 rounded-full">
                                      Credit
                                    </button>
                                  </td>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="lg:pl-12 md:pl-12 pl-32">
                            <p
                              className={
                                history.debitorAccount == user.number
                                  ? "text-sm text-red-600  font-medium leading-none "
                                  : "text-sm text-gray-800  font-medium leading-none "
                              }
                            >
                              {history.amount}
                            </p>
                          </td>
                          <td className="pl-12  md:visible flex-col lg:visible  invisible ">
                            <p className="font-medium"> {history.createdAt}</p>
                            <p className="text-xs leading-3 text-gray-600 mt-2"></p>
                          </td>
                          {history.debitorAccount == user.number ? (
                            <>
                              {" "}
                              <td className="pl-20 text-sm font-bold   md:visible flex-col lg:visible  invisible ">
                                {/* <p className="font-medium">$13,000</p> */}
                                <p className=" leading-3 text-gray-600 mt-2">
                                  {history.creditorAccount}
                                </p>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="pl-20 text-sm font-bold  md:visible flex-col lg:visible  invisible ">
                                {/* <p className="font-medium">$13,000</p> */}
                                <p className="leading-3 text-gray-600 mt-2">
                                  {history.debitorAccount === "0"
                                    ? "Funded via paystack"
                                    : history.debitorAccount}{" "}
                                </p>
                              </td>
                            </>
                          )}
                        </>
                      </tr>
                    );
                  })}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
