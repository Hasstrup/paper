"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var queryType = "\n  type queryType {\n    title: String\n    type: String\n    content: String\n    author: User\n    reference: ID\n    resources: [Resource]\n  }\n";
exports.default = queryType;