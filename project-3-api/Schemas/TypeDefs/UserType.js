import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

// 1. Define the User Type
//
// type User {
//   id: ID!
//   firstName: String!
//   lastName: String!
//   email: String!
//   password: String!
// }
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }, // Not ideal to expose passwords in a real-world API!
  },
});

export default UserType;
