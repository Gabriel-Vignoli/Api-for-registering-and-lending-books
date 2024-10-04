const uuid = require("uuid").v4;
const HttpError = require("../errors/HttpError");

let books = [
  { id: "1", title: "Book 1", author: "Author 1", quantityAvailable: 4 },
  { id: uuid(), title: "Book 2", author: "Author 2", quantityAvailable: 3 },
  { id: uuid(), title: "Book 3", author: "Author 3", quantityAvailable: 10 },
  { id: uuid(), title: "Book 4", author: "Author 4", quantityAvailable: 2 },
];

module.exports = {
  getAllBooks: () => books.map((book) => ({ id: book.id, title: book.title })),

  getBookById: (id) => books.find((book) => book.id === id),

  createBook: (title, author, quantityAvailable) => {
    const newBook = { id: uuid(), title, author, quantityAvailable };
    books.push(newBook);
    return newBook;
  },

  updateBook: (id, updateBook) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) throw new HttpError("Book not found", 404); 
    books[bookIndex] = { ...books[bookIndex], ...updateBook };
    return books[bookIndex];
  },

  deleteBook: (id) => {
    const bookIndex = books.findIndex((book) => book.id === id);
    if (bookIndex === -1) throw new HttpError("Book not found", 404);
    const deleteBook = books[bookIndex];
    books = books.filter((book) => book.id !== id);
    return deleteBook;
  },
};
