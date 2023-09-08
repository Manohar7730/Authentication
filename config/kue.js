const kue = require("kue");

const queue = kue.createQueue({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth: {
    password: process.env.REDIS_PASSWORD, // Use the environment variable
  },
});

console.log("REDIS_HOST:", process.env.REDIS_HOST);
console.log("REDIS_PORT:", process.env.REDIS_PORT);
console.log("REDIS_PASSWORD:", process.env.REDIS_PASSWORD);

module.exports = queue;
