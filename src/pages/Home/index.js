import Search from "../../components/Search";
import Playlist from "../../components/Playlist";

const Home = () => {
  return (
    <div className="flex items-center justify-end w-screen h-screen gap-10">
      <div className="flex flex-row items-center justify-center w-2/3 h-full">
        <Playlist />
        <Search />
      </div>
    </div>
  );
};

export default Home;
