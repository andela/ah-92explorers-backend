import redis from 'redis';
import bluebird from 'bluebird';


bluebird.promisifyAll(redis);
const client = redis.createClient();

export default client;
