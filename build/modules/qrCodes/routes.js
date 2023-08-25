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
function qrCodesRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/', { schema: schemas_1.getQrCodesSchema }, handlers_1.getIndexHandler);
        fastify.get('/:id', { schema: schemas_1.getByIdSchema }, handlers_1.getQrCodeByIdHandler);
        fastify.post('/', { schema: schemas_1.postQrCodeSchema }, handlers_1.postQrCodeHandler);
        fastify.put('/', { schema: schemas_1.putQrCodesSchema }, handlers_1.putQrCodesHandler);
        fastify.put('/:id', { schema: schemas_1.putQrCodeSchema }, handlers_1.putQrCodeHandler);
        fastify.delete('/:id', { schema: schemas_1.deleteQrCodeSchema }, handlers_1.deleteQrCodeHandler);
    });
}
exports.default = qrCodesRoutes;
