import Dataloader from 'dataloader'
import Subject from '../models/subjects';
import Query from '../models/queries';
import Resource from '../models/resources';
import User from '../models/user';
import Branch from '../models/branches';
import Message from '../models/message';
import Community from '../models/community'

/* eslint no-return-await: 0 */

export const batchingFunction = async (keys, model) => {
  return await Promise.all(keys.map(async (key) => {
    try {
      const data = await model.findById(key);
      return data;
    } catch (err) {
      return null;
    }
  }));
};

const subjectloader = new Dataloader(keys => batchingFunction(keys, Subject));
const queryloader = new Dataloader(keys => batchingFunction(keys, Query));
const resourceloader = new Dataloader(keys => batchingFunction(keys, Resource));
const userloader = new Dataloader(keys => batchingFunction(keys, User));
const branchloader = new Dataloader(keys => batchingFunction(keys, Branch));
const messageloader = new Dataloader(keys => batchingFunction(keys, Message));
const communityloader = new Dataloader(keys => batchingFunction(keys, Community))

export const loaders = {
  subjectloader,
  queryloader,
  resourceloader,
  userloader,
  branchloader,
  messageloader,
  communityloader
};
