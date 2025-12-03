import { createClient } from "redis";
import { REDIS_URL } from "../config/config";

export const localClient = createClient ({
    url: REDIS_URL
})

