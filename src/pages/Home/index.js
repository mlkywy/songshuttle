import Search from "../../components/Search";
import Playlist from "../../components/Playlist";
import ImageUploader from "../../components/ImageUploader";

const Home = () => {
  return (
    <div className="flex items-center justify-start w-screen h-screen gap-10">
      <div className="flex flex-row items-center justify-center w-2/3 h-full">
        <Playlist />
        <Search />
        {/* <ImageUploader /> */}
      </div>
    </div>
  );
};

export default Home;
