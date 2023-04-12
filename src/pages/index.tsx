import DetailProducts from "@/components/detailproducts/DetailProducts";
import Navbar from "@/components/navbar/Navbar";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
  variable: "--font-montserrat",
});



export default function Home() {
  const dispatch = useDispatch<any>();


  useEffect(() => {
  }, []);

  return (
    <>
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

          </div>
        </div>
      </main>
    </>
  );
}
