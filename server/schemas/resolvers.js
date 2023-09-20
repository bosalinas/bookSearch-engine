const { AuthenticationError } = require('apollo-server-express');
const { User, populate } = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //get single user
    //context to retrieve logged in user without searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .select('-__v -password');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    //login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    //addUser: aka createUser
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({
        username,
        email,
        password
      });
      const token = signToken(user);
      return { token, user };
    }, 
    //saveBook: aka add a book to User
    saveBook: async (parent, { input }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedBooks: input } },
          { new: true },
          )
        .populate("books");
        return updatedUser;
      };
      throw new AuthenticationError('You need to be logged in to save a book!');
    },
    //removeBook aka deleteBook
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookId }},
          { new: true }
          );
      }
      throw new AuthenticationError('You need to be logged in to delete a book!');
    }
  },

}
module.exports = resolvers;