"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactSchema = exports.putContactSchema = exports.putContactsSchema = exports.postContactSchema = exports.getByIdSchema = exports.getContactsSchema = exports.allowedQueryStrings = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const entities_1 = require("../../db/entities");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const contactResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(entities_1.contacts);
const contactCollectionResponseZodSchema = zod_1.z.array(contactResponseZodSchema);
exports.allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(contactResponseZodSchema);
const insertContactZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.contacts).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateContactZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.contacts).omit({ id: true, updatedAt: true, createdAt: true });
const updateContactsZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(entities_1.contacts).omit({ createdAt: true, updatedAt: true }));
const swaggerOpts = {
    tags: ['Contacts'],
};
const getContactsByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getContactsSchema = Object.assign(Object.assign({}, swaggerOpts), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(exports.allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(contactCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getContactsByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(contactResponseZodSchema) } });
exports.postContactSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertContactZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(contactResponseZodSchema) } });
exports.putContactsSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateContactsZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(contactCollectionResponseZodSchema) } });
exports.putContactSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getContactsByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateContactZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(contactResponseZodSchema) } });
exports.deleteContactSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getContactsByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted contact',
            type: 'null',
        },
    } });
