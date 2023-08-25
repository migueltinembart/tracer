"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSiteGroupSchema = exports.putSiteGroupSchema = exports.putSiteGroupsSchema = exports.postSiteGroupSchema = exports.getByIdSchema = exports.getSiteGroupSchema = exports.allowedQueryStrings = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const entities_1 = require("../../db/entities");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const siteGroupResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(entities_1.siteGroups);
const siteGroupCollectionResponseZodSchema = zod_1.z.array(siteGroupResponseZodSchema);
exports.allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(siteGroupResponseZodSchema);
const insertsiteGroupZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.siteGroups).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateSiteGroupZodSchema = (0, drizzle_zod_1.createInsertSchema)(entities_1.siteGroups).omit({ id: true, updatedAt: true, createdAt: true });
const updateSiteGroupsZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(entities_1.siteGroups).omit({ createdAt: true, updatedAt: true }));
const myschema = {
    tags: ['Site Groups'],
};
const getSiteGroupsByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getSiteGroupSchema = Object.assign(Object.assign({}, myschema), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(exports.allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(siteGroupCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, myschema), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getSiteGroupsByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(siteGroupResponseZodSchema) } });
exports.postSiteGroupSchema = Object.assign(Object.assign({}, myschema), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertsiteGroupZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(siteGroupResponseZodSchema) } });
exports.putSiteGroupsSchema = Object.assign(Object.assign({}, myschema), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateSiteGroupsZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(siteGroupCollectionResponseZodSchema) } });
exports.putSiteGroupSchema = Object.assign(Object.assign({}, myschema), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getSiteGroupsByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateSiteGroupZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(siteGroupResponseZodSchema) } });
exports.deleteSiteGroupSchema = Object.assign(Object.assign({}, myschema), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getSiteGroupsByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted siteGroup',
            type: 'null',
        },
    } });
