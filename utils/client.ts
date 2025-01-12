import { createClient, type RedisClientType } from "redis";
import colors from "colors";

let client: RedisClientType | null = null;

export async function initializeRedisClient() {
    if(!client) {
        client = createClient();
        client.on("error", (error) => {
            console.error(error);
        });
        client.on("connect", () => {
            console.log(colors.green("Connected to Redis"));
        });
        await client.connect();
    }

    return client;
}