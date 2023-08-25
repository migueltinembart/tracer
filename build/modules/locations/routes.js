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
function locationsRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/', { schema: schemas_1.getLocationsSchema }, handlers_1.getIndexHandler);
        fastify.get('/:id', { schema: schemas_1.getByIdSchema }, handlers_1.getLocationByIdHandler);
        fastify.post('/', { schema: schemas_1.postLocationSchema }, handlers_1.postLocationHandler);
        fastify.put('/', { schema: schemas_1.putLocationsSchema }, handlers_1.putLocationsHandler);
        fastify.put('/:id', { schema: schemas_1.putLocationSchema }, handlers_1.putLocationHandler);
        fastify.delete('/:id', { schema: schemas_1.deleteLocationSchema }, handlers_1.deleteLocationHandler);
    });
}
exports.default = locationsRoutes;
