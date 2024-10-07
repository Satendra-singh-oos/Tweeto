import Redis from "ioredis";

export const redisClient = new Redis(process.env.UPSTASH_REDIS_URL as string);
