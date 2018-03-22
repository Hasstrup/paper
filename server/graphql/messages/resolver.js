import generateloader from './helper';

/* eslint no-return-await: 0 */
/* eslint arrow-body-style: [0, "always"] */

export const origin = async (obj, args, context) => {
  return await context.loaders.userloader.load(obj.origin);
};


export const destination = async (obj, args, context) => {
  return await generateloader(obj.type, context, obj.destination);
};

export const resources = async (obj) => {
  return await Promise.all(obj.resources.map(async (key) => {
    return await context.loaders.resourceloader.load(key);
  }));
};
