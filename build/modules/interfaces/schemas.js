"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInterfaceSchema = exports.putInterfaceSchema = exports.putInterfacesSchema = exports.postInterfaceSchema = exports.getByIdSchema = exports.getInterfacesSchema = exports.allowedQueryStrings = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const deviceManagement_1 = require("../../db/deviceManagement");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const interfaceResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(deviceManagement_1.interfaces);
const interfaceCollectionResponseZodSchema = zod_1.z.array(interfaceResponseZodSchema);
exports.allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(interfaceResponseZodSchema);
const insertInterfaceZodSchema = (0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.interfaces).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateInterfaceZodSchema = (0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.interfaces).omit({ id: true, updatedAt: true, createdAt: true });
const updateInterfacesZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.interfaces).omit({ createdAt: true, updatedAt: true }));
const swaggerOpts = {
    tags: ['Interfaces'],
};
const getInterfacesByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getInterfacesSchema = Object.assign(Object.assign({}, swaggerOpts), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(exports.allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(interfaceCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getInterfacesByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(interfaceResponseZodSchema) } });
exports.postInterfaceSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertInterfaceZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(interfaceResponseZodSchema) } });
exports.putInterfacesSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateInterfacesZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(interfaceCollectionResponseZodSchema) } });
exports.putInterfaceSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getInterfacesByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateInterfaceZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(interfaceResponseZodSchema) } });
exports.deleteInterfaceSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getInterfacesByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted interface',
            type: 'null',
        },
    } });
