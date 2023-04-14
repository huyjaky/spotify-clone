import { fetchPlaylistFromID, getPlaylistfromid } from "@/slices/GetPlaylist";
import { getPlaylist, getSelectedPlaylistfromID } from "@/slices/PlaylistUser";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const id: string | null = useSelector(getSelectedPlaylistfromID);
  const Playlist = useSelector(getPlaylistfromid);

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaylistFromID(id));
    }
  }, [id]);

  return (
    // bg-gradient-to-t from-slate-900  to-emerald-500 relative -z-50
    <div className="h-full w-full box-border p-3 bg-slate-800 pb-[75px]">
      <div className="h-full w-full  bg-gradient-to-t from-slate-900  to-emerald-500 rounded-xl overflow-hidden">
        {/* detail playlist */}
        <div className="w-full h-[40%] bg-slate-300">
          {/* control panel account */}
          <div className="w-full h-[50px] flex justify-end">
            <div className="rounded-full overflow-hidden mr-2 mt-2 border-[5px] border-zinc-600">
              <img
                src={`${session?.user?.image}`}
                alt=""
                className="h-full w-full object-cover "
              />
            </div>
          </div>

          {/* des */}
          <div className="w-full h-full flex box-border px-4">
            {/* img playlist */}
            <div className="w-fit h-full flex">
              <div className="w-[400px] h-full m-auto shadow-2xl shadow-slate-950">
                {Playlist?.images?.map((item: any, index: number) => {
                  return (
                    <div className="w-full h-full" key={index}>
                      <img
                        src={`${item.url}`}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* name playlist */}
            <div className="w-full h-full bg-emerald-500 box-border px-5">
              <div className="w-full h-full">

                {/* Private/public */}
                <div className="">
                  {Playlist.public ? (
                    <span>PUBLIC PLAYLIST</span>
                  ) : (
                    <span>PRIVATE PLAYLIST</span>
                  )}
                </div>

                {/* Name Playlist */}
                <div>
                  {Playlist?.name}
                </div>

                {/* des */}
                <div>
                  {Playlist?.description}
                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProducts;
