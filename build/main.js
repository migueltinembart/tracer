"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./utils/server");
const env_1 = require("./config/env");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const db_1 = require("./utils/db");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //Register swagger
        const app = yield (0, server_1.buildServer)();
        // Migrate db for changes
        yield (0, migrator_1.migrate)(db_1.db, { migrationsFolder: env_1.env.MIGRATION_FOLDER });
        app.listen({
            port: env_1.env.PORT,
            host: env_1.env.HOST,
        });
    });
}
main();
