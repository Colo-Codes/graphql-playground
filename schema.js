// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# Types define the capabilities of a GraphQL server.
type Game {
    id: ID! # The ! means that "id" is required and must not be null.
    name: String!
    platform: [String!]! # An array of Strings.
    reviews: [Review!]
}
type Review {
    id: ID!
    rating: Int!
    content: String!
    game: Game!
    author: Author!
}
type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "books" query returns an array of zero or more Books (defined above).
type Query {
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
}

# Mutations are used to modify the "shape" of data in your GraphQL server.
type Mutation {
    deleteGame(id: ID!): [Game]
    createGame(game: AddGameInput!): Game
    updateGame(id: ID!, edits: UpdateGameInput!): Game
}

# Input types are used to define the input parameters to mutations.
input AddGameInput {
    name: String!
    platform: [String!]!
}
input UpdateGameInput {
    name: String
    platform: [String!]
}
`;

export default typeDefs;
