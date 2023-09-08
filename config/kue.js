const kue = require("kue");

const queue = kue.createQueue({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth: {
    password: process.env.REDIS_PASSWORD, // Use the environment variable
  },
});

module.exports = queue;
