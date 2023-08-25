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
exports.deleteDeviceHandler = exports.putDeviceHandler = exports.putDevicesHandler = exports.postDeviceHandler = exports.getDeviceByIdHandler = exports.getIndexHandler = void 0;
const services_1 = require("./services");
function getIndexHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.selectAll)(request.query);
        return result;
    });
}
exports.getIndexHandler = getIndexHandler;
function getDeviceByIdHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.SelectDeviceById)(request.params);
        if (!result) {
            reply.status(404).send();
        }
        else {
            reply.status(200).send(result);
        }
    });
}
exports.getDeviceByIdHandler = getDeviceByIdHandler;
function postDeviceHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.insertOneDevice)(request.body);
        reply.status(201).send(result);
    });
}
exports.postDeviceHandler = postDeviceHandler;
function putDevicesHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.updateDevices)(request.body);
        reply.status(200).send(result);
    });
}
exports.putDevicesHandler = putDevicesHandler;
function putDeviceHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const combinedRequest = Object.assign(Object.assign({}, request.body), { id: request.params.id });
        const result = yield (0, services_1.updateDevice)(combinedRequest);
        reply.status(200).send(result);
    });
}
exports.putDeviceHandler = putDeviceHandler;
function deleteDeviceHandler(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield (0, services_1.deleteDevice)(request.params);
        if (!result) {
            reply.status(400).send();
        }
        reply.status(204).send('Successfully deleted device');
    });
}
exports.deleteDeviceHandler = deleteDeviceHandler;
