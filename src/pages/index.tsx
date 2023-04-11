import Head from "next/head";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import DetailProducts from "@/components/detailproducts/DetailProducts";
import PlaylistContextProvider from "@/contexts/PlaylistContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
  variable: "--font-montserrat",
});

export default function Home() {
  return (
    <>
      <PlaylistContextProvider>
        <Head>
          <title>Spotify</title>
        </Head>
        <main className={`${montserrat.className}`}>
          <div className="w-full h-[100vh] flex relative">
            <div className="w-[250px] h-full">
              <Navbar />
            </div>

            <div className="w-[calc(100%-250px)] h-full">
              <DetailProducts />
            </div>

            <div className="fixed bottom-0 w-full h-[100px] bg-teal-50">
              Control Bar
            </div>
          </div>
        </main>
      </PlaylistContextProvider>
    </>
  );
}
