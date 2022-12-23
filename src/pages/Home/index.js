import Search from "../../components/Search";
import Playlist from "../../components/Playlist";

const HomeDev = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <div className="flex flex-row items-center justify-center w-screen h-1/2 gap-10">
        <Search />
        <Playlist />
      </div>
    </div>
  );
};

export default HomeDev;