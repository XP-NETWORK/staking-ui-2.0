import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "./reducer/homePageSlice";

const store = configureStore({
  reducer: {
    homePage: homePageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store

