const Subscription = {
  userCreated: {
    subscribe: (_, args, { pubsub }) => pubsub.asyncIterator("userCreated"),
  },
};

module.exports = Subscription;
