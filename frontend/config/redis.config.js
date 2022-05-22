const redis = require("redis");
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  connect_timeout: 10000,
});

// if you'd like to select database 3, instead of 0 (default), call
client.select(1);

client.on("error", (err) => {
  console.log(`Error: ${err}`);
});

client.on("ready", function () {
  redisIsReady = true;
  console.log("redis is running");
});

module.exports = {
  getRedisClientForSession: () => client,

  quitRedis() {
    return client.quitAsync();
  },
  quitRedisForSession() {
    return client.quitAsync();
  },
};

// var Redis = require("redis");
// var Bluebird = require("bluebird");
// Bluebird.promisifyAll(Redis.RedisClient.prototype);
// Bluebird.promisifyAll(Redis.Multi.prototype);

// const client = redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASSWORD,
//   connect_timeout: 10000,
// });

// client.on("error", (err) => {
//   console.log(`Error: ${err}`);
// });

// module.exports = {
//   getRedisClientForSession: () => client,

//   quitRedis() {
//     return client.quitAsync();
//   },
//   quitRedisForSession() {
//     return client.quitAsync();
//   },
// };

// module.exports = client;
