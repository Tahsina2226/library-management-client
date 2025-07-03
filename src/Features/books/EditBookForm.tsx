import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation } from "./booksApi";
import toast from "react-hot-toast";

const EditBookForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetBookQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [formState, setFormState] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (data) {
      setFormState({
        title: data.title,
        author: data.author,
        genre: data.genre,
        isbn: data.isbn,
        description: data.description || "",
        copies: data.copies,
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.copies < 0) {
      toast.error("❌ Copies cannot be negative", {
        style: { fontSize: "16px" },
        position: "top-center",
      });
      return;
    }

    const toastId = toast.loading("Updating book...", {
      position: "top-center",
      style: { fontSize: "16px" },
    });

    try {
      await updateBook({ id: id!, data: formState }).unwrap();
      toast.success("✅ Book updated successfully!", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
      navigate("/books");
    } catch (err) {
      toast.error("❌ Failed to update book.", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
    }
  };

  if (isLoading)
    return <div className="mt-6 text-center">Loading book data...</div>;
  if (error)
    return (
      <div className="mt-6 text-red-600 text-center">
        Error loading book data.
      </div>
    );

  return (
    <div className="bg-green-50 shadow-sm mx-auto mt-8 p-6 border border-green-100 rounded-lg max-w-lg">
      <h2 className="mb-6 font-bold text-green-700 text-2xl text-center">
        ✏️ Edit Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-green-700">Title</label>
          <input
            name="title"
            value={formState.title}
            onChange={handleChange}
            required
            className="bg-white p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-green-700">
            Author
          </label>
          <input
            name="author"
            value={formState.author}
            onChange={handleChange}
            required
            className="bg-white p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-green-700">Genre</label>
          <input
            name="genre"
            value={formState.genre}
            onChange={handleChange}
            required
            className="bg-white p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-green-700">ISBN</label>
          <input
            name="isbn"
            value={formState.isbn}
            onChange={handleChange}
            required
            className="bg-white p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-green-700">
            Description
          </label>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            className="bg-white p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-green-700">
            Copies
          </label>
          <input
            type="number"
            name="copies"
            min={0}
            value={formState.copies}
            onChange={handleChange}
            required
            className="bg-white p-2 border border-green-200 rounded focus:ring-2 focus:ring-green-300 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="bg-green-600 hover:bg-green-700 shadow-sm px-4 py-2 rounded w-full font-medium text-white transition"
        >
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
