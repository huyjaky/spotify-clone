import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import { scopes, spotifyApi } from "../../../config/Spotify";
import { CallbacksOptions } from "next-auth";
import { ExtendedToken, TokenError } from "@/types";


const refreshAccessToken = async ( token: ExtendedToken): Promise<ExtendedToken> => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    // refresh access token
    const {body: refreshToken} = await spotifyApi.refreshAccessToken();
    console.log('Refresh token are: ', refreshToken );

    return {
      ...token,
      accessToken: refreshToken.access_token,
      refreshToken: refreshToken.refresh_token || token.refreshToken,
      accessTokenExpiresAt: Date.now() + refreshToken.expires_in * 1000
    }
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: TokenError.RefreshAccessTokenError
    };
  }
};




const jwtCallback: CallbacksOptions["jwt"] = async ({ token, account, user }) => {
  let extendedToken: ExtendedToken;

  // user login the first time
  if (account && user) {
    extendedToken = {
      ...token,
      user,
      accessToken: account.access_token as string,
      refreshToken: account.refresh_token as string,
      // converted to mil
      accessTokenExpiresAt: (account.expires_at as number) * 1000,
    };

    console.log("FIRST TIME LOGIN EXTENDED TOKEN", extendedToken);
    return extendedToken;
  }

  if (Date.now() + 5000 < (token as ExtendedToken).accessTokenExpiresAt) {
    console.log("access token still valid, returning extended token");
    return token;
  }

  // access token has expireds, refresh it
  console.log("access token expired, refreshing...");
  return await refreshAccessToken(token as ExtendedToken);
};





export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: jwtCallback,
  },
});
