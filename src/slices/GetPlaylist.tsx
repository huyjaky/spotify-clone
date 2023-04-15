import { spotifyApi } from "@/config/Spotify";
import { RootState } from "@/store/store";
import { Playlist } from "@/types/GetPlaylist";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Playlist = {
  Playlist: {},
  status: 'loading',
  error: null,
};

export const fetchPlaylistFromID = createAsyncThunk('spotify/fetchplaylistfromid', async (arg:string, {rejectWithValue}) => {
  try {
    const response = await spotifyApi.getPlaylist(arg);
    return response.body;
  } catch (error) {
    return rejectWithValue(error);
  }
})
const GetPlaylistFromID = createSlice({
  name: "GetPlaylist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylistFromID.pending, (state) =>{
      state.status = 'loading';
    })
    builder.addCase(fetchPlaylistFromID.fulfilled, (state, action) =>{
      state.Playlist = action.payload ? action.payload as any : [] as any;
      state.status = 'idle';
    })
    builder.addCase(fetchPlaylistFromID.rejected, (state, action) => {
      state.error = action.error.message? action.error.message : null;
      state.status= 'failed';
    })
  },
});

// export actions
export const {} = GetPlaylistFromID.actions

// export selectors
export const getPlaylistfromid = (state: RootState) => state.GetPlaylist.Playlist
export const getStatus = (state: RootState) => state.GetPlaylist.status


export default GetPlaylistFromID.reducer;