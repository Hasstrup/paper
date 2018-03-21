'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchCommunities = exports.fetchCommunity = exports.joinCommunity = exports.createCommunity = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('babel-polyfill');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _errorClass = require('../../helpers/error-class');

var _errorClass2 = _interopRequireDefault(_errorClass);

var _validator = require('../../helpers/validator');

var _validator2 = _interopRequireDefault(_validator);

var _community = require('../../models/community');

var _community2 = _interopRequireDefault(_community);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_dotenv2.default.config();

var createCommunity = exports.createCommunity = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(token, input) {
    var _ref2, id, community;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _jsonwebtoken2.default.verify(token, process.env.KEY);

          case 3:
            _ref2 = _context.sent;
            id = _ref2.id;
            _context.next = 7;
            return _community2.default.create(_extends({}, input, { publisher: id }));

          case 7:
            community = _context.sent;
            return _context.abrupt('return', community);

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](0);
            throw new Error(_context.t0 ? _context.t0 : _context.t0.message);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 11]]);
  }));

  return function createCommunity(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var joinCommunity = exports.joinCommunity = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(token, communityID) {
    var joinHandler, errors, _jwt$verify, id, community, newCommunity;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            joinHandler = new _errorClass2.default(['token', 'communityID']);
            _context2.next = 4;
            return joinHandler.validate({ token: token, communityID: communityID });

          case 4:
            errors = _context2.sent;

            if (!errors.passing) {
              _context2.next = 16;
              break;
            }

            _jwt$verify = _jsonwebtoken2.default.verify(token, process.env.KEY), id = _jwt$verify.id;

            if (!(id && id.constructor === String)) {
              _context2.next = 15;
              break;
            }

            _context2.next = 10;
            return _community2.default.findById(communityID);

          case 10:
            community = _context2.sent;
            _context2.next = 13;
            return community.addMember(id);

          case 13:
            newCommunity = _context2.sent;
            return _context2.abrupt('return', newCommunity);

          case 15:
            throw new _validator2.default({ id: 'Invalid token' });

          case 16:
            joinHandler.refresh();
            throw new _validator2.default(errors);

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2['catch'](0);

            if (!_context2.t0.state.db) {
              _context2.next = 24;
              break;
            }

            throw new _validator2.default({ err: _context2.t0.state.db });

          case 24:
            throw new _validator2.default({ err: _context2.t0.state ? _context2.t0.state : _context2.t0.message });

          case 25:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 20]]);
  }));

  return function joinCommunity(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var fetchCommunity = exports.fetchCommunity = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(communityID) {
    var community;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (!(communityID && communityID.constructor === String)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 4;
            return _community2.default.findById(communityID).populate('publisher members');

          case 4:
            community = _context3.sent;

            if (!community) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt('return', community);

          case 7:
            throw new _validator2.default({ db: 'User doesnt exist' });

          case 8:
            throw new _validator2.default({ db: 'Invalid input' });

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3['catch'](0);

            if (!_context3.t0.state) {
              _context3.next = 15;
              break;
            }

            throw new _validator2.default({ err: _context3.t0.state.db });

          case 15:
            throw new _validator2.default({ err: _context3.t0.message });

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 11]]);
  }));

  return function fetchCommunity(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var fetchCommunities = exports.fetchCommunities = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var communities;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _community2.default.find({}).populate('publisher members');

          case 3:
            communities = _context4.sent;
            return _context4.abrupt('return', communities);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](0);
            throw new _validator2.default({ err: _context4.t0.message });

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function fetchCommunities() {
    return _ref5.apply(this, arguments);
  };
}();