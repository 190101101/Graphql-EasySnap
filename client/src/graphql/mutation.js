import { gql } from "@apollo/client";

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    SignIn(data: { username: $username, password: $password }) {
      token
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser(
    $username: String!
    $password: String!
  ) {
    CreateUser(
      data: { username: $username, password: $password}
    ) {
      token
    }
  }
`;


const CREATE_SNAP = gql`
  mutation CreateSnap(
    $user_id: String!
    $text: String!
  ) {
    CreateSnap(
      data: { user_id: $user_id, text: $text}
    ) {
      id
      text
      createdAt
      user{
        id
        username
        createdAt
      }
    }
  }
`;

export { SIGN_IN, CREATE_USER, CREATE_SNAP };
