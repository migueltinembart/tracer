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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildServer = void 0;
const fastify_1 = __importDefault(require("fastify"));
const logger_1 = require("./logger");
const env_1 = require("../config/env");
const routes_1 = __importDefault(require("../modules/health/routes"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const routes_2 = __importDefault(require("../modules/sites/routes"));
const routes_3 = __importDefault(require("../modules/siteGroups/routes"));
const routes_4 = __importDefault(require("../modules/tenants/routes"));
const routes_5 = __importDefault(require("../modules/tenantGroups/routes"));
const routes_6 = __importDefault(require("../modules/contacts/routes"));
const routes_7 = __importDefault(require("../modules/contactGroups/routes"));
const routes_8 = __importDefault(require("../modules/locations/routes"));
const routes_9 = __importDefault(require("../modules/racks/routes"));
const routes_10 = __importDefault(require("../modules/deviceTemplates/routes"));
const routes_11 = __importDefault(require("../modules/devices/routes"));
const routes_12 = __importDefault(require("../modules/qrCodes/routes"));
const routes_13 = __importDefault(require("../modules/interfaces/routes"));
function buildServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, fastify_1.default)({
            logger: logger_1.logger,
        });
        logger_1.logger.debug(env_1.env, 'using env');
        yield app.register(swagger_1.default, {
            openapi: {
                info: {
                    title: 'Tracer',
                    version: '0.0.0',
                },
            },
        });
        yield app.register(swagger_ui_1.default, { routePrefix: 'docs' });
        // Register routes here
        yield app.register(routes_1.default, { prefix: 'api/status' });
        yield app.register(routes_2.default, { prefix: 'api/sites' });
        yield app.register(routes_3.default, { prefix: '/api/site-groups' });
        yield app.register(routes_4.default, { prefix: 'api/tenants' });
        yield app.register(routes_5.default, { prefix: 'api/tenant-groups' });
        yield app.register(routes_6.default, { prefix: 'api/contacts' });
        yield app.register(routes_7.default, { prefix: 'api/contact-groups' });
        yield app.register(routes_8.default, { prefix: 'api/locations' });
        yield app.register(routes_9.default, { prefix: 'api/racks' });
        yield app.register(routes_10.default, { prefix: 'api/device-templates' });
        yield app.register(routes_11.default, { prefix: 'api/devices' });
        yield app.register(routes_12.default, { prefix: 'api/qr' });
        yield app.register(routes_13.default, { prefix: 'api/interfaces' });
        yield app.ready();
        app.swagger();
        return app;
    });
}
exports.buildServer = buildServer;
