const kue = require("kue");

const queue = kue.createQueue({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

module.exports = queue;
