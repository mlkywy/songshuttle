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
            <Link to="/songshuttle/">
              <h1 className="px-2 py-4 text-md font-bitter font-extrabold text-highlight items-center flex gap-1">
                <ArrowUUpLeft size="1.5rem" /> okay, now take me back!
              </h1>
            </Link>

            <h1 className="p-2 text-2xl font-bitter font-bold">
              What is SongShuttle?
            </h1>
            <p className="p-2">
              <span className="font-bold">Glad you asked.</span> SongShuttle is
              a simple web application that makes use of the{" "}
              <span className="font-bold">Spotify API</span> to search for
              songs, generate recommendations, and create playlists for your
              account on the fly! It's built with the React framework and
              involves the implicit grant flow, so there is no server-side code
              required to authorize users to log in and make calls to the API
              with the app.
            </p>

            <h1 className="p-2 text-2xl font-bitter font-bold">
              How do you use it?
            </h1>
            <p className="p-2">
              This app is currently in development and prone to bugs; you cannot
              log in with your Spotify account unless your email has already
              been added to the developer's dashboard. Reach out to me if you
              want to give it a try!
            </p>
            <p className="p-2">
              To create a new playlist, click on the{" "}
              <span className="font-bold">'new playlist'</span> button. You
              should also be greeted with the same screen upon logging in, where
              you can search for songs and add them to a playlist, along with a
              title and description. The star icon generates recommendations
              based on your current song pick in the search bar.
            </p>
            <p className="p-2">
              To update an existing playlist, click on the{" "}
              <span className="font-bold">'your playlists'</span> button to be
              directed to a screen on which you can refresh your playlists and
              see your current ones. After you click on the pencil icon, you
              will be taken back to the original screen with your playlist ready
              to be edited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
