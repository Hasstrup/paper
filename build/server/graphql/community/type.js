"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// join mutation and what not

var communityTypes = exports.communityTypes = "\n  type Community {\n    title: String\n    description: String\n    _id: String\n    welcome: String\n    publisher: User\n    members: [User]\n    subjects: [Subject]\n    privileged: [User]\n    messages: [Message]\n    resources: [Resource]\n    rules: [String]\n    tags: [String]\n    blacklist: [String]\n    branches: [Branch]\n    queries: [queryType]\n    inclusion: Inclusion\n    timestamps: String\n    likes: Int\n  }\n\ntype Inclusion {\n  free: Boolean\n  number: Int\n}\n\ninput CommunityInput {\n  title: String!\n  description: String!\n  subject: String\n}\n";

var communityQueries = exports.communityQueries = "\n  communities: [Community]\n  community(id: ID): Community\n";

var communityMutations = exports.communityMutations = "\nnewCommunity(token: String, input: CommunityInput): Community\njoinCommunity(token: String, community: ID): Community\nleaveCommunity(token: String, community: ID): User\ninvokePrivilege(token: String, community: ID): Community\nrevokePrivilege(token: String, community: ID): Community\ndeleteCommunity(token: String): Community\nlikeCommunity(token: String): Community\nunlikeCommunity(token: String): Community\n";