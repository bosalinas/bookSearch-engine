const { AuthenticationError } = require('apollo-server-express');
const { User } = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        //get single user
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },
    Mutation: {
        //login
        //addUser aka createUser
        //saveBook 
        //removeBook aka deleteBook
    }
}

module.exports = resolvers;