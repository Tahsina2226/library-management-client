import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "./borrowApi";
import { useGetBookQuery } from "../books/booksApi";
import { useState } from "react";
import toast from "react-hot-toast";

const BorrowForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [borrowBook] = useBorrowBookMutation();
  const { refetch } = useGetBookQuery(bookId!, { skip: !bookId });
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return;

    const toastId = toast.loading("Borrowing book...", {
      position: "top-center",
      style: { fontSize: "16px" },
    });

    try {
      await borrowBook({ bookId, data: { quantity, dueDate } }).unwrap();
      await refetch();
      toast.success("Book borrowed successfully!", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
      navigate("/borrow-summary");
    } catch (error) {
      console.error(error);
      toast.error("Failed to borrow book", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
    }
  };

  return (
    <div className="bg-green-50 shadow-sm mx-auto p-6 border border-green-100 rounded-lg max-w-md">
      <h2 className="mb-4 font-semibold text-green-700 text-2xl text-center">
        📗 Borrow Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-green-600">
            Quantity
          </label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="bg-white p-2 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-300 w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-green-600">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="bg-white p-2 border border-green-200 rounded focus:outline-none focus:ring-2 focus:ring-green-300 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 shadow-sm px-4 py-2 rounded w-full font-medium text-white transition"
        >
          Borrow
        </button>
      </form>
    </div>
  );
};

export default BorrowForm;
