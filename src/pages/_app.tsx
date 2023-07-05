import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import SongContextProvider from "@/slices/Song";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Provider store={store}>
        <SessionProvider session={session}>
          <SongContextProvider>
            <Component {...pageProps} />
          </SongContextProvider >
        </SessionProvider>
      </Provider>
    </>
  );
}

