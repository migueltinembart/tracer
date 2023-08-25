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
exports.deleteSiteGroupHandler = exports.putSiteGroupHandler = exports.putSiteGroupsHandler = exports.postSiteGroupHandler = exports.getSiteGroupByIdHandler = exports.getIndexHandler = void 0;
const services_1 = require("./services");
function getIndexHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.selectAll)(request.query);
        return result;
    });
}
exports.getIndexHandler = getIndexHandler;
function getSiteGroupByIdHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.SelectSiteGroupById)(request.params);
        if (!result) {
            reply.status(404).send();
        }
        else {
            reply.status(200).send(result);
        }
    });
}
exports.getSiteGroupByIdHandler = getSiteGroupByIdHandler;
function postSiteGroupHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.insertOneSiteGroup)(request.body);
        reply.status(201).send(result);
    });
}
exports.postSiteGroupHandler = postSiteGroupHandler;
function putSiteGroupsHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.updateSiteGroups)(request.body);
        reply.status(200).send(result);
    });
}
exports.putSiteGroupsHandler = putSiteGroupsHandler;
function putSiteGroupHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const combinedRequest = Object.assign(Object.assign({}, request.body), { id: request.params.id });
        const result = yield (0, services_1.updateSiteGroup)(combinedRequest);
        reply.status(200).send(result);
    });
}
exports.putSiteGroupHandler = putSiteGroupHandler;
function deleteSiteGroupHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.deleteSiteGroup)(request.params);
        if (!result) {
            reply.status(400).send();
        }
        else {
            reply.status(204).send('Successfully deleted siteGroup');
        }
    });
}
exports.deleteSiteGroupHandler = deleteSiteGroupHandler;
