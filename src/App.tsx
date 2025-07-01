import React from "react";
import Navbar from "./Home/Navbar";
import Footer from "./Home/Footer ";
import BooksList from "./Features/BooksList";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <BooksList></BooksList>
      <Footer />
    </div>
  );
}

export default App;
