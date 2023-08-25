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
exports.deleteTenantGroupHandler = exports.putTenantGroupHandler = exports.putTenantGroupsHandler = exports.postTenantGroupHandler = exports.getTenantGroupByIdHandler = exports.getIndexHandler = void 0;
const services_1 = require("./services");
function getIndexHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.selectAll)(request.query);
        return result;
    });
}
exports.getIndexHandler = getIndexHandler;
function getTenantGroupByIdHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.SelectTenantGroupById)(request.params);
        if (!result) {
            reply.status(404).send();
        }
        else {
            reply.status(200).send(result);
        }
    });
}
exports.getTenantGroupByIdHandler = getTenantGroupByIdHandler;
function postTenantGroupHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.insertOneTenantGroup)(request.body);
        reply.status(201).send(result);
    });
}
exports.postTenantGroupHandler = postTenantGroupHandler;
function putTenantGroupsHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.updateTenantGroups)(request.body);
        reply.status(200).send(result);
    });
}
exports.putTenantGroupsHandler = putTenantGroupsHandler;
function putTenantGroupHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const combinedRequest = Object.assign(Object.assign({}, request.body), { id: request.params.id });
        const result = yield (0, services_1.updateTenantGroup)(combinedRequest);
        reply.status(200).send(result);
    });
}
exports.putTenantGroupHandler = putTenantGroupHandler;
function deleteTenantGroupHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.deleteTenantGroup)(request.params);
        if (!result) {
            reply.status(400).send();
        }
        else {
            reply.status(204).send('Successfully deleted tenantGroup');
        }
    });
}
exports.deleteTenantGroupHandler = deleteTenantGroupHandler;
