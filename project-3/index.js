import express from "express";
import { graphqlHTTP } from "express-graphql"; // Needed for creating the GraphQL server
import schema from "./Schemas/index.js";

// 1. Define the User Type: Schemas/TypeDefs/UserType.js
// 2. Define the Root Query Type: Schemas/index.js
// 3. Define the Mutation Type: Schemas/index.js
// 4. Create the Schema: Schemas/index.js

// 5. Set up Express Server and GraphQL Endpoint
const app = express();

// GraphQL endpoint (this is how we access our API, by going to http://localhost:4000/graphql)
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Enables the GraphiQL UI for testing
  }),
);

// Start the server
app.listen(4000, () => {
  console.log(">>> 🆙 Server is running on http://localhost:4000/graphql");
});
