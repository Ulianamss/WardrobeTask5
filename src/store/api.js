import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = process.env.REACT_APP_API_URL;

export const wardrobeApi = createApi({
  reducerPath: 'wardrobeApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ skip = 0, limit = 12, search = '' }) => {
        let url = `/products?skip=${skip}&limit=${limit}`;
        if (search) url += `&q=${search}`;
        return url;
      },
      providesTags: ['Products'],
      serializeQueryArgs: ({ queryArgs }) => queryArgs,
      merge: (currentCache, newItems, { arg: { skip } }) => {
        if (skip === 0) return newItems;
        return {
          ...newItems,
          products: [...currentCache.products, ...newItems.products],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = wardrobeApi;