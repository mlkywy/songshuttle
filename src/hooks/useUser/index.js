import { useEffect, useState } from "react";
import getUser from "../../api/getUser";

const useUser = () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
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

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }

    if (token && !userId) {
      fetchData();
    }
  }, [token, userId, hash]);

  const logout = () => {
    setToken(null);
    setUserId(null);
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return { userId, token, logout };
};

export default useUser;
