import Search from '../../components/Search/Search';

const HomeDev = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-10">
      <div className="flex flex-col items-center w-full gap-5 justify-between">
        <Search />
      </div>
    </div>
  );
};

export default HomeDev;
