"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQrCodeSchema = exports.putQrCodeSchema = exports.putQrCodesSchema = exports.postQrCodeSchema = exports.getByIdSchema = exports.getQrCodesSchema = exports.allowedQueryStrings = void 0;
const drizzle_zod_1 = require("drizzle-zod");
const deviceManagement_1 = require("../../db/deviceManagement");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const zod_1 = require("zod");
const apiUtils_1 = require("../../modules/pagination/apiUtils");
// zod schemas here
const qrCodeResponseZodSchema = (0, drizzle_zod_1.createSelectSchema)(deviceManagement_1.qrCodes);
const qrCodeCollectionResponseZodSchema = zod_1.z.array(qrCodeResponseZodSchema);
exports.allowedQueryStrings = (0, apiUtils_1.createPaginationQueryStrings)(qrCodeResponseZodSchema);
const insertQrCodeZodSchema = (0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.qrCodes).omit({
    id: true,
    updatedAt: true,
    createdAt: true,
});
const updateQrCodeZodSchema = (0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.qrCodes).omit({ id: true, updatedAt: true, createdAt: true });
const updateQrCodesZodSchema = zod_1.z.array((0, drizzle_zod_1.createInsertSchema)(deviceManagement_1.qrCodes).omit({ createdAt: true, updatedAt: true }));
const swaggerOpts = {
    tags: ['QR Codes'],
};
const getQrCodesByIdZodSchema = zod_1.z
    .object({
    id: zod_1.z.coerce.number(),
})
    .describe('Takes an id as a parameter');
exports.getQrCodesSchema = Object.assign(Object.assign({}, swaggerOpts), { querystring: (0, zod_to_json_schema_1.zodToJsonSchema)(exports.allowedQueryStrings), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(qrCodeCollectionResponseZodSchema) } });
exports.getByIdSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getQrCodesByIdZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(qrCodeResponseZodSchema) } });
exports.postQrCodeSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(insertQrCodeZodSchema), response: { 201: (0, zod_to_json_schema_1.zodToJsonSchema)(qrCodeResponseZodSchema) } });
exports.putQrCodesSchema = Object.assign(Object.assign({}, swaggerOpts), { body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateQrCodesZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(qrCodeCollectionResponseZodSchema) } });
exports.putQrCodeSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getQrCodesByIdZodSchema), body: (0, zod_to_json_schema_1.zodToJsonSchema)(updateQrCodeZodSchema), response: { 200: (0, zod_to_json_schema_1.zodToJsonSchema)(qrCodeResponseZodSchema) } });
exports.deleteQrCodeSchema = Object.assign(Object.assign({}, swaggerOpts), { params: (0, zod_to_json_schema_1.zodToJsonSchema)(getQrCodesByIdZodSchema), response: {
        204: {
            description: 'Successfully deleted qrCode',
            type: 'null',
        },
    } });
