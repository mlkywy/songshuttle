const UserPlaylistResults = ({ playlist }) => {
  const cover = playlist.images[0]?.url;
  const title = playlist.name;
  const owner = playlist.owner.display_name;
  const description = playlist.description;

  return (
    <div className="p-4 border-b border-primary flex items-center justify-between gap-2">
      <div className="flex items-center w-5/6">
        <img src={cover} alt="" className="w-10 h-10 rounded-full mr-4" />
        <div className="flex flex-col">
          <div className="font-bold text-primary text-sm mb-2">{title}</div>
          <div className="text-primary text-xs font-medium">{description}</div>
          <div className="text-primary text-xs font-medium">
            Created by {owner}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPlaylistResults;
