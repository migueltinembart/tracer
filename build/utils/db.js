"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.buildDB = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const env_1 = require("../config/env");
const logger_1 = require("./logger");
function buildDB() {
    const client = new pg_1.Pool({
        connectionString: env_1.env.CONNECTION_STRING,
        ssl: true,
    });
    // Run info log for logging purposes
    logger_1.logger.info('Database client initialized');
    return (0, node_postgres_1.drizzle)(client);
}
exports.buildDB = buildDB;
exports.db = buildDB();
