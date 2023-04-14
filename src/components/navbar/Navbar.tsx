import { fetchPlaylist, getPlaylist } from "@/slices/PlaylistUser";
import { AppDispatch } from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const Playlist = useSelector(getPlaylist);

  useEffect(() => {
    if (session && Playlist.length == 0) {
      dispatch(fetchPlaylist());
    }
  }, [session]);

  return (
    <div
      className="h-full w-full p-5 flex justify-center font-semibold text-[17px]
      text-white bg-slate-800
    "
    >
      <div className="w-fit flex-col flex h-full mb-28 ">
        {session?.user && (
          <button
            className="mb-3"
            onClick={() => {
              signOut();
            }}
          >
            {session.user.name} - Logout
          </button>
        )}

        {/* home */}
        <Link href="/" className="w-full flex mb-3">
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
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span>Home</span>
        </Link>

        {/* search */}
        <Link href={"/"} className="w-full flex mb-3 ">
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <span>Search</span>
        </Link>

        {/* library */}
        <Link href={"/"} className="w-full flex mb-6">
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
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span>Library</span>
        </Link>

        <hr />

        {/* create playlist */}
        <Link href={"/"} className="w-full flex mb-3 mt-6">
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
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Create Playlist</span>
        </Link>

        {/* Liked Songs */}
        <Link href={"/"} className="w-full flex mb-3">
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
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span>Liked Songs</span>
        </Link>

        {/* Your Episodes */}
        <Link href={"/"} className="w-full flex mb-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="">Your Episodes</span>
        </Link>


        <div  className="w-full box-border p-6 bg-slate-700 h-full
          rounded-2xl
        ">
          {Playlist?.map((item, index) => {
            return (
              <div key={index} className="mb-5 overscroll-contain relative">
                <Link href={"/"}>
                  <img src={item.images[0].url} alt="" className="rounded-xl"/>
                </Link>

                {/* toast */}
                <div className="absolute top-[40%] right-[-40%] z-50 text-emerald-500">
                  check
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
