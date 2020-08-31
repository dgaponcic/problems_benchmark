const redis = require('redis');
const { promisify } = require('util');

function promisify_function(f) {
  return promisify(f).bind(redis_client)
}

redis_client = redis.createClient(parseInt(process.env['REDIS_PORT']), process.env['REDIS_HOST']);
redis_client.get = promisify_function(redis_client.get)
redis_client.exists = promisify_function(redis_client.exists)
module.exports = redis_client;
