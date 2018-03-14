'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_dotenv2.default.config();
app.use((0, _morgan2.default)('dev'));

app.get('/hello', function (req, res) {
  res.send('Hello world');
});

app.listen(process.env.PORT, function () {
  console.log('Server is listening on ' + process.env.PORT);
});