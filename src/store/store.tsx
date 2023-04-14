import GetPlaylist from "@/slices/GetPlaylist";
import PlaylistUser from "@/slices/PlaylistUser";
import SliceCounter from "@/slices/SliceCounter";
import { configureStore } from "@reduxjs/toolkit";

export function makeStore() {
  return configureStore({
    reducer: {
      testRedux: SliceCounter,
      PlaylistUser: PlaylistUser,
      GetPlaylist: GetPlaylist
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
