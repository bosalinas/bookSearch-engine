import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          authors
          bookId
          image
          link
          title
          description
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
          # _id
          bookId
          authors
          image
          link
          title
          description
        }
      }
    }
  `;


// 1. **Mutation Name** (`addUser`):
//    - This is the name of the mutation operation. It is used to invoke this specific mutation in your GraphQL schema on the server side.

// 2. **Input Variables** (`$username`, `$email`, `$password`):
//    - These are the input variables that you can pass when calling the `addUser` mutation.
//    - They are defined with data types (`String!`) and marked as required with the exclamation mark (`!`), indicating that they must be provided when calling the mutation.

// 3. **Mutation Body**:
//    - Inside the mutation, you are calling the `addUser` mutation and passing the input variables with their corresponding values.

// 4. **Response Fields**:
//    - After the mutation is executed on the server, it returns a response object.
//    - The response object has two fields:
//      - `token`: This field represents an authentication token, likely returned upon successful user creation. It's used for authentication purposes.
//      - `user`: This field represents the user object that was created. It includes the `_id` and `username` properties.
