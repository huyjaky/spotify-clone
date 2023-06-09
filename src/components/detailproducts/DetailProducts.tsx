import {
  fetchPlaylistFromID,
  getPlaylistfromid,
  getStatus,
} from "@/slices/GetPlaylist";
import { getSelectedPlaylistfromID } from "@/slices/PlaylistUser";
import { AppDispatch } from "@/store/store";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ControlPanelAccount from "./account/ControlPanelAccount";
import useSpotify from "@/hooks/useSpotify";
import { SongContext } from "@/slices/Song";

const DetailProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const id: string | null = useSelector(getSelectedPlaylistfromID);
  const Playlist = useSelector(getPlaylistfromid);
  const status = useSelector(getStatus);

  const spotifyApi = useSpotify();
  const {songContext, setSongContext} = useContext(SongContext)

  const playSong = async (item: SpotifyApi.PlaylistTrackObject) => {
    if (!songContext.deviceID) return

    setSongContext({...songContext, selectedSong: item.track, selectedSongID: item.track?.id,
      isPlaying: true
    })
    await spotifyApi.play({
      device_id: songContext.deviceID,
      context_uri: Playlist?.uri,
      offset: {
        uri: item.track?.uri as string
      }
    })


  }


  useEffect(() => {
    if (id) {
      dispatch(fetchPlaylistFromID(id));
    }
  }, [id]);

  return (
    <div className="h-full w-full box-border p-3 bg-slate-800 overflow-hidden">
      <div className="h-full w-full  bg-gradient-to-t from-slate-900  to-emerald-500 rounded-xl overflow-scroll scrollbar-hide">

        {/* if status fetchPlaylistFromID is not exist => not show anything */}
        {status !== "loading" ? (
          <>
            {/* detail playlist */}
            <div className="w-full h-[40%] mobilexl:h-fit">
              {/* control panel account */}
              <ControlPanelAccount />

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
                  {Playlist?.tracks?.items?.map((item: SpotifyApi.PlaylistTrackObject, index: number) => {
                    return (
                      <tr
                      onClick={(event)=>{playSong(item)}}
                       className="hover:bg-CellColorHover h-fit hover:rounded-2xl" key={index}>
                        <td className="cursor-pointer">{index + 1}</td>
                        <td className="cursor-pointer">
                          <div className="flex">
                            <img
                              src={`${
                                item?.track?.album.images[0]
                                  ? item?.track?.album.images[0].url
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
                                {item?.track?.name}
                              </div>

                              {/* author */}
                              <div className="w-full h-[50%] opacity-70">
                                {item?.track?.artists.map(
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
                        <td className="mobilexl:hidden cursor-pointer">
                          {item?.track?.album.name}
                        </td>
                        <td className="mobilexl:hidden cursor-pointer">
                          {moment(item.added_at).format("MMM DD,YYYY")}
                        </td>
                        <td className="mobile:hidden cursor-pointer">{moment(item?.track?.duration_ms).format("m:ss")}</td>
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
