const kue = require("kue");
const redis = require("redis");

// Create a Redis client using the provided Render Redis instance details
const client = redis.createClient({
  host: "red-cjtiqsdhtt0c73e4unbg", // Replace with your actual Redis hostname
  port: 6379, // Replace with your actual Redis port
  password: "1234", // Replace with your actual Redis password
});

// Create a Kue queue and configure it to use the Redis client
const queue = kue.createQueue({
  redis: {
    createClientFactory: function () {
      return client;
    },
  },
});

module.exports = queue;
