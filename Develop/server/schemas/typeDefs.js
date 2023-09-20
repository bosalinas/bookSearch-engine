const { gql } = require("apollo-server-express");
//not sure if bookCount should be a string

// saveBook: Accepts a book author's array, description, title, bookId, 
// image, and link as parameters; returns a User type. 
// (Look into creating what's known as an input type to handle all of these parameters!)

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: String
        savedBooks: [Book]!
    } 
    type Book {
        bookId: ID
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    input BookInput {
        bookId: String!
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Auth {
        token: ID!
        user: User
      }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook:(bookId: String!): User
    }`;

    module.exports = typeDefs;
