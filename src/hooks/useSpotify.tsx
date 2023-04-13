import { spotifyApi } from "@/config/Spotify";
import { ExtendedSession, TokenError } from "@/types";
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react";


const useSpotify = () => {
  const {data: session} = useSession();

  useEffect(()=> {
    if (!session) return

    // if have err in session, redirect to login
    if ((session as ExtendedSession).error === TokenError.RefreshAccessTokenError ) {
      signIn()
    }

    spotifyApi.setAccessToken((session as ExtendedSession).accessToken)
  }, [session]);

  return spotifyApi;
}

export default useSpotify;