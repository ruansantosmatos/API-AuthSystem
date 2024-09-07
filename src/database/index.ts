import knex from "knex";
import { config } from "./config";

export const database = knex({
    client: config.client,
    connection: config.connection
})