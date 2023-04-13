import { fetchPlaylist, getPlaylist } from "@/slices/PlaylistUser";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailProducts = () => {
  const {data: session} = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const Playlist = useSelector(getPlaylist);

  useEffect(() => {
    if (session && Playlist.length == 0) {
      dispatch(fetchPlaylist());
    }
  }, [session])

  return (
      <div className="h-full w-full  bg-gradient-to-t from-slate-900  to-emerald-500">

      </div>
  );
};

export default DetailProducts;
