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
const handlers_1 = require("./handlers");
const schemas_1 = require("./schemas");
function contactGroupsRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/', { schema: schemas_1.getContactGroupsSchema }, handlers_1.getIndexHandler);
        fastify.get('/:id', { schema: schemas_1.getByIdSchema }, handlers_1.getContactGroupByIdHandler);
        fastify.post('/', { schema: schemas_1.postContactGroupSchema }, handlers_1.postContactGroupHandler);
        fastify.put('/', { schema: schemas_1.putContactGroupsSchema }, handlers_1.putContactGroupsHandler);
        fastify.put('/:id', { schema: schemas_1.putContactGroupSchema }, handlers_1.putContactGroupHandler);
        fastify.delete('/:id', { schema: schemas_1.deleteContactGroupSchema }, handlers_1.deleteContactGroupHandler);
    });
}
exports.default = contactGroupsRoutes;
