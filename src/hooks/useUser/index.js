import { useEffect, useState } from "react";
import getUser from "../../api/getUser";
import login from "../../api/login";

const useUser = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(
    window.localStorage.getItem("access_token")
  );
  const [expiresIn, setExpiresIn] = useState(
    window.localStorage.getItem("expires_in")
  );
  const hash = window.location.hash;

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser(token);
      setUserId(user?.id);
    };

    if (!token && hash) {
      const token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      const expirationTime = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("expires_in"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("access_token", token);

      const expiresIn = Date.now() / 1000 + Number(expirationTime);
      window.localStorage.setItem("expires_in", expiresIn);

      setToken(token);
      setExpiresIn(expiresIn);
    }

    if (token && !userId) {
      fetchData();
    }

    const checkTokenExpiration = setInterval(() => {
      if (expiresIn && Date.now() / 1000 > expiresIn) {
        clearInterval(checkTokenExpiration);
        redirectToAuthorization();
      }
    }, 5000);

    return () => {
      clearInterval(checkTokenExpiration);
    };
  }, [token, userId, hash, expiresIn]);

  const redirectToAuthorization = () => {
    setToken(null);
    setUserId(null);

    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("expires_in");

    const url = login();
    window.location.replace(url);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);

    const url = process.env.REACT_APP_REDIRECT_URI;

    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem("expires_in");
    window.location.replace(url);
  };

  return { userId, token, redirectToAuthorization, logout };
};

export default useUser;
