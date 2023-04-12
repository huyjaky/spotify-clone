import { RootState } from "@/store/store";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CounterState } from "./interfaceState/SliceConterState";

const initialState: CounterState = {
  value: 0,
  post: [],
  status: "loading",
  error: undefined,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (arg, {rejectWithValue}) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
});

export const counterSlide = createSlice({
  name: "testRedux",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      (state.status = "idle"), (state.post = [...state.post, action.payload]);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      (state.status = "failed"), (state.error = action.error.message);
    });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlide.actions;

export const selectVal = (state: RootState) => state.testReducer.value;
export const getStatus = (state: RootState) => state.testReducer.status;
export const getErr = (state: RootState) => state.testReducer.error;

export default counterSlide.reducer;
