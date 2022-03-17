import Redlock from "redlock";
import redis from "../datastores/redis";
import config from "config";

const redisClusterA = redis.client;
const redlock = new Redlock([redisClusterA], config.get("system.lock"));

export function acquire(resources, ttl = config.get("system.lock.duration")) {
  return redlock.acquire(resources, ttl);
}

export default redlock;
