import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import homePageSlice, { IHomePage } from "./reducer/homePageSlice";

export interface ReduxState {
    homePage: IHomePage;
}

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: false,
    }),
];

const store = configureStore({
    reducer: {
        homePage: homePageSlice.reducer,
    },
    middleware,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
