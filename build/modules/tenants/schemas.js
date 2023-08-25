"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTenantSchema = exports.putTenantSchema = exports.putTenantsSchema = exports.postTenantSchema = exports.getByIdSchema = exports.getTenantsSchema = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const entities_1 = require("../../db/entities");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
const tenantResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(entities_1.tenants);
const tenantCollectionResponseZodSchema = zod_1.z.array(tenantResponseZodSchema);
const allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(tenantResponseZodSchema);
const insertTenantZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.tenants).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateTenantZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.tenants).omit({ id: true, updatedAt: true, createdAt: true });
const updateTenantsZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(entities_1.tenants).omit({ createdAt: true, updatedAt: true }));
const myschema = {
    tags: ['Tenants'],
};
const getTenantsByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number().optional(),
})
    .describe('Takes an id as a parameter');
exports.getTenantsSchema = Object.assign(Object.assign({}, myschema), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(tenantCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, myschema), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getTenantsByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(tenantResponseZodSchema) } });
exports.postTenantSchema = Object.assign(Object.assign({}, myschema), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertTenantZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(tenantResponseZodSchema) } });
exports.putTenantsSchema = Object.assign(Object.assign({}, myschema), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateTenantsZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(tenantCollectionResponseZodSchema) } });
exports.putTenantSchema = Object.assign(Object.assign({}, myschema), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getTenantsByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateTenantZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(tenantResponseZodSchema) } });
exports.deleteTenantSchema = Object.assign(Object.assign({}, myschema), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getTenantsByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted tenant',
            type: 'null',
        },
    } });
