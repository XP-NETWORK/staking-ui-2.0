import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const algoServiceApi = createApi({
    reducerPath: "algoServiceApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_ALGO_SERVICE }),
    endpoints: (builder) => ({
        getAllNFTsByOwner: builder.query({
            query: (address) => `/get-nfts-status-by-address/${address}`,
        }),
    }),
});

export const { useGetAllNFTsByOwnerQuery } = algoServiceApi;
