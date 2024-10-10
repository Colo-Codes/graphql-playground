import UserType from "./TypeDefs/UserType.js";
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import fs from "fs";

// User mock data (1,000 elements)
let userData = JSON.parse(fs.readFileSync("MOCK_DATA.json", "utf8"));

// 2. Define the Root Query Type
//
// type Query {
//   users: [User]
//   user(id: ID!): User
// }
const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    // Query to get a single user by ID
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: (_parent, args) => {
        // Fetch user by ID
        return userData.find((user) => user.id === args.id);
      },
    },
    // Query to get all users
    users: {
      type: new GraphQLList(UserType),
      // No args needed for this query
      resolve: () => userData,
    },
  },
});

// 3. Define the Mutation Type
//
// input UserInput {
//   firstName: String!
//   lastName: String!
//   email: String!
//   password: String!
// }
//
// type Mutation {
//   addUser(input: UserInput): User
//   updateUser(id: ID!, input: UserInput): User
// }
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Mutation to create a new user
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        // Create a new user
        const newUser = {
          id: (Math.max(...userData.map((u) => Number(u.id))) + 1).toString(),
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        };
        // Add the new user to the list of users
        userData.push(newUser);

        return newUser;
      },
    },
    // Mutation to update a user by ID
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        let userToUpdate = userData.find((user) => user.id === args.id);
        if (userToUpdate) {
          userToUpdate.firstName = args.firstName || userToUpdate.firstName;
          userToUpdate.lastName = args.lastName || userToUpdate.lastName;
          userToUpdate.email = args.email || userToUpdate.email;
          userToUpdate.password = args.password || userToUpdate.password;
        }

        return userToUpdate;
      },
    },
  },
});

// 4. Create the Schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
