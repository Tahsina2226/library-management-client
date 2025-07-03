


# 📚 Minimal Library Management System

A lightweight and intuitive **Library Management Web App** built with **React**, **Redux Toolkit Query**, and **TypeScript**.

This project enables users to perform essential library operations like **adding**, **editing**, **deleting**, and **borrowing** books — all without login or authentication.

Built for clean design, simplicity, and smooth state handling.

---

## 🌐 Live Demo

- 🔍 **Frontend:** [https://librarymanagement-gilt.vercel.app](https://librarymanagement-gilt.vercel.app)
- 🚀 **Backend:** [https://library-management-api.onrender.com](https://library-management-api.onrender.com)
---
### 🔗 Project Repositories

- 💻 **Frontend GitHub:** [library-management-client](https://github.com/Tahsina2226/library-management-client)  
- 🖥️ **Backend GitHub:** [library-management-server](https://github.com/Tahsina2226/library-management-server)



---

## 📖 Overview

This application offers essential features for managing a small digital library:

- Browse all books
- Add new books
- Edit or delete books
- Borrow books with quantity and due date
- View a summary of borrowed books

All features are **publicly accessible**, making the app ideal for testing, demos, or educational use.

---

## ✨ Key Features

### 📚 Book Management

- View all books in a table format
- Key fields: **Title, Author, Genre, ISBN, Copies, Availability**
- Actions:
  - 📝 Edit Book
  - ❌ Delete Book
  - 📦 Borrow Book

**Add New Book:**
- Fields: Title, Author, Genre, ISBN, Description, Copies, Availability

---

## 🔥 Demo Preview

| 📚 Books List Page                     | 📦 Borrow Form Page                     |
|---------------------------------------|-----------------------------------------|
| ![Books Page](https://github.com/user-attachments/assets/1a66aa93-137b-459a-a1f6-96bcc7b7930b)  | ![Borrow Form](https://github.com/user-attachments/assets/2c704cc3-6be2-4602-864d-ae5eb2f6030f)  |

| ➕ Add Book Page                       | 📊 Borrow Summary Page                  |
|---------------------------------------|-----------------------------------------|
| ![Add Book](https://github.com/user-attachments/assets/247118c7-0cc5-42fe-a4a9-7caaf3d0a9c1)      | ![Borrow Summary](https://github.com/user-attachments/assets/4e2bfd5c-0e77-4306-ba61-221bbe2e778d) |




---

## 📦 Borrow Books

- Borrow form includes:
  - Quantity to borrow
  - Due date for return

**Validation Rules:**
- Cannot borrow more copies than available
- Borrowing reduces the available copy count
- Book becomes unavailable when copies hit 0
- After successful borrow, user is redirected to the **Borrow Summary**

---

## 📊 Borrow Summary

- Table showing:
  - Book Title
  - ISBN
  - Total Quantity Borrowed

Great for tracking borrowed books at a glance!

---

## 🧭 Routes Overview

| Route              | Description                          |
|--------------------|--------------------------------------|
| `/books`           | View all books with action buttons   |
| `/create-book`     | Add a new book                       |
| `/books/:id`       | View book details                    |
| `/edit-book/:id`   | Edit an existing book                |
| `/borrow/:bookId`  | Borrow a selected book               |
| `/borrow-summary`  | View all borrowed books              |

---

## ⚙️ Tech Stack

| Layer       | Technology                   |
|-------------|------------------------------|
| Frontend    | React, TypeScript            |
| State Mgmt  | Redux Toolkit, RTK Query     |
| Backend     | Node.js, Express.js          |
| Database    | MongoDB, Mongoose            |
| Styling     | Tailwind CSS                 |

---

## 🗂️ Folder Structure (Frontend)

```

LIBRARY-MANAGEMENT/
├── .vercel/
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   ├── assets/
│   ├── Features/
│   │   ├── books/
│   │   │   ├── booksApi.ts
│   │   │   ├── BooksList.tsx
│   │   │   ├── CreateBookForm.tsx
│   │   │   └── EditBookForm.tsx
│   │   └── borrow/
│   │       ├── borrowApi.ts
│   │       ├── BorrowForm.tsx
│   │       └── Summary.tsx
│   ├── Home/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── lib/
│   ├── redux/
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── log.txt
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts

````

---

## 🔧 Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
````

---

## 🛠️ Backend Summary

* **Architecture:** Modular MVC

* **Main Collections:**

  * `Books`: title, author, genre, isbn, description, copies, availability
  * `Borrows`: linked book, quantity, dueDate

* **Key Endpoints:**

  * Full CRUD for books
  * Borrow book
  * View borrow summary
  * Pagination support

---

## 🙋‍♀️ Author

**Tahsina Tanvin**
📧 Email: [tahsinatanvin274@gmail.com](mailto:tahsinatanvin274@gmail.com)
💼 LinkedIn: [Tahsina Tanvin](https://www.linkedin.com/in/tahsina-tanvin-8a49162b3/)
💻 GitHub: [Tahsina2226](https://github.com/Tahsina2226)

---


