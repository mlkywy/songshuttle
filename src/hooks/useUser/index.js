import { useEffect, useState } from "react";
import getUser from "../../api/getUser";

const useUser = async () => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchData = async () => {
      if (token && !userId) {
        const user = await getUser(token);
        setUserId(user?.id);
      }
    };
    fetchData();
  }, [token, userId]);

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
  };

  return [userId, token, logout];
};

export default useUser;
