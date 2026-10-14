
"use strict";

/*
 * Library Management System
 * Student: Emmanuel Gyamfi
 * Index Number: PS/ITC/24/0317
 * Main data structure: Array
 */

const STORAGE_KEY = "emmanuel-library-books-v1";

const starterBooks = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        isbn: "978-0132350884",
        borrowed: false
    },
    {
        id: 2,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        category: "Technology",
        isbn: "978-0262046305",
        borrowed: true
    },
    {
        id: 3,
        title: "Things Fall Apart",
        author: "Chinua Achebe",
        category: "Literature",
        isbn: "978-0385474542",
        borrowed: false
    },
    {
        id: 4,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Science",
        isbn: "978-0553380163",
        borrowed: false
    },
    {
        id: 5,
        title: "The Lean Startup",
        author: "Eric Ries",
        category: "Business",
        isbn: "978-0307887894",
        borrowed: true
    }
];

function loadBooks() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved !== null) {
            const parsed = JSON.parse(saved);

            if (
                Array.isArray(parsed) &&
                parsed.every(book =>
                    book &&
                    Number.isInteger(book.id) &&
                    typeof book.title === "string" &&
                    typeof book.author === "string" &&
                    typeof book.category === "string" &&
                    typeof book.borrowed === "boolean"
                )
            ) {
                return parsed;
            }
        }
    } catch (error) {
        console.warn("Unable to load saved books:", error);
    }

    return starterBooks.map(book => ({ ...book }));
}

// The books array is the main catalogue.
let books = loadBooks();

const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const formMessage = document.getElementById("form-message");
const emptyMessage = document.getElementById("empty-message");
const bookCount = document.getElementById("book-count");

function saveBooks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
        return true;
    } catch (error) {
        console.error("Unable to save books:", error);
        return false;
    }
}

function updateDashboard() {
    document.getElementById("total-books").textContent =
        books.length;

    document.getElementById("available-books").textContent =
        books.filter(book => !book.borrowed).length;

    document.getElementById("borrowed-books").textContent =
        books.filter(book => book.borrowed).length;
}

function createCell(value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    return cell;
}

function renderBooks() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedFilter = filterSelect.value;

    // filter() searches the array without removing records.
    const filteredBooks = books.filter(book => {
        const matchesSearch = [
            book.title,
            book.author,
            book.category,
            book.isbn,
            String(book.id)
        ].some(value =>
            String(value || "").toLowerCase().includes(query)
        );

        const matchesStatus =
            selectedFilter === "all" ||
            (selectedFilter === "available" && !book.borrowed) ||
            (selectedFilter === "borrowed" && book.borrowed);

        return matchesSearch && matchesStatus;
    });

    bookList.replaceChildren();

    filteredBooks.forEach(book => {
        const row = document.createElement("tr");

        row.appendChild(createCell(book.id));
        row.appendChild(createCell(book.title));
        row.appendChild(createCell(book.author));
        row.appendChild(createCell(book.category));

        const statusCell = document.createElement("td");
        const status = document.createElement("span");

        status.className = book.borrowed
            ? "status borrowed"
            : "status available";

        status.textContent = book.borrowed
            ? "Borrowed"
            : "Available";

        statusCell.appendChild(status);
        row.appendChild(statusCell);

        const actionCell = document.createElement("td");

        const loanButton = document.createElement("button");
        loanButton.type = "button";
        loanButton.className = "action-button";
        loanButton.textContent = book.borrowed
            ? "Return"
            : "Borrow";

        loanButton.addEventListener("click", () => {
            toggleBorrow(book.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "action-button delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteBook(book.id);
        });

        actionCell.append(loanButton, deleteButton);
        row.appendChild(actionCell);
        bookList.appendChild(row);
    });

    emptyMessage.hidden = filteredBooks.length !== 0;

    bookCount.textContent =
        `Showing ${filteredBooks.length} of ${books.length} books.`;

    updateDashboard();
}

function toggleBorrow(id) {
    // find() locates the selected book in the array.
    const book = books.find(item => item.id === id);

    if (!book) {
        return;
    }

    // Change the book's lending status.
    book.borrowed = !book.borrowed;

    saveBooks();
    renderBooks();

    formMessage.textContent = book.borrowed
        ? `"${book.title}" has been marked as borrowed.`
        : `"${book.title}" has been returned.`;
}

function deleteBook(id) {
    const book = books.find(item => item.id === id);

    if (!book) {
        return;
    }

    const confirmed = window.confirm(
        `Are you sure you want to delete "${book.title}"?`
    );

    if (!confirmed) {
        return;
    }

    // filter() creates a new array without the selected book.
    books = books.filter(item => item.id !== id);

    saveBooks();
    renderBooks();

    formMessage.textContent =
        `"${book.title}" has been deleted.`;
}

bookForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(bookForm);

    const title = String(formData.get("title") || "").trim();
    const author = String(formData.get("author") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const isbn = String(formData.get("isbn") || "").trim();

    if (!title || !author || !category) {
        formMessage.textContent =
            "Please complete the required fields.";
        return;
    }

    // Prevent duplicate ISBNs when an identifier is provided.
    if (
        isbn &&
        books.some(
            book => book.isbn.toLowerCase() === isbn.toLowerCase()
        )
    ) {
        formMessage.textContent =
            "A book with this ISBN / ID already exists.";
        return;
    }

    const newId = books.length > 0
        ? Math.max(...books.map(book => book.id)) + 1
        : 1;

    const newBook = {
        id: newId,
        title: title,
        author: author,
        category: category,
        isbn: isbn,
        borrowed: false
    };

    // push() adds the new book to the array.
    books.push(newBook);

    saveBooks();

    bookForm.reset();
    searchInput.value = "";
    filterSelect.value = "all";

    renderBooks();

    formMessage.textContent =
        `"${title}" was added successfully.`;
});

searchInput.addEventListener("input", renderBooks);
filterSelect.addEventListener("change", renderBooks);

// Display the initial catalogue when the page loads.
renderBooks();
