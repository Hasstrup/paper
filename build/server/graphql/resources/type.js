"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var resourceType = "\n  type Resource {\n    author: User\n    content: String\n    title: String\n    queries: [queryType]\n    votes: Number\n    reference: Message\n    type: String\n    created_at: Date\n  }\n";

exports.default = resourceType;