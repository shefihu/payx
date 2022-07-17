import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export const withAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
      const getUser = async () => {
        const user = Cookies.get("user");
        if (!user) {
          navigate("/login");
        } else {
          setData(JSON.parse(user));
        }
      };
      getUser();
    }, [navigate]);

    return !!data ? <Component data={data} /> : null; // Render whatever you want while the authentication occurs
  };

  return AuthenticatedComponent;
};
