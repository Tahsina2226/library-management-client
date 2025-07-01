// src/features/books/BooksList.tsx
import React, { useState } from "react";
import { useGetBooksQuery, useDeleteBookMutation } from "./booksApi";

const BooksList = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useGetBooksQuery({
    page,
    limit: 10,
  });
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure to delete this book?")) {
      await deleteBook(id);
    }
  };

  if (isLoading) return <div>Loading books...</div>;
  if (error) return <div>Error loading books</div>;

  return (
    <div className="mx-auto p-4 max-w-6xl">
      <h2 className="mb-4 font-bold text-2xl">Books List</h2>

      <table className="border border-gray-300 min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Author</th>
            <th className="px-4 py-2 border">Genre</th>
            <th className="px-4 py-2 border">ISBN</th>
            <th className="px-4 py-2 border">Copies</th>
            <th className="px-4 py-2 border">Available</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((book) => (
            <tr key={book._id} className="hover:bg-gray-100 text-center">
              <td className="px-4 py-2 border">{book.title}</td>
              <td className="px-4 py-2 border">{book.author}</td>
              <td className="px-4 py-2 border">{book.genre}</td>
              <td className="px-4 py-2 border">{book.isbn}</td>
              <td className="px-4 py-2 border">{book.copies}</td>
              <td className="px-4 py-2 border">
                {book.available ? "Yes" : "No"}
              </td>
              <td className="space-x-2 px-4 py-2 border">
                <button
                  className="bg-red-600 disabled:opacity-50 px-2 py-1 rounded text-white"
                  onClick={() => handleDelete(book._id)}
                  disabled={isDeleting}
                >
                  Delete
                </button>
                {/* Add Edit and Borrow buttons later */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-300 disabled:opacity-50 px-3 py-1 rounded"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page: {page}</span>
        <button
          className="bg-gray-300 disabled:opacity-50 px-3 py-1 rounded"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data && page >= data.pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksList;
