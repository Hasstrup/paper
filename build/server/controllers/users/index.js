'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginuser = exports.createuser = exports.SignUpHandler = undefined;

require('babel-polyfill');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _errorClass = require('../../helpers/error-class');

var _errorClass2 = _interopRequireDefault(_errorClass);

var _validator = require('../../helpers/validator');

var _validator2 = _interopRequireDefault(_validator);

var _user = require('../../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SignUpHandler = exports.SignUpHandler = new _errorClass2.default(['email', 'username', 'password', 'firstname', 'lastname'], _user2.default);

var createuser = exports.createuser = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input) {
    var errors, salt, user, payload, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return SignUpHandler.validate(input);

          case 3:
            errors = _context.sent;

            if (!errors.passing) {
              _context.next = 19;
              break;
            }

            _context.next = 7;
            return _bcrypt2.default.genSaltSync(10);

          case 7:
            salt = _context.sent;
            _context.next = 10;
            return _bcrypt2.default.hash(input.password, salt);

          case 10:
            input.password = _context.sent;
            _context.next = 13;
            return _user2.default.create(input);

          case 13:
            user = _context.sent;
            payload = {
              id: user._id,
              username: user.username
            };
            _context.next = 17;
            return _jsonwebtoken2.default.sign(payload, process.env.KEY);

          case 17:
            token = _context.sent;
            return _context.abrupt('return', {
              firstname: user.firstname,
              _id: user._id,
              email: user.email,
              password: input.password,
              username: user.username,
              lastname: user.lastname,
              token: token
            });

          case 19:
            SignUpHandler.refresh();
            throw new _validator2.default(errors);

          case 23:
            _context.prev = 23;
            _context.t0 = _context['catch'](0);
            throw new _validator2.default(_context.t0.state);

          case 26:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 23]]);
  }));

  return function createuser(_x) {
    return _ref.apply(this, arguments);
  };
}();

// check if email and password . if null or undefined throw new error
var loginuser = exports.loginuser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email, password) {
    var LoginHandler, errors, user, payload, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            LoginHandler = new _errorClass2.default(['email', 'password']);
            _context2.prev = 1;
            _context2.next = 4;
            return LoginHandler.validate({ email: email, password: password });

          case 4:
            errors = _context2.sent;

            if (!errors.passing) {
              _context2.next = 22;
              break;
            }

            _context2.next = 8;
            return _user2.default.findOne({ email: email });

          case 8:
            user = _context2.sent;

            if (!(user && _bcrypt2.default.compareSync(password, user.password))) {
              _context2.next = 17;
              break;
            }

            payload = {
              id: user._id,
              username: user.username
            };
            _context2.next = 13;
            return _jsonwebtoken2.default.sign(payload, process.env.KEY);

          case 13:
            token = _context2.sent;
            return _context2.abrupt('return', {
              firstname: user.firstname,
              _id: user._id,
              email: user.email,
              username: user.username,
              lastname: user.lastname,
              token: token
            });

          case 17:
            if (!(user == null)) {
              _context2.next = 20;
              break;
            }

            LoginHandler.adderror('Sorry we dont recognize this user');
            throw new _validator2.default(LoginHandler.errors);

          case 20:
            LoginHandler.adderror('The username and password do not match fella');
            throw new _validator2.default(LoginHandler.errors);

          case 22:
            LoginHandler.refresh();
            throw new _validator2.default(errors);

          case 26:
            _context2.prev = 26;
            _context2.t0 = _context2['catch'](1);

            LoginHandler.refresh();
            throw new _validator2.default(_context2.t0.state ? _context2.t0.state : { db: _context2.t0.message });

          case 30:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 26]]);
  }));

  return function loginuser(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

// export const fetchUsers = () => {
//   return new Promise((resolve, reject) => {
//     User.find
//   })
// }