import {
  fetchPlaylistFromID,
  getPlaylistfromid,
  getStatus,
} from "@/slices/GetPlaylist";
import { getPlaylist, getSelectedPlaylistfromID } from "@/slices/PlaylistUser";
import { AppDispatch } from "@/store/store";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DetailProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const id: string | null = useSelector(getSelectedPlaylistfromID);
  const Playlist = useSelector(getPlaylistfromid);
  const status = useSelector(getStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaylistFromID(id));
    }
  }, [id]);

  return (
    // bg-gradient-to-t from-slate-900  to-emerald-500 relative -z-50
    <div className="h-full w-full box-border p-3 bg-slate-800 overflow-hidden">
      <div className="h-full w-full  bg-gradient-to-t from-slate-900  to-emerald-500 rounded-xl overflow-scroll scrollbar-hide">
        {status !== "loading" ? (
          <>
            {/* detail playlist */}
            <div className="w-full h-[40%] mobilexl:h-fit">
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
              <div className="w-full h-full flex box-border px-4 mobilexl:flex-col mobilexl:h-fit mobilexl:justify-center">
                {/* img playlist */}
                <div className="w-fit h-full flex ml-16 mobilexl:w-full mobilexl:ml-0">
                  <div className="w-[300px] h-fit m-auto shadow-2xl shadow-slate-950 mobile:w-[200px]">
                    {Playlist && Playlist.images ? (
                      <img
                        src={`${Playlist.images[0].url}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>

                {/* name playlist */}
                <div className="w-full h-full box-border px-5 text-white mobilexl:mt-10 mobilexl:text-center">
                  <div className="w-full h-full flex flex-col">
                    {/* Private/public */}
                    <div className="flex-1 w-full">
                      {Playlist.public ? (
                        <span>PUBLIC PLAYLIST</span>
                      ) : (
                        <span>PRIVATE PLAYLIST</span>
                      )}
                    </div>

                    {/* Name Playlist */}
                    <div className="flex-1 w-full text-[60px] font-bold mobile:text-[30px]">
                      {Playlist?.name}
                    </div>

                    {/* des */}
                    <div className="flex-1 w-full  mobile:font-light">{Playlist?.description}</div>

                    {/* extra in4 */}
                    <div className="flex-1 w-full">
                      {Playlist?.owner?.display_name}
                      &#8194; &#8226; &#8194;
                      {Playlist?.followers?.total} likes &#8194; &#8226; &#8194;
                      {Playlist?.tracks?.total} songs &#8218;
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Playlist */}
            <div className="w-full h-fit mt-36 box-border px-10 mobile:px-1">
              <table className="border-separate border-spacing-x-0 border-spacing-y-4 w-full text-white px-3
                mobile:p-0
              ">
                <thead className="">
                  <tr className="text-left divide-y-reverse divide-y-2">
                    <th>&#35;</th>
                    <th>Title</th>
                    <th className="mobilexl:hidden">Album</th>
                    <th className="mobilexl:hidden">Date added</th>
                    <th className="mobile:hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Playlist?.tracks?.items?.map((item: any, index: number) => {
                    return (
                      <tr className="hover:bg-CellColorHover h-fit hover:rounded-2xl">
                        <td>{index + 1}</td>
                        <td>
                          <div className="flex">
                            <img
                              src={`${
                                item.track.album.images[0]
                                  ? item.track.album.images[0].url
                                  : "https://e7.pngegg.com/pngimages/239/995/png-clipart-spotify-computer-icons-streaming-media-listen-on-spotify-hand-logo.png"
                              }`}
                              alt=""
                              className="h-20 w-20 object-cover"
                            />
                            <div className="ml-6">
                              {/* name song */}
                              <div
                                className="w-full h-[50%] text-[20px] font-semibold
                            overflow-hidden text-ellipsis mobile:text-[13px]
                          "
                              >
                                {item.track.name}
                              </div>

                              {/* author */}
                              <div className="w-full h-[50%] opacity-70">
                                {item.track.artists.map(
                                  (item: any, index: number) => {
                                    return (
                                      <span key={index}>
                                        {item.name}&#44; &#8194;
                                      </span>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="mobilexl:hidden">
                          {item.track.album.name}
                        </td>
                        <td className="mobilexl:hidden">
                          {moment(item.added_at).format("MMM DD,YYYY")}
                        </td>
                        <td className="mobile:hidden">{moment(item.track.duration_ms).format("m:ss")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default DetailProducts;
