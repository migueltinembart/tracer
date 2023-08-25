"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTenantGroup = exports.updateTenantGroup = exports.updateTenantGroups = exports.insertOneTenantGroup = exports.SelectTenantGroupById = exports.selectAll = void 0;
const entities_1 = require("../../db/entities");
const db_1 = require("../../utils/db");
const drizzle_orm_1 = require("drizzle-orm");
function selectAll(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .select()
            .from(entities_1.tenantGroups)
            .where(data.offset ? (0, drizzle_orm_1.sql) `${entities_1.tenantGroups.id} > ${data.offset}` : (0, drizzle_orm_1.sql) `${entities_1.tenantGroups.id} > 0`)
            .orderBy(data.sort_order == 'asc'
            ? (0, drizzle_orm_1.asc)(data.sort_by ? entities_1.tenantGroups[data.sort_by] : entities_1.tenantGroups.id)
            : (0, drizzle_orm_1.desc)(data.sort_by ? entities_1.tenantGroups[data.sort_by] : entities_1.tenantGroups.id))
            .limit(data.limit);
        return result;
    });
}
exports.selectAll = selectAll;
function SelectTenantGroupById(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.select().from(entities_1.tenantGroups).where((0, drizzle_orm_1.eq)(entities_1.tenantGroups.id, data.id));
        return result[0];
    });
}
exports.SelectTenantGroupById = SelectTenantGroupById;
function insertOneTenantGroup(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.insert(entities_1.tenantGroups).values(data).returning();
        return result[0];
    });
}
exports.insertOneTenantGroup = insertOneTenantGroup;
function updateTenantGroups(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = data.map((tenantGroup) => __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db
                .update(entities_1.tenantGroups)
                .set(Object.assign(Object.assign({}, tenantGroup), { updatedAt: (0, drizzle_orm_1.sql) `NOW()` }))
                .where((0, drizzle_orm_1.eq)(entities_1.tenantGroups.id, tenantGroup.id))
                .returning();
        }));
        return result[0];
    });
}
exports.updateTenantGroups = updateTenantGroups;
function updateTenantGroup(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.update(entities_1.tenantGroups).set(data).where((0, drizzle_orm_1.eq)(entities_1.tenantGroups.id, data.id)).returning();
        return result[0];
    });
}
exports.updateTenantGroup = updateTenantGroup;
function deleteTenantGroup(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.delete(entities_1.tenantGroups).where((0, drizzle_orm_1.eq)(entities_1.tenantGroups.id, data.id)).returning();
        return result[0];
    });
}
exports.deleteTenantGroup = deleteTenantGroup;
