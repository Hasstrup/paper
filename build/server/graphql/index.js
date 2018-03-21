'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resolver = require('./user/resolver');

var resolvers = {
  Query: {
    user: function user(obj, args, context) {
      return (0, _resolver.getUser)(obj, args).then(function (user) {
        return user;
      });
    },

    users: function users(obj, args, context) {
      return (0, _resolver.allUsers)().then(function (users) {
        return users;
      }).catch(function (err) {
        return err;
      });
    }
  },

  Mutation: {
    signup: _resolver.signup
  }
};

exports.default = resolvers;