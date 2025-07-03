import React, { useState } from "react";
import { useGetBooksQuery, useDeleteBookMutation } from "./booksApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BooksList: React.FC = () => {
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
          style={{ minWidth: "320px", fontSize: "1.125rem" }}
        >
          <span className="font-semibold text-gray-800">
            Are you sure to delete this book?
          </span>
          <div className="flex justify-center gap-4 mt-3">
            <button
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-gray-800 transition"
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

  if (isLoading)
    return (
      <p className="mt-8 font-semibold text-gray-600 text-lg text-center">
        Loading books...
      </p>
    );
  if (error)
    return (
      <p className="mt-8 font-semibold text-red-600 text-lg text-center">
        Error loading books.
      </p>
    );

  const totalPages = data?.pagination?.totalPages ?? 0;

  return (
    <div className="mx-auto mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <h2 className="mb-6 font-bold text-gray-800 text-2xl text-center">
        📚 Books List
      </h2>

      <div className="shadow-sm border border-gray-300 rounded overflow-x-auto">
        <table className="border border-gray-300 w-full min-w-[640px] border-collapse">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              {[
                "Title",
                "Author",
                "Genre",
                "ISBN",
                "Copies",
                "Available",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 py-2 border border-gray-300 text-xs sm:text-sm md:text-base text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.data.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-4 text-gray-600 text-sm text-center"
                >
                  No books found.
                </td>
              </tr>
            )}

            {data?.data.map((book) => (
              <tr
                key={book._id}
                className="hover:bg-gray-50 text-xs sm:text-sm md:text-base text-center"
              >
                <td className="px-3 py-2 border border-gray-300">
                  {book.title}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {book.author}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {book.genre}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {book.isbn}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {book.copies}
                </td>
                <td className="px-3 py-2 border border-gray-300">
                  {book.available ? "Yes" : "No"}
                </td>
                <td className="space-x-2 px-3 py-2 border border-gray-300 whitespace-nowrap">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="bg-gray-200 hover:bg-gray-300 shadow-sm px-3 py-1 rounded font-medium text-gray-800 text-xs sm:text-sm md:text-base transition-colors duration-200"
                  >
                    Edit
                  </Link>

                  <button
                    className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 shadow-sm px-3 py-1 rounded font-medium text-gray-800 text-xs sm:text-sm md:text-base transition-colors duration-200 disabled:cursor-not-allowed"
                    onClick={() => handleDelete(book._id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </button>

                  <Link
                    to={`/borrow/${book._id}`}
                    className="bg-gray-200 hover:bg-gray-300 shadow-sm px-3 py-1 rounded font-medium text-gray-800 text-xs sm:text-sm md:text-base transition-colors duration-200"
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
        <p className="mt-2 font-semibold text-gray-600 text-center">
          Refreshing...
        </p>
      )}

      {/* Pagination controls with bottom margin */}
      <div className="flex sm:flex-row flex-col justify-between items-center gap-2 mt-6 mb-10">
        <button
          className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 px-4 py-2 rounded w-full sm:w-auto font-semibold text-gray-800 transition"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="font-semibold text-gray-800 text-lg text-center">
          Page: {page} / {totalPages}
        </span>

        <button
          className="bg-gray-300 hover:bg-gray-400 disabled:opacity-50 px-4 py-2 rounded w-full sm:w-auto font-semibold text-gray-800 transition"
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
