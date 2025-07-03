import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BorrowInput {
  quantity: number;
  dueDate: string;
}

interface BorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-system-delta-nine.vercel.app/api",
  }),
  tagTypes: ["Borrow"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<any, { bookId: string; data: BorrowInput }>({
      query: ({ bookId, data }) => ({
        url: `/borrow/${bookId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrow"],
    }),

    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => "/borrow/borrow-summary",
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: BorrowSummary[];
      }) => response.data,
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
