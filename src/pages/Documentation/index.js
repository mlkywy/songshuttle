import { ArrowUUpLeft } from "phosphor-react";
import { Link } from "react-router-dom";

const Documentation = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-1/2 flex items-center overflow-y-auto justify-center"
          style={{ height: `calc(100vh - 10rem)` }}
        >
          <div className="max-h-full text-main">
            <Link to="/">
              <h1 className="px-2 py-4 text-md font-bitter font-extrabold text-highlight items-center flex gap-1">
                <ArrowUUpLeft size="1.5rem" /> don't care, take me back!
              </h1>
            </Link>

            <h1 className="p-2 text-2xl font-bitter font-bold">
              What is SongShuttle?
            </h1>
            <p className="p-2">
              <span className="font-bold">Glad you asked.</span> SongShuttle is
              a simple application that makes use of the{" "}
              <span className="font-bold">Spotify API</span> to search for
              songs, find recommendations, and create playlists on your account
              on the fly!
            </p>
            <h1 className="p-2 text-2xl font-bitter font-bold">
              How does it work?
            </h1>
            <p className="p-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
            <p className="p-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
