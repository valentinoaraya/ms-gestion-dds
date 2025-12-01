import dotenv from "dotenv";

dotenv.config({path: '.env.development'});

export const PORT = Number(process.env.PORT) || 5003

export const REDIS_URL = process.env.REDIS_URL || "redis://redis-servidor:6380"