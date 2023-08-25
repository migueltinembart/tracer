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
function sitesRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/', { schema: schemas_1.getSitesSchema }, handlers_1.getIndexHandler);
        fastify.get('/:id', { schema: schemas_1.getByIdSchema }, handlers_1.getSiteByIdHandler);
        fastify.post('/', { schema: schemas_1.postSiteSchema }, handlers_1.postSiteHandler);
        fastify.put('/', { schema: schemas_1.putSitesSchema }, handlers_1.putSitesHandler);
        fastify.put('/:id', { schema: schemas_1.putSiteSchema }, handlers_1.putSiteHandler);
        fastify.delete('/:id', { schema: schemas_1.deleteSiteSchema }, handlers_1.deleteSiteHandler);
    });
}
exports.default = sitesRoutes;
