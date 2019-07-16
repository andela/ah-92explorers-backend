import redis from 'redis';
import bluebird from 'bluebird';


bluebird.promisifyAll(redis);
const client = redis.createClient({
  url: process.env.REDIS_URL
});

export default client;
