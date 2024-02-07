module.exports = {
  user: {
    subscribe: (parent, args, { pubsub }) => {
      return pubsub.asyncIterator("user");
    },
  },
};
