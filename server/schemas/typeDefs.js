const { gql } = require("apollo-server-express");

// saveBook: Accepts a book author's array, description, title, bookId, 
// image, and link as parameters; returns a User type. 
// (Look into creating what's known as an input type to handle all of these parameters!)

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    } 
    type Book {
        bookId: ID!
        authors: [String]
        description: String

        image: String
        link: String
        title: String
    }
    input BookInput {
        bookId: String!
        authors: [String]
        description: String
        
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
        saveBook(input: BookInput!): User
        removeBook(bookId: ID!): User
    }`;

    module.exports = typeDefs;
