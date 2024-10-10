// Schema definitions
const typeDefs = `#graphql

# Book type representing the books in the store
type Book {
    id: ID!
    title: String!
    price: Float!
    description: String
    author: Author!
    genre: Genre!
    inStock: Boolean!
}

# Author type representing the author of a book
type Author {
    id: ID!
    name: String!
    biography: String
    books: [Book!]!
}

# Genre type representing book categories/genres
type Genre {
    id: ID!
    name: String!
    books: [Book!]!
}

# Customer type representing a user who buys books
type Customer {
    id: ID!
    name: String!
    email: String!
    orders: [Order]
}

# Order type representing a purchase order
type Order {
    id: ID!
    customer: Customer
    books: [Book]
    total: Float!
    date: String!
}

# The Query type serves as the entry point for querying data
type Query {
    books: [Book]!
    book(id: ID!): Book
    #    authors: [Author]!
    #    author(id: ID!): Author
    #    genres: [Genre]!
    genre(id: ID!): Genre
    #    customers: [Customer]!
    #    customer(id: ID!): Customer
    #    orders: [Order]!
    #    order(id: ID!): Order
}

# Mutations
type Mutation {
    createBook(book: AddBookInput!): Book!
    deleteBook(bookId: ID!): Book
    updateBook(bookId: ID!, updatedBookData: UpdateBookInput!): Book!
}

# Inputs
input AddBookInput {
    title: String!
    price: Float!
    description: String
    authorId: String!
    genreId: String!
    inStock: Boolean!
}
input UpdateBookInput {
    title: String
    price: Float
    description: String
    authorId: String
    genreId: String
    inStock: Boolean
}

`;

export default typeDefs;
