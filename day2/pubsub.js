const { RedisPubSub } = require("graphql-redis-subscriptions");

const Redis = require("ioredis");
const REDIS_DOMAIN_NAME = "";

const PORT_NUMBER = 4000;

const options = {
  host: REDIS_DOMAIN_NAME,
  port: PORT_NUMBER,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

module.exports = pubsub;
