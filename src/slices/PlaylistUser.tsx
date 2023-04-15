import { spotifyApi } from "@/config/Spotify";
import { RootState } from "@/store/store";
import { Playlist } from "@/types/PlaylistUserInterface";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Playlist = {
  Playlist: [],
  SelectedPlaylistID: null,
  SelectedPlaylist: null,
  status: "loading",
  error: null,
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
    setPlaylistID: (state, action: PayloadAction<string>) => {
      state.SelectedPlaylistID = action.payload;
    },
    setPlaylist: (state, action: PayloadAction<string>) => {
      state.SelectedPlaylist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylist.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.status = "idle";
      state.Playlist = action.payload ? (action.payload as any[]) : [];
    });
    builder.addCase(fetchPlaylist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message ? action.error.message : null;
    });
  },
});

// export action
export const {setPlaylist, setPlaylistID} = PlaylistUser.actions;

// export selector
export const getPlaylist = (state: RootState) => state.PlaylistUser.Playlist;
export const getSelectedPlaylistfromID = (state: RootState) => state.PlaylistUser.SelectedPlaylistID;
export const getSelectedPlaylist = (state: RootState) => state.PlaylistUser.SelectedPlaylist;

export default PlaylistUser.reducer;
