import { spotifyApi } from "@/config/Spotify";
import { RootState } from "@/store/store";
import { Device } from "@/types/Device";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState: Device = {
  Device: [],
  status: 'loading',
  error: null
}

export const fetchDevice = createAsyncThunk('spotify/fetchDevice', async(arg, {rejectWithValue}) => {
  try {
    const response = await spotifyApi.getMyDevices();
    return response.body.devices
  } catch (error) {
    return rejectWithValue(error);
  }
})

const device = createSlice({
  name: 'Device',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDevice.pending, (state) =>{
      state.status = 'loading';
    })
    builder.addCase(fetchDevice.fulfilled, (state, action) => {
      state.Device = action.payload ? action.payload as any : [];
      state.status = 'idle';
    })
    builder.addCase(fetchDevice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ? action.error.message : null;
    })
  }
})

// action
export const {} = device.actions

// selector
export const getDevice = (state: RootState) => state.Device.Device
export const getStatusFetchDevice = (state: RootState) => state.Device.status
export const getErrorFetchDevice = (state: RootState) => state.Device.error


// reducer
export default device.reducer

