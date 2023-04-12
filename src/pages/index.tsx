import DetailProducts from "@/components/detailproducts/DetailProducts";
import Navbar from "@/components/navbar/Navbar";
import {
  decrement,
  fetchPosts,
  getErr,
  getStatus,
  increment,
  selectVal,
} from "@/slices/SliceCounter";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
  variable: "--font-montserrat",
});

type FetchPostsAction = ReturnType<typeof fetchPosts>;

export default function Home() {
  const dispatch = useDispatch<any>();
  const count = useSelector(selectVal);
  const status = useSelector(getStatus);
  const err = useSelector(getErr);

  useEffect(() => {
    const postList = dispatch(fetchPosts());
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
            <span>{count}</span>
            <button
              onClick={(event) => dispatch(increment())}
              className="bg-emerald-500"
            >
              Increment
            </button>
            <button
              onClick={(event) => dispatch(decrement())}
              className="bg-red-400"
            >
              Decrement
            </button>
            {status === "loading" ? <div>Loading</div> : <div>Done</div>}
          </div>
        </div>
      </main>
    </>
  );
}
