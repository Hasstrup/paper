'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _type = require('./user/type');

var _type2 = require('./branches/type');

var _type3 = _interopRequireDefault(_type2);

var _type4 = require('./messages/type');

var _type5 = _interopRequireDefault(_type4);

var _type6 = require('./subjects/type');

var _type7 = _interopRequireDefault(_type6);

var _type8 = require('./queries/type');

var _type9 = _interopRequireDefault(_type8);

var _type10 = require('./resources/type');

var _type11 = _interopRequireDefault(_type10);

var _type12 = require('./community/type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefs = '\n  ' + _type.userType + '\n  ' + _type3.default + '\n  ' + _type5.default + '\n  ' + _type7.default + '\n  ' + _type9.default + '\n  ' + _type11.default + '\n  ' + _type12.communityTypes + '\n\n  type Query {\n    viewer(token: ID!): User\n    ' + _type.userQueries + '\n    ' + _type12.communityQueries + '\n  }\n\n  type Mutation {\n    ' + _type.userMutations + '\n    ' + _type12.communityMutations + '\n  }\n';
exports.default = typeDefs;