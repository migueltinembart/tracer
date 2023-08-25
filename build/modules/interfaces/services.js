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
exports.deleteInterface = exports.updateInterface = exports.updateInterfaces = exports.insertOneInterface = exports.SelectInterfaceById = exports.selectAll = void 0;
const deviceManagement_1 = require("../../db/deviceManagement");
const db_1 = require("../../utils/db");
const drizzle_orm_1 = require("drizzle-orm");
function selectAll(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .select()
            .from(deviceManagement_1.interfaces)
            .where(data.offset ? (0, drizzle_orm_1.sql) `${deviceManagement_1.interfaces.id} > ${data.offset}` : (0, drizzle_orm_1.sql) `${deviceManagement_1.interfaces.id} > 0`)
            .orderBy(data.sort_order == 'asc'
            ? (0, drizzle_orm_1.asc)(data.sort_by ? deviceManagement_1.interfaces[data.sort_by] : deviceManagement_1.interfaces.id)
            : (0, drizzle_orm_1.desc)(data.sort_by ? deviceManagement_1.interfaces[data.sort_by] : deviceManagement_1.interfaces.id))
            .limit(data.limit);
        return result;
    });
}
exports.selectAll = selectAll;
function SelectInterfaceById(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.select().from(deviceManagement_1.interfaces).where((0, drizzle_orm_1.eq)(deviceManagement_1.interfaces.id, data.id));
        return result[0];
    });
}
exports.SelectInterfaceById = SelectInterfaceById;
function insertOneInterface(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.insert(deviceManagement_1.interfaces).values(data).returning();
        return result[0];
    });
}
exports.insertOneInterface = insertOneInterface;
function updateInterfaces(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = data.map((ctx) => __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db
                .update(deviceManagement_1.interfaces)
                .set(Object.assign(Object.assign({}, ctx), { updatedAt: (0, drizzle_orm_1.sql) `NOW()` }))
                .where((0, drizzle_orm_1.eq)(deviceManagement_1.interfaces.id, ctx.id))
                .returning();
        }));
        return result[0];
    });
}
exports.updateInterfaces = updateInterfaces;
function updateInterface(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.update(deviceManagement_1.interfaces).set(data).where((0, drizzle_orm_1.eq)(deviceManagement_1.interfaces.id, data.id)).returning();
        return result[0];
    });
}
exports.updateInterface = updateInterface;
function deleteInterface(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.delete(deviceManagement_1.interfaces).where((0, drizzle_orm_1.eq)(deviceManagement_1.interfaces.id, data.id)).returning();
        return result[0];
    });
}
exports.deleteInterface = deleteInterface;
