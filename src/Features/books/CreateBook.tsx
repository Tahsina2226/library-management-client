import React from "react";
import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "./booksApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type BookFormInput = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
};

const CreateBook = ({ onBookAdded }: { onBookAdded?: () => void }) => {
  const { register, handleSubmit, reset } = useForm<BookFormInput>();
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: BookFormInput) => {
    const toastId = toast.loading("Adding new book...", {
      position: "top-center",
      style: { fontSize: "16px" },
    });

    try {
      await createBook({ ...data, available: data.available ?? true }).unwrap();
      toast.success("✅ Book added successfully!", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
      reset();
      onBookAdded?.();
      navigate("/books");
    } catch (error) {
      toast.error("❌ Failed to add book", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
    }
  };

  return (
    <div className="bg-white shadow-md mx-auto mt-6 p-6 rounded max-w-2xl">
      <h2 className="mb-4 font-semibold text-teal-700 text-xl">
        📘 Add a New Book
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          placeholder="Title"
          required
          className="px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
        />
        <input
          {...register("author")}
          placeholder="Author"
          required
          className="px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
        />
        <input
          {...register("genre")}
          placeholder="Genre"
          required
          className="px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
        />
        <input
          {...register("isbn")}
          placeholder="ISBN"
          required
          className="px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
        />
        <textarea
          {...register("description")}
          placeholder="Description"
          className="px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 w-full resize-none"
        />
        <input
          type="number"
          {...register("copies")}
          placeholder="Copies"
          required
          className="px-3 py-2 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
        />
        <label className="flex items-center space-x-2 font-medium text-teal-700">
          <input
            type="checkbox"
            {...register("available")}
            className="accent-teal-500"
          />
          <span>Available</span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 px-6 py-2 rounded font-medium text-white transition-colors duration-200"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
