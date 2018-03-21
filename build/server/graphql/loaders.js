'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loaders = exports.batchingFunction = undefined;

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _subjects = require('../models/subjects');

var _subjects2 = _interopRequireDefault(_subjects);

var _queries = require('../models/queries');

var _queries2 = _interopRequireDefault(_queries);

var _resources = require('../models/resources');

var _resources2 = _interopRequireDefault(_resources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var results = [];

var checkDb = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, model) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return model.findById(key);

          case 3:
            data = _context.sent;

            results.push(data);
            return _context.abrupt('return');

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](0);

            results.push(null);
            return _context.abrupt('return');

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 8]]);
  }));

  return function checkDb(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// export const batchingFunction = async (keys, model) => {
//   await keys.forEach(async (key) => {
//      await checkDb(key, model);
//   });
//   console.log(results)
//   return results
//
// }

var batchingFunction = exports.batchingFunction = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(keys, model) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return Promise.all(keys.map(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key) {
                var data;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return model.findById(key);

                      case 3:
                        data = _context2.sent;
                        return _context2.abrupt('return', data);

                      case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](0);
                        return _context2.abrupt('return', null);

                      case 10:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined, [[0, 7]]);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function batchingFunction(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var subjectloader = new _dataloader2.default(function (keys) {
  return batchingFunction(keys, _subjects2.default);
});
var queryloader = new _dataloader2.default(function (keys) {
  return batchingFunction(keys, _queries2.default);
});
var resourceloader = new _dataloader2.default(function (keys) {
  return batchingFunction(keys, _resources2.default);
});

var loaders = exports.loaders = {
  subjectloader: subjectloader,
  queryloader: queryloader,
  resourceloader: resourceloader
};