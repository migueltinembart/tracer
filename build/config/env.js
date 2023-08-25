"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = __importDefault(require("zod"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.default.object({
    CONNECTION_STRING: zod_1.default.string().nonempty(),
    PORT: zod_1.default.string().transform(Number),
    HOST: zod_1.default.string().default('0.0.0.0'),
    MIGRATION_FOLDER: zod_1.default.string(),
    LOG_LEVEL: zod_1.default.string().optional(),
    BASEURL: zod_1.default.string(),
});
exports.env = envSchema.parse(process.env);
