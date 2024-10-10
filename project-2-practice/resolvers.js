import db from "./db.js";

const resolvers = {
  Query: {
    books: (_parent, _args, _context) => db.books,
    book: (_, args) => db.books.find((b) => b.id === args.id),
    genre: (_, args) => db.genres.find((g) => g.id === args.id),
  },
  Book: {
    author: (parent) =>
      db.authors.find((author) => author.id === parent.authorId),
    genre: (parent) => db.genres.find((genre) => genre.id === parent.genreId),
  },
  Author: {
    books: (parent) => db.books.filter((book) => book.authorId === parent.id),
  },
  Genre: {
    books: (parent) => db.books.filter((book) => book.genreId === parent.id),
  },
  Mutation: {
    createBook: (_, args) => {
      console.log(args);
      const newBook = {
        ...args.book,
        id: (Math.max(...db.books.map((b) => Number(b.id))) + 1).toString(),
      };

      db.books.push(newBook);

      return newBook;
    },
    deleteBook: (_, args) => {
      const bookToDeleteIndex = db.books.findIndex(
        (book) => book.id === args.bookId,
      );
      const bookToDelete = db.books[bookToDeleteIndex];

      // Remove book from database
      db.books.splice(bookToDeleteIndex, 1);

      // Returns the deleted element
      return bookToDelete;
    },
    updateBook: (_, args) => {
      const bookToEditIndex = db.books.findIndex(
        (book) => book.id === args.bookId,
      );

      db.books[bookToEditIndex] = {
        ...db.books[bookToEditIndex],
        ...args.updatedBookData,
      };

      return db.books[bookToEditIndex];
    },
  },
};

export default resolvers;
