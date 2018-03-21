"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var messageType = "\n  type Message {\n    body: String\n    title: String\n    type: String\n    origin: User\n    destination: ID\n    queries: [queryType]\n    upvotes: Int\n    resources: [Resource]\n  }\n";
exports.default = messageType;