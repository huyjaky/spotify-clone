import DetailProducts from "@/components/detailproducts/DetailProducts";
import Navbar2 from "@/components/navbar/Nabvar2";
import Navbar from "@/components/navbar/Navbar";
import { spotifyApi } from "@/config/Spotify";
import { fetchPlaylist } from "@/slices/PlaylistUser";
import SliceCounter, { fetchPosts } from "@/slices/SliceCounter";
import { AppDispatch, store } from "@/store/store";
import { ExtendedSession } from "@/types";
import { useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
  variable: "--font-montserrat",
});

export default function Home() {
  const { data: session } = useSession();

  const dispatch = useDispatch<AppDispatch>();
  useMemo(() => {
    if (session) {
      spotifyApi.setAccessToken((session as ExtendedSession).accessToken);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Spotify</title>
      </Head>
      <main className={`${montserrat.className}`}>
        <div className="w-full h-[100vh] flex flex-col">
          <div className="flex w-full h-[calc(100vh-70px)]">
            <div className=" h-full w-[120px] ">
              <Navbar2 />
            </div>

            <div className="w-full h-full ">
              <DetailProducts />
            </div>
          </div>

          <div className="w-full h-[70px] bg-teal-600"></div>
        </div>
      </main>
    </>
  );
}
