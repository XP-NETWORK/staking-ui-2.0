import { configureStore } from "@reduxjs/toolkit";
import homePageSlice, { IHomePage } from "./reducer/homePageSlice";

export interface ReduxState {
    homePage: IHomePage;
}

const store = configureStore({
    reducer: {
        homePage: homePageSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
