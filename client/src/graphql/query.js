import { gql } from "@apollo/client";

const SNAPS = gql`
  query {
    snaps {
      id
      text
      createdAt
      user {
        id
        username
        createdAt
      }
    }
  }
`;

const ACTIVE_USER = gql`
  query {
    activeUser {
      id
      username
      createdAt
      snaps {
        id
        text
        createdAt
      }
    }
  }
`;

export { ACTIVE_USER, SNAPS };
