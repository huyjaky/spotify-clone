import { spotifyApi } from "@/config/Spotify";
import { Song } from "@/types/Song";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Song = {
  selectedSongID: undefined,
  selectedSong: null,
  isPlaying: false,
  volume: 100,
  deviceID: null,
};

const Song = createSlice({
  name: 'Song',
  initialState,
  reducers: {
    setSelectedSong: (state, action: PayloadAction<any>) => {
      state.selectedSong = action.payload;
    },
    setSelectedSongID: (state, action: PayloadAction<string>) => {
      state.selectedSongID = action.payload;
    },
    setvolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
  extraReducers: (builder) => {
  }
})

// action
export const {setSelectedSong, setSelectedSongID, setvolume} = Song.actions;

// selector


// reducrer
export default Song.reducer;