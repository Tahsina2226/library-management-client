// src/features/borrow/BorrowForm.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "./borrowApi";
import { useState } from "react";

const BorrowForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [borrowBook] = useBorrowBookMutation();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return;

    try {
      await borrowBook({ bookId, data: { quantity, dueDate } }).unwrap();
      alert("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (error) {
      console.error(error);
      alert("Failed to borrow book");
    }
  };

  return (
    <div className="bg-white shadow-md mx-auto p-6 rounded max-w-md">
      <h2 className="mb-4 font-semibold text-2xl">Borrow Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 py-2 rounded w-full text-white"
        >
          Borrow
        </button>
      </form>
    </div>
  );
};

export default BorrowForm;
