
import SliceCounter from "@/slices/SliceCounter";
import { configureStore } from "@reduxjs/toolkit"


export function makeStore() {
  return configureStore ({
    reducer: {
      testReducer: SliceCounter
    }
  })
}

export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;