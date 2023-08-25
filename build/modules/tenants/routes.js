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
function tenantsRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/', { schema: schemas_1.getTenantsSchema }, handlers_1.getIndexHandler);
        fastify.get('/:id', { schema: schemas_1.getByIdSchema }, handlers_1.getTenantByIdHandler);
        fastify.post('/', { schema: schemas_1.postTenantSchema }, handlers_1.postTenantHandler);
        fastify.put('/', { schema: schemas_1.putTenantsSchema }, handlers_1.putTenantsHandler);
        fastify.put('/:id', { schema: schemas_1.putTenantSchema }, handlers_1.putTenantHandler);
        fastify.delete('/:id', { schema: schemas_1.deleteTenantSchema }, handlers_1.deleteTenantHandler);
    });
}
exports.default = tenantsRoutes;
