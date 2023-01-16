import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import homePageSlice, { IHomePage } from "./reducer/homePageSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { algoServiceApi } from "./services/algoService";
export interface ReduxState {
    homePage: IHomePage;
}

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: false,
    }).concat(algoServiceApi.middleware),
];

const store = configureStore({
    reducer: {
        homePage: homePageSlice.reducer,
        [algoServiceApi.reducerPath]: algoServiceApi.reducer,
    },
    middleware: middleware,
});

export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
export default store;
