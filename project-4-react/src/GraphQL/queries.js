import { gql } from "@apollo/client";

const LOAD_USERS = gql`
  query {
    users {
      id
      firstName
      lastName
    }
  }
`;

export default LOAD_USERS;
