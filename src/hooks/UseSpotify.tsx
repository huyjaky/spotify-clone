import { spotifyApi } from "@/config/Spotify";
import { ExtendedSession, TokenError } from "@/types";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";



const UseSpotify = () => {
  const {data: session} = useSession();

  useEffect(() => {
    if (!session) return

    // if refresh token fail, redirect to login
    if ((session as ExtendedSession).error === TokenError.RefreshAccessTokenError) {
      signIn()
    }

    spotifyApi.setAccessToken((session as ExtendedSession).accessToken)
  }, [session]);

  return spotifyApi;
}

export default UseSpotify;