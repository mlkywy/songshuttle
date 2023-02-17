import axios from "axios";
import { SPOTIFY_ENDPOINTS } from "../constants";

const getRefreshToken = async (refreshToken) => {
  const credentials = `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`;
  const encodedCredentials = Buffer.from(credentials).toString("base64");

  const headers = {
    Authorization: `Basic ${encodedCredentials}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const params = { refresh_token: refreshToken };

  try {
    const { data } = await axios.post(SPOTIFY_ENDPOINTS.GET_REFRESH_TOKEN, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getRefreshToken;
