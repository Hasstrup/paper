
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

export default generateloader
