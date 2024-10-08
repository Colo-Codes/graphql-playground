import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone"; // preserve-line
import typeDefs from "./schema.js";

// Data sets are just JavaScript objects that conform to the GraphQL schema.
let gamesData = [
  {
    id: "1",
    name: "Super Mario Bros",
    platform: ["NES", "SNES", "N64"],
  },
  {
    id: "2",
    name: "Legend of Zelda",
    platform: ["NES", "SNES", "N64"],
  },
];

let reviewsData = [
  {
    id: "1",
    rating: 5,
    content: "This is a great game!",
    authorId: "1",
    gameId: "1",
  },
  {
    id: "2",
    rating: 4,
    content: "I don't like this game.",
    authorId: "2",
    gameId: "1",
  },
  {
    id: "3",
    rating: 5,
    content: "This game is awesome!",
    authorId: "1",
    gameId: "2",
  },
  {
    id: "4",
    rating: 1,
    content: "I don't recommend this game.",
    authorId: "2",
    gameId: "2",
  },
];

let authorsData = [
  {
    id: "1",
    name: "Mario",
    verified: true,
  },
  {
    id: "2",
    name: "Luigi",
    verified: false,
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    reviews: () => reviewsData,
    review: (_parent, args, _context) =>
      reviewsData.find((r) => r.id === args.id),
    games: () => gamesData,
    game: (_parent, args, _context) => gamesData.find((g) => g.id === args.id),
    authors: () => authorsData,
    author: (_parent, args, _context) =>
      authorsData.find((a) => a.id === args.id),
  },
  Game: {
    reviews: (parent) => reviewsData.filter((r) => r.gameId === parent.id),
  },
  Review: {
    game: (parent) => gamesData.find((g) => g.id === parent.gameId),
    author: (parent) => authorsData.find((a) => a.id === parent.authorId),
  },
  Author: {
    reviews: (parent) => reviewsData.filter((r) => r.authorId === parent.id),
  },
  Mutation: {
    deleteGame: (_parent, args, _context) => {
      gamesData = gamesData.filter((g) => g.id !== args.id);

      return gamesData;
    },
    createGame: (_parent, args, _context) => {
      const newGame = {
        ...args.game,
        id: (Math.max(...gamesData.map((g) => Number(g.id))) + 1).toString(),
      };

      gamesData.push(newGame);

      return newGame;
    },
    updateGame: (_parent, args, _context) => {
      gamesData = gamesData.map((game) => {
        if (game.id === args.id) {
          return {
            ...game,
            ...args.edits,
          };
        }

        return game;
      });

      return gamesData.find((game) => game.id === args.id);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
