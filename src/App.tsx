import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Home/Navbar";
import Footer from "./Home/Footer ";
import BooksList from "./Features/books/BooksList";
import BorrowForm from "./Features/borrow/BorrowForm";
import BorrowSummary from "./Features/borrow/Summary";
import CreateBook from "./Features/books/CreateBook";
import EditBookForm from "./Features/books/EditBookForm";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />{" "}
      {/* ✅ hot-toast toaster */}
      <div className="flex-grow px-4">
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/edit-book/:id" element={<EditBookForm />} />
          <Route path="/borrow/:bookId" element={<BorrowForm />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
