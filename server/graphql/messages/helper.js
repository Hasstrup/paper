import { GraphQLScalarType } from 'graphql'

const generateloader = async (type, context, destination) => {
  switch (type) {
    case 1:
      return context.loaders.userloader.load(destination);

    case 2:
      return context.loaders.communityloader.load(destination);

    case 3:
      return context.loaders.messageloader.load(destination);

    default:
      return null;
  }
};

export const communityType = `
title: String
description: String
id: String
welcome: String
publisher: User
members: [User]
subjects: [Subject]
privileged: [User]
messages: [Message]
resources: [Resource]
rules: [String]
tags: [String]
blacklist: [String]
branches: [Branch]
queries: [queryType]
inclusion: Inclusion
timestamps: String
likes: Int`;

export const Type = `
body: String
type: String
origin: User
destination: Destination
upvotes: Int
support: [Resource]
`;
export default generateloader
