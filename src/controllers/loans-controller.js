const HttpError = require("../errors/HttpError");
const booksModel = require("../models/books-model");
const loansModel = require("../models/loans-model");

module.exports = {
  // GET /api/loans
  index: (req, res) => {
    const loans = loansModel.getAllLoans();
    res.json(loans);
  },

  // GET /api/loans/:id
  show: (req, res) => {
    const id = req.params.id;
    const loan = loansModel.getLoanById(id);
    if (!loan) throw new HttpError("Loan not found", 404);
    res.json(loan);
  },

  // POST /api/loans/:id
  create: (req, res) => {
    const user = req.user;
    const { bookId } = req.body;

    if (typeof bookId !== "string")
      throw new HttpError("Invalid ID, must to be a string", 400);

    const book = booksModel.getBookById(bookId);
    if (!book) throw new HttpError("Book not found", 404);

    const newLoan = loansModel.createLoan(user, book);
    res.status(201).json(newLoan);
  },

  // POST /api/loans/:id/return
  return: (req, res) => {
    const { id } = req.params;
    const loan = loansModel.returnLoan(id);
    res.json(loan);
  },
};
