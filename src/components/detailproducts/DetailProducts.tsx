import { fetchPlaylistFromID, getPlaylistfromid } from "@/slices/GetPlaylist";
import { getPlaylist, getSelectedPlaylistfromID } from "@/slices/PlaylistUser";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const id: string | null = useSelector(getSelectedPlaylistfromID);
  const Playlist = useSelector(getPlaylistfromid);

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaylistFromID(id));

    }
  }, [id]);

  return (
    <div className="h-full w-full  bg-gradient-to-t from-slate-900  to-emerald-500 relative -z-50">
      {Playlist?.name}
    </div>
  );
};

export default DetailProducts;
