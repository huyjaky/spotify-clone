import Device from "@/slices/Device";
import GetPlaylist from "@/slices/GetPlaylist";
import PlaylistUser from "@/slices/PlaylistUser";
import Song from "@/slices/Song";
import { configureStore } from "@reduxjs/toolkit";

export function makeStore() {
  return configureStore({
    reducer: {
      PlaylistUser: PlaylistUser,
      GetPlaylist: GetPlaylist,
      Device: Device,
      Song:Song
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
