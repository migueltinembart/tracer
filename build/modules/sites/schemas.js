"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSiteSchema = exports.putSiteSchema = exports.putSitesSchema = exports.postSiteSchema = exports.getByIdSchema = exports.getSitesSchema = exports.allowedQueryStrings = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const entities_1 = require("../../db/entities");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const siteResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(entities_1.sites);
const siteCollectionResponseZodSchema = zod_1.z.array(siteResponseZodSchema);
exports.allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(siteResponseZodSchema);
const insertSiteZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.sites).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateSiteZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.sites).omit({ id: true, updatedAt: true, createdAt: true });
const updateSitesZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(entities_1.sites).omit({ createdAt: true, updatedAt: true }));
const swaggerOpts = {
    tags: ['Sites'],
};
const getSitesByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getSitesSchema = Object.assign(Object.assign({}, swaggerOpts), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(exports.allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(siteCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getSitesByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(siteResponseZodSchema) } });
exports.postSiteSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertSiteZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(siteResponseZodSchema) } });
exports.putSitesSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateSitesZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(siteCollectionResponseZodSchema) } });
exports.putSiteSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getSitesByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateSiteZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(siteResponseZodSchema) } });
exports.deleteSiteSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getSitesByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted site',
            type: 'null',
        },
    } });
