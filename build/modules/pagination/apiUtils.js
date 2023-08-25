"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginationQueryStrings = void 0;
const zod_1 = require("zod");
function createPaginationQueryStrings(schema) {
    const enums = schema.keyof();
    return zod_1.z
        .object({
        limit: zod_1.z.coerce.number().optional(),
        offset: zod_1.z.coerce.number().optional(),
        sort_by: enums.optional(),
        sort_order: zod_1.z.enum(['asc', 'desc']).optional().default('asc'),
    })
        .describe('Allowed querystrings');
}
exports.createPaginationQueryStrings = createPaginationQueryStrings;
