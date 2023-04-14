import { fetchPlaylist, getPlaylist, setPlaylistID } from "@/slices/PlaylistUser";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar2 = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const Playlist = useSelector(getPlaylist);

  useEffect(() => {
    if (session && Playlist.length == 0) {
      dispatch(fetchPlaylist());
    }
  }, [session]);

  return (
    <div className="text-white bg-slate-800 h-full w-full box-border p-3 flex flex-col">
      {/* control panel */}
      <div className="box-border p-3 bg-slate-700 rounded-xl h-min-[50px]  ">
        <button className="mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
        </button>

        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* playlist */}
      <div
        className="w-full  bg-slate-700 mt-3 rounded-xl box-border p-2 h-[65vh] ">
        <div className="h-full w-full flex flex-col">
          <button className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
              />
            </svg>
          </button>
          <div className=" w-full h-full overflow-scroll scrollbar-hide">

            {/* playlist */}
            {Playlist?.map((item, index) => {
              return (
                <>
                  <button key={index} className="mb-2 relative"
                    onClick={(event) => {
                      dispatch(setPlaylistID(item.id))
                    }}
                  >
                    <img
                      src={item.images[0].url}
                      alt=""
                      className="rounded-xl"
                    />
                  </button>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
