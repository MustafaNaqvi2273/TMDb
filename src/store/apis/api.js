import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiKey = 'b2b2f76dc700cef10e286485e8a86268';

const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmIyZjc2ZGM3MDBjZWYxMGUyODY0ODVlOGE4NjI2OCIsInN1YiI6IjY1ZWNiMDZiZTkzZTk1MDE4NGRmOWIxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PAmWThOnD7b-4HUJXD5nhhP60jVBmVOB2SY6QJxpmIo"

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
