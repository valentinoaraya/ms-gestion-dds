import dotenv from "dotenv";

dotenv.config({path: process.env.NODE_ENV === "development" ? ".env.development" : ".env.production" });

export const PORT = Number(process.env.PORT) || 5003

export const REDIS_URL = process.env.REDIS_URL || "redis://redis-servidor:6380"