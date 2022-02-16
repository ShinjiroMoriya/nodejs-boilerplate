import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";

export const RedisStore = connectRedis(session);
export const redis = new Redis(
  process.env.REDIS_URL || "redis://127.0.0.1:6379"
);
