"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeviceSchema = exports.putDeviceSchema = exports.putDevicesSchema = exports.postDeviceSchema = exports.getByIdSchema = exports.getDevicesSchema = exports.allowedQueryStrings = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const deviceManagement_1 = require("../../db/deviceManagement");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const deviceResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(deviceManagement_1.devices);
const deviceCollectionResponseZodSchema = zod_1.z.array(deviceResponseZodSchema);
exports.allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(deviceResponseZodSchema);
const insertDeviceZodSchema = (0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.devices).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateDeviceZodSchema = (0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.devices).omit({ id: true, updatedAt: true, createdAt: true });
const updateDevicesZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.devices).omit({ createdAt: true, updatedAt: true }));
const swaggerOpts = {
    tags: ['Devices'],
};
const getDevicesByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getDevicesSchema = Object.assign(Object.assign({}, swaggerOpts), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(exports.allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(deviceCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getDevicesByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(deviceResponseZodSchema) } });
exports.postDeviceSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertDeviceZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(deviceResponseZodSchema) } });
exports.putDevicesSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateDevicesZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(deviceCollectionResponseZodSchema) } });
exports.putDeviceSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getDevicesByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateDeviceZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(deviceResponseZodSchema) } });
exports.deleteDeviceSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getDevicesByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted device',
            type: 'null',
        },
    } });
