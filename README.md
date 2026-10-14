# library-management-system

# REAL-WORLD APPLICATIONS OF ARRAYS

## Library Management System

**Student Name:** Emmanuel Gyamfi

**Index Number:** PS/ITC/24/0317

**Selected Application:** Library Management System

## 1. Introduction

A data structure is a method of organising and storing information
so that a computer program can access and process it efficiently.

An array is a data structure that stores multiple elements in an
ordered collection under one variable. Arrays are useful when an
application needs to manage many related records.

This assignment describes real-world applications of arrays and
develops a Library Management System to demonstrate their use.

## 2. Real-World Applications of Arrays

### 2.1 Library Management System

A library uses a collection of book records. An array can store
the books and allow the librarian to search, display, add, and
update them when they are borrowed or returned.

### 2.2 Student Result Management System

An educational institution can store students' marks in arrays.
The program can calculate totals, averages, and grades by
processing the stored values.

### 2.3 Online Shopping Cart

An online shopping application can use an array to store products
selected by a customer. The program can calculate the total cost
and update product quantities.

### 2.4 Hospital Appointment System

An appointment application can store appointment records in an
array and process the schedule for doctors and patients.

### 2.5 Inventory Management System

A business can keep a collection of products and their quantities.
The system can search for items and update stock levels.

### 2.6 Music Playlist

A music application can store songs in an ordered array so that
tracks can be displayed and played in sequence.

### 2.7 Transport Booking System

A transport company can manage passenger or seat records using
collections that can be searched and updated.

## 3. Why Arrays Are Necessary

Arrays are useful for the following reasons:

1. They group related information under one variable.
2. They allow programs to process multiple records using loops.
3. They support searching and filtering.
4. They make adding and removing collection items straightforward.
5. They reduce the need to create a separate variable for each item.
6. They allow information to be displayed and processed consistently.

Arrays are suitable for this project because a library contains
many books and staff need to perform operations on the collection.

However, arrays alone do not provide permanent storage or
multi-user access. A production system may use arrays in its
application logic together with a database.

## 4. Selected Application: Library Management System

The selected application is a Library Management System.

The system is designed to organise a collection of books and
demonstrate how arrays can be used in a practical application.

Each book record contains:

- Book ID
- Title
- Author
- Category
- ISBN or book identifier
- Borrowing status

### 4.1 System Features

The application includes:

1. Displaying all books in a catalogue.
2. Adding new books.
3. Searching by title, author, category, ISBN, or ID.
4. Filtering books by availability.
5. Borrowing available books.
6. Returning borrowed books.
7. Deleting book records.
8. Displaying dashboard statistics.
9. Saving book records in browser local storage.

### 4.2 Use of Arrays

The application uses a JavaScript array named `books`.

An example of a book record is:

    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        category: "Technology",
        isbn: "978-0132350884",
        borrowed: false
    }

Multiple book objects are stored in the same array.

The `push()` method adds a new book. The `find()` method locates
a particular record. The `filter()` method searches the collection
or creates a collection without a selected record.

The `some()` method checks whether a matching ISBN exists, while
`map()` helps process values such as book IDs.

These operations demonstrate how arrays can support a library's
daily record-management activities.

## 5. Technologies Used

- HTML: structures the web pages, forms, and catalogue.
- CSS: styles the application and supports responsive layouts.
- JavaScript: implements array operations and application logic.
- Browser local storage: saves book data in the current browser.
- GitHub: stores the source code and supports version control.
- GitHub Pages: can publish the static website online.

## 6. Testing

The following tests should be performed:

1. Open the application and confirm that sample books appear.
2. Add a book with a title, author, and category.
3. Search for a book using its title.
4. Filter the catalogue to show available books only.
5. Borrow an available book and check its status.
6. Return a borrowed book and check its status.
7. Delete a book and verify that it disappears.
8. Refresh the page and verify that saved records remain.
9. Try adding an existing ISBN and confirm duplicate validation.

## 7. Limitations

The application stores data in the browser's local storage.
The records are not automatically shared with other computers.

The current version does not include user authentication,
member accounts, due dates, fine calculations, or a shared database.

A future version could use Java, JDBC, and MySQL to support
centralised records and multiple users.

## 8. Conclusion

Arrays are useful for managing collections of related data.
This Library Management System demonstrates how array operations
can be applied to adding, searching, borrowing, returning, and
deleting books.

The project provides a practical example of using a data structure
to solve a real-world problem. A database-backed version could
extend the application for use by a larger library.

## Student Information

**Name:** Emmanuel Gyamfi

**Index Number:** PS/ITC/24/0317

**Project:** Library Management System
