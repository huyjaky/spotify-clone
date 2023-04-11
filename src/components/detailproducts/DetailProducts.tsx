import PlaylistContextProvider, { usePlaylistContext } from "@/contexts/PlaylistContext";

const DetailProducts = () => {
  const {PlaylistContextState} = usePlaylistContext();
  console.log(PlaylistContextState);
  return (
      <div className="h-full w-full  bg-gradient-to-t from-slate-900  to-emerald-500">

      </div>
  );
};

export default DetailProducts;
