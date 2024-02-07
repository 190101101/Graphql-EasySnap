import { gql } from "@apollo/client";

const JOIN = gql`
  subscription {
    user {
      id
      username
      createdAt
    }
  }
`;

const NEW_SNAP = gql`
  subscription($userId: ID){
    snap(userId:$userId){
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
`

export { JOIN, NEW_SNAP };
