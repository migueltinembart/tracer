"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.tags = (0, pg_core_1.pgTable)('tags', {
    id: (0, pg_core_1.serial)('id').notNull(),
    name: (0, pg_core_1.varchar)('name'),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (tags) => {
    return {
        cpk: (0, pg_core_1.primaryKey)(tags.id),
        idIndex: (0, pg_core_1.uniqueIndex)('tags_name_index').on(tags.name),
    };
});
