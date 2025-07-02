import React, { useState } from "react";
import { useGetBooksQuery, useDeleteBookMutation } from "./booksApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BooksList = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useGetBooksQuery({
    page,
    limit: 10,
  });

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDelete = (id: string) => {
    toast(
      (t) => (
        <div
          className="flex flex-col gap-4 bg-white shadow-lg p-6 rounded text-center"
          style={{ minWidth: "320px", fontSize: "1.125rem" }} // ~18px font size
        >
          <span className="font-semibold">
            Are you sure to delete this book?
          </span>
          <div className="flex justify-center gap-4 mt-3">
            <button
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
              onClick={() => toast.dismiss(t.id)}
              style={{ minWidth: "90px" }}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition"
              onClick={async () => {
                toast.dismiss(t.id);
                const toastId = toast.loading("Deleting book...");
                try {
                  await deleteBook(id).unwrap();
                  toast.success("✅ Book deleted successfully!", {
                    id: toastId,
                  });
                } catch {
                  toast.error("❌ Failed to delete the book.", { id: toastId });
                }
              }}
              style={{ minWidth: "90px" }}
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "120px",
        },
      }
    );
  };

  if (isLoading) return <div className="p-4 text-center">Loading books...</div>;
  if (error)
    return (
      <div className="p-4 text-red-600 text-center">Error loading books.</div>
    );

  const totalPages = data?.pagination?.totalPages ?? 0;

  return (
    <div className="mx-auto p-4 max-w-7xl">
      <h2 className="mb-4 font-bold text-2xl text-center">Books List</h2>

      <div className="overflow-x-auto">
        <table className="border border-gray-300 min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="px-3 py-2 border text-xs sm:text-sm md:text-base">
                Title
              </th>
              <th className="px-3 py-2 border text-xs sm:text-sm md:text-base">
                Author
              </th>
              <th className="px-3 py-2 border text-xs sm:text-sm md:text-base">
                Genre
              </th>
              <th className="px-3 py-2 border text-xs sm:text-sm md:text-base">
                ISBN
              </th>
              <th className="px-3 py-2 border text-xs sm:text-sm md:text-base">
                Copies
              </th>
              <th className="px-3 py-2 border text-xs sm:text-sm md:text-base">
                Available
              </th>
              <th className="px-3 py-2 border text-xs sm:text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.length === 0 && (
              <tr>
                <td colSpan={7} className="py-4 text-sm text-center">
                  No books found.
                </td>
              </tr>
            )}

            {data?.data.map((book) => (
              <tr
                key={book._id}
                className="hover:bg-gray-100 text-xs sm:text-sm md:text-base text-center"
              >
                <td className="px-3 py-2 border">{book.title}</td>
                <td className="px-3 py-2 border">{book.author}</td>
                <td className="px-3 py-2 border">{book.genre}</td>
                <td className="px-3 py-2 border">{book.isbn}</td>
                <td className="px-3 py-2 border">{book.copies}</td>
                <td className="px-3 py-2 border">
                  {book.available ? "Yes" : "No"}
                </td>
                <td className="space-x-2 px-3 py-2 border">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="bg-teal-100 hover:bg-teal-200 shadow-sm px-3 py-1 rounded font-medium text-teal-700 text-sm transition-colors duration-200"
                  >
                    Edit
                  </Link>

                  <button
                    className="bg-teal-100 hover:bg-teal-200 disabled:opacity-50 shadow-sm px-3 py-1 rounded font-medium text-teal-700 text-sm transition-colors duration-200 disabled:cursor-not-allowed"
                    onClick={() => handleDelete(book._id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </button>

                  <Link
                    to={`/borrow/${book._id}`}
                    className="bg-teal-100 hover:bg-teal-200 shadow-sm px-3 py-1 rounded font-medium text-teal-700 text-sm transition-colors duration-200"
                  >
                    Borrow
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFetching && (
        <p className="mt-2 text-gray-600 text-center">Refreshing...</p>
      )}

      <div className="flex sm:flex-row flex-col justify-between items-center gap-2 mt-4">
        <button
          className="bg-gray-300 disabled:opacity-50 px-4 py-2 rounded w-full sm:w-auto"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="font-semibold text-center">
          Page: {page} / {totalPages}
        </span>

        <button
          className="bg-gray-300 disabled:opacity-50 px-4 py-2 rounded w-full sm:w-auto"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BooksList;
