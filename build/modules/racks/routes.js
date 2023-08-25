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
function racksRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/', { schema: schemas_1.getRacksSchema }, handlers_1.getIndexHandler);
        fastify.get('/:id', { schema: schemas_1.getByIdSchema }, handlers_1.getRackByIdHandler);
        fastify.post('/', { schema: schemas_1.postRackSchema }, handlers_1.postRackHandler);
        fastify.put('/', { schema: schemas_1.putRacksSchema }, handlers_1.putRacksHandler);
        fastify.put('/:id', { schema: schemas_1.putRackSchema }, handlers_1.putRackHandler);
        fastify.delete('/:id', { schema: schemas_1.deleteRackSchema }, handlers_1.deleteRackHandler);
    });
}
exports.default = racksRoutes;
