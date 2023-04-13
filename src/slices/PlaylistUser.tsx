import { spotifyApi } from "@/config/Spotify";
import { Playlist } from "@/store/PlaylistUserInterface";
import { RootState } from "@/store/store";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Playlist = {
  Playlist: [],
  status: "loading",
  error: undefined,
};

export const fetchPlaylist = createAsyncThunk(
  "spotify/playlist",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await spotifyApi.getUserPlaylists();
      return response.body.items;
    } catch (error) {
      return error;
    }
  }
);

const PlaylistUser = createSlice({
  name: "PlaylistUser",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylist.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.status = "idle";
      state.Playlist = action.payload ? action.payload as any[] : [];

    });
    builder.addCase(fetchPlaylist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = PlaylistUser.actions;

export const getPlaylist =(state: RootState) => state.PlaylistUser.Playlist

export default PlaylistUser.reducer;
