"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactGroupSchema = exports.putContactGroupSchema = exports.putContactGroupsSchema = exports.postContactGroupSchema = exports.getByIdSchema = exports.getContactGroupsSchema = exports.allowedQueryStrings = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const entities_1 = require("../../db/entities");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const contactGroupResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(entities_1.contactGroups);
const contactGroupCollectionResponseZodSchema = zod_1.z.array(contactGroupResponseZodSchema);
exports.allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(contactGroupResponseZodSchema);
const insertContactGroupZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.contactGroups).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateContactGroupZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.contactGroups).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateContactGroupsZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(entities_1.contactGroups).omit({ createdAt: true, updatedAt: true }));
const swaggerOpts = {
    tags: ['Contact Groups'],
};
const getContactGroupsByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getContactGroupsSchema = Object.assign(Object.assign({}, swaggerOpts), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(exports.allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(contactGroupCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getContactGroupsByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(contactGroupResponseZodSchema) } });
exports.postContactGroupSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertContactGroupZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(contactGroupResponseZodSchema) } });
exports.putContactGroupsSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateContactGroupsZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(contactGroupCollectionResponseZodSchema) } });
exports.putContactGroupSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getContactGroupsByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateContactGroupZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(contactGroupResponseZodSchema) } });
exports.deleteContactGroupSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getContactGroupsByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted contactGroup',
            type: 'null',
        },
    } });
