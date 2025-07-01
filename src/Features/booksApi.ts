import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
}

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
