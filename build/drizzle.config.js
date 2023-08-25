"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
exports.default = {
    out: './migrations',
    schema: './src/db/*.ts',
    breakpoints: false,
    driver: 'pg',
    dbCredentials: {
        connectionString: env_1.env.CONNECTION_STRING + '?sslmode=require',
    },
};
