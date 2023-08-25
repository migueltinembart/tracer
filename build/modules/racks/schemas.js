"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRackSchema = exports.putRackSchema = exports.putRacksSchema = exports.postRackSchema = exports.getByIdSchema = exports.getRacksSchema = exports.allowedQueryStrings = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const entities_1 = require("../../db/entities");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const rackResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(entities_1.racks);
const rackCollectionResponseZodSchema = zod_1.z.array(rackResponseZodSchema);
exports.allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(rackResponseZodSchema);
const insertRackZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.racks).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateRackZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.racks).omit({ id: true, updatedAt: true, createdAt: true });
const updateRacksZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(entities_1.racks).omit({ createdAt: true, updatedAt: true }));
const swaggerOpts = {
    tags: ['Racks'],
};
const getRacksByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getRacksSchema = Object.assign(Object.assign({}, swaggerOpts), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(exports.allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(rackCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getRacksByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(rackResponseZodSchema) } });
exports.postRackSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertRackZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(rackResponseZodSchema) } });
exports.putRacksSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateRacksZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(rackCollectionResponseZodSchema) } });
exports.putRackSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getRacksByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateRackZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(rackResponseZodSchema) } });
exports.deleteRackSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getRacksByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted rack',
            type: 'null',
        },
    } });
