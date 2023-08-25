"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationSchema = exports.putLocationSchema = exports.putLocationsSchema = exports.postLocationSchema = exports.getByIdSchema = exports.getLocationsSchema = exports.allowedQueryStrings = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const entities_1 = require("../../db/entities");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const locationResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(entities_1.locations);
const locationCollectionResponseZodSchema = zod_1.z.array(locationResponseZodSchema);
exports.allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(locationResponseZodSchema);
const insertLocationZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.locations).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateLocationZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.locations).omit({ id: true, updatedAt: true, createdAt: true });
const updateLocationsZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(entities_1.locations).omit({ createdAt: true, updatedAt: true }));
const swaggerOpts = {
    tags: ['Locations'],
};
const getLocationsByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getLocationsSchema = Object.assign(Object.assign({}, swaggerOpts), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(exports.allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(locationCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getLocationsByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(locationResponseZodSchema) } });
exports.postLocationSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertLocationZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(locationResponseZodSchema) } });
exports.putLocationsSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateLocationsZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(locationCollectionResponseZodSchema) } });
exports.putLocationSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getLocationsByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateLocationZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(locationResponseZodSchema) } });
exports.deleteLocationSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getLocationsByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted location',
            type: 'null',
        },
    } });
