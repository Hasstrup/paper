import Dataloader from 'dataloader'
import Subject from '../../models/subjects'

const results = [];

const checkDb = async (key, model) => {
  try {
    const subject = await model.findById(key).exec();
    results.push(subject);
  } catch (err) {
    results.push(null);
  }
};

export const batchingFunction = async (keys, model) => {
  await keys.forEach((key) => {
    checkDb(key, model);
  });
  return results;
};

export export const subjectloader = new Dataloader(keys => batchingFunction(keys));
