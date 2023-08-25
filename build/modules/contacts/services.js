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
exports.deleteContact = exports.updateContact = exports.updateContacts = exports.insertOneContact = exports.SelectContactById = exports.selectAll = void 0;
const entities_1 = require("../../db/entities");
const db_1 = require("../../utils/db");
const drizzle_orm_1 = require("drizzle-orm");
function selectAll(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db
            .select()
            .from(entities_1.contacts)
            .where(data.offset ? (0, drizzle_orm_1.sql) `${entities_1.contacts.id} > ${data.offset}` : (0, drizzle_orm_1.sql) `${entities_1.contacts.id} > 0`)
            .orderBy(data.sort_order == 'asc'
            ? (0, drizzle_orm_1.asc)(data.sort_by ? entities_1.contacts[data.sort_by] : entities_1.contacts.id)
            : (0, drizzle_orm_1.desc)(data.sort_by ? entities_1.contacts[data.sort_by] : entities_1.contacts.id))
            .limit(data.limit);
        return result;
    });
}
exports.selectAll = selectAll;
function SelectContactById(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.select().from(entities_1.contacts).where((0, drizzle_orm_1.eq)(entities_1.contacts.id, data.id));
        return result[0];
    });
}
exports.SelectContactById = SelectContactById;
function insertOneContact(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.insert(entities_1.contacts).values(data).returning();
        return result[0];
    });
}
exports.insertOneContact = insertOneContact;
function updateContacts(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = data.map((contact) => __awaiter(this, void 0, void 0, function* () {
            return yield db_1.db
                .update(entities_1.contacts)
                .set(Object.assign(Object.assign({}, contact), { updatedAt: (0, drizzle_orm_1.sql) `NOW()` }))
                .where((0, drizzle_orm_1.eq)(entities_1.contacts.id, contact.id))
                .returning();
        }));
        return result[0];
    });
}
exports.updateContacts = updateContacts;
function updateContact(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.update(entities_1.contacts).set(data).where((0, drizzle_orm_1.eq)(entities_1.contacts.id, data.id)).returning();
        return result[0];
    });
}
exports.updateContact = updateContact;
function deleteContact(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.db.delete(entities_1.contacts).where((0, drizzle_orm_1.eq)(entities_1.contacts.id, data.id)).returning();
        return result[0];
    });
}
exports.deleteContact = deleteContact;
