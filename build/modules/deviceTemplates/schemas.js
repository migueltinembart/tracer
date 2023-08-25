"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDeviceTemplateSchema = exports.putDeviceTemplateSchema = exports.putDeviceTemplatesSchema = exports.postDeviceTemplateSchema = exports.getByIdSchema = exports.getDeviceTemplatesSchema = exports.allowedQueryStrings = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const deviceManagement_1 = require("../../db/deviceManagement");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const deviceTemplateResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(deviceManagement_1.deviceTemplates, { template: zod_1.z.any() });
const deviceTemplateCollectionResponseZodSchema = zod_1.z.array(deviceTemplateResponseZodSchema);
exports.allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(deviceTemplateResponseZodSchema);
const insertDeviceTemplateZodSchema = (0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.deviceTemplates, {
    template: zod_1.z.record(zod_1.z.string(), zod_1.z.string()),
}).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateDeviceTemplateZodSchema = (0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.deviceTemplates, { template: zod_1.z.any() }).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateDeviceTemplatesZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.deviceTemplates, { template: zod_1.z.record(zod_1.z.any(), zod_1.z.any()) }).omit({
    createdAt: true,
    updatedAt: true,
}));
const swaggerOpts = {
    tags: ['Device Templates'],
};
const getDeviceTemplatesByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getDeviceTemplatesSchema = Object.assign(Object.assign({}, swaggerOpts), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(exports.allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(deviceTemplateCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getDeviceTemplatesByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(deviceTemplateResponseZodSchema) } });
exports.postDeviceTemplateSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertDeviceTemplateZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(deviceTemplateResponseZodSchema) } });
exports.putDeviceTemplatesSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateDeviceTemplatesZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(deviceTemplateCollectionResponseZodSchema) } });
exports.putDeviceTemplateSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getDeviceTemplatesByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateDeviceTemplateZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(deviceTemplateResponseZodSchema) } });
exports.deleteDeviceTemplateSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getDeviceTemplatesByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted deviceTemplate',
            type: 'null',
        },
    } });
