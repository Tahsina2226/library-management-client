// src/features/borrow/BorrowSummary.tsx

import React from "react";
import { useGetBorrowSummaryQuery } from "./borrowApi";

const BorrowSummary: React.FC = () => {
  const { data, isLoading, isError, error } = useGetBorrowSummaryQuery();

  if (isLoading)
    return <p className="mt-8 text-blue-600 text-center">Loading summary...</p>;

  if (isError)
    return (
      <p className="mt-8 text-red-600 text-center">
        Error: {(error as any)?.message || "Failed to load summary"}
      </p>
    );

  return (
    <div className="mx-auto mt-10 max-w-4xl">
      <h2 className="mb-6 font-bold text-blue-700 text-2xl text-center">
        📖 Borrow Summary
      </h2>
      <table className="shadow-sm border border-gray-300 w-full">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">ISBN</th>
            <th className="px-4 py-2 border">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 text-center">
              <td className="px-4 py-2 border">{item.book.title}</td>
              <td className="px-4 py-2 border">{item.book.isbn}</td>
              <td className="px-4 py-2 border">{item.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummary;
