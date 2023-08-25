"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTenantGroupSchema = exports.putTenantGroupSchema = exports.putTenantGroupsSchema = exports.postTenantGroupSchema = exports.getByIdSchema = exports.getTenantGroupSchema = void 0;
const entities_1 = require("../../db/entities");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const tenantGroupResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(entities_1.tenantGroups);
const tenantGroupCollectionResponseZodSchema = zod_1.z.array(tenantGroupResponseZodSchema);
const allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(tenantGroupResponseZodSchema);
const insertTenantGroupZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.tenantGroups).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateTenantGroupZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.tenantGroups).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateTenantGroupsZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(entities_1.tenantGroups).omit({ createdAt: true, updatedAt: true }));
const myschema = {
    tags: ['Tenant Groups'],
};
const getTenantGroupsByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getTenantGroupSchema = Object.assign(Object.assign({}, myschema), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(tenantGroupCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, myschema), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getTenantGroupsByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(tenantGroupResponseZodSchema) } });
exports.postTenantGroupSchema = Object.assign(Object.assign({}, myschema), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertTenantGroupZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(tenantGroupResponseZodSchema) } });
exports.putTenantGroupsSchema = Object.assign(Object.assign({}, myschema), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateTenantGroupsZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(tenantGroupCollectionResponseZodSchema) } });
exports.putTenantGroupSchema = Object.assign(Object.assign({}, myschema), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getTenantGroupsByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateTenantGroupZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(tenantGroupResponseZodSchema) } });
exports.deleteTenantGroupSchema = Object.assign(Object.assign({}, myschema), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getTenantGroupsByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted tenantGroup',
            type: 'null',
        },
    } });
