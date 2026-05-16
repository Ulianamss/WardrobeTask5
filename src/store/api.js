import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'https://dummyjson.com'; // вынести в env

// не предоставлены теги для инвалидации кэша
// много не используемых методов
export const wardrobeApi = createApi({
  reducerPath: 'wardrobeApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    // Products 
    getProducts: builder.query({
      query: ({ skip = 0, limit = 12, search = '' }) => {
        let url = `/products?skip=${skip}&limit=${limit}`;
        if (search) url += `&q=${search}`;
        return url;
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs;
      },
      merge: (currentCache, newItems, { arg: { skip } }) => {
        if (skip === 0) {
          return newItems;
        }
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
    }),

    // Users (for profile data)
    getUsers: builder.query({
      query: () => '/users',
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),

    // Posts (for looks/outfits)
    getPosts: builder.query({
      query: ({ skip = 0, limit = 10 }) => `/posts?skip=${skip}&limit=${limit}`,
    }),

    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetPostsQuery,
  useGetPostByIdQuery,
} = wardrobeApi;
