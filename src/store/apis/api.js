import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: () => {
        return 'movie/popular';
      },
      transformResponse: (response) => {
        console.log('response.........', response)
        return response.results
      }
    }),
    getLatestMovies: builder.query({
      query: () => {
        // console.log('fetching latest..')
        return 'movie/latest';
      },
      transformResponse: (response) => {
        console.log('response',)
        // return response.results
      },
      onSuccess: (response) => {
        console.log('Popular movies response:', response);
      },
      onError: (error) => {
        console.error('Error fetching popular movies:', error);
      }
    }),
    getMovieDetails: builder.query({
      query: (id) => `movie/${id}`,
    }),
  }),
});

export const { useGetPopularMoviesQuery, useGetLatestMoviesQuery, useGetMovieDetailsQuery } = api;
