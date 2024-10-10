const db = {
  books: [
    {
      id: "1",
      title: "GraphQL for Beginners",
      price: 29.99,
      description: "A book about GraphQL for Beginners",
      authorId: "1",
      genreId: "1",
      inStock: true,
    },
    {
      id: "2",
      title: "Mastering GraphQL",
      price: 39.99,
      description: "Master the core concepts of GraphQL",
      authorId: "2",
      genreId: "2",
      inStock: true,
    },
    {
      id: "3",
      title: "React with GraphQL",
      price: 19.99,
      description: "React + GraphQL = LOVE",
      authorId: "1",
      genreId: "1",
      inStock: false,
    },
  ],
  authors: [
    { id: "1", name: "John Doe", biography: "An expert in GraphQL." },
    { id: "2", name: "Jane Smith", biography: "GraphQL guru." },
  ],
  genres: [
    { id: "1", name: "Programming" },
    { id: "2", name: "Technology" },
  ],
  customers: [
    { id: "1", name: "Alice", email: "alice@example.com" },
    { id: "2", name: "Bob", email: "bob@example.com" },
  ],
  orders: [
    { id: "1", customerId: "2", bookIds: ["1"] },
    { id: "2", customerId: "1", bookIds: ["1", "2"] },
  ],
};

export default db;
