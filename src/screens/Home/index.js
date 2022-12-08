import { Primary } from "../../components/Buttons";

const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-row justify-center md:px-32 lg:px-64">
        <div className="flex flex-row items-center gap-5 justify-between">
          <Primary
            option="Login to Spotify"
            link={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
