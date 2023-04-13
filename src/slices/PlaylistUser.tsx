import { spotifyApi } from "@/config/Spotify";
import { Playlist } from "@/store/PlaylistUserInterface";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Playlist = {
  Playlist: [],
  status: "loading",
  error: undefined,
  user : {}
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
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylist.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.status = "idle";
      state.Playlist = [...state.Playlist, action.payload];
    });
    builder.addCase(fetchPlaylist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {setUser} = PlaylistUser.actions;

export default PlaylistUser.reducer;
