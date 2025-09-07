"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshSwaggerCache = exports.swaggerUiOptions = exports.swaggerUi = exports.swaggerSpec = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUi = swagger_ui_express_1.default;
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const swagger_config_1 = require("./swagger.config");
const swaggerDir = path_1.default.join(__dirname, './');
let cachedSwaggerSpec = null;
let lastCacheTime = 0;
const CACHE_DURATION = swagger_config_1.swaggerConfig.cache.duration;
const loadSwaggerSpecs = () => {
    try {
        // Load all YAML files dynamically
        const swaggerSpecs = fs_1.default
            .readdirSync(swaggerDir)
            .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'))
            .map(file => {
            try {
                const filePath = path_1.default.join(swaggerDir, file);
                const content = fs_1.default.readFileSync(filePath, 'utf8');
                if (!content.trim()) {
                    return null;
                }
                const spec = yamljs_1.default.parse(content);
                if (!spec || Object.keys(spec).length === 0) {
                    return null;
                }
                return spec;
            }
            catch (error) {
                console.warn(`Warning: Could not parse swagger file ${file}:`, error);
                return null;
            }
        })
            .filter(spec => spec !== null);
        // Merge specifications with config
        const swaggerSpec = {
            openapi: '3.0.3',
            info: {
                title: swagger_config_1.swaggerConfig.api.title,
                description: swagger_config_1.swaggerConfig.api.description,
                version: swagger_config_1.swaggerConfig.api.version,
                contact: swagger_config_1.swaggerConfig.api.contact,
                license: swagger_config_1.swaggerConfig.api.license,
            },
            servers: swagger_config_1.swaggerConfig.servers,
            tags: [],
            paths: {},
            components: {
                schemas: {},
                securitySchemes: {},
            },
        };
        // Merge tags, paths, and components from all specs
        swaggerSpecs.forEach(spec => {
            if (spec.tags) {
                swaggerSpec.tags = [...new Set([...swaggerSpec.tags, ...spec.tags])];
            }
            if (spec.paths) {
                Object.assign(swaggerSpec.paths, spec.paths);
            }
            if (spec.components?.schemas) {
                Object.assign(swaggerSpec.components.schemas, spec.components.schemas);
            }
            if (spec.components?.securitySchemes) {
                Object.assign(swaggerSpec.components.securitySchemes, spec.components.securitySchemes);
            }
        });
        return swaggerSpec;
    }
    catch (error) {
        console.error('Error loading swagger specs:', error);
        return null;
    }
};
// Get swagger spec with caching
const getSwaggerSpec = () => {
    const now = Date.now();
    // Return cached version if still valid
    if (cachedSwaggerSpec && (now - lastCacheTime) < CACHE_DURATION) {
        return cachedSwaggerSpec;
    }
    // Load fresh specs and update cache
    cachedSwaggerSpec = loadSwaggerSpecs();
    lastCacheTime = now;
    return cachedSwaggerSpec;
};
// Export the getter function and swagger UI
exports.swaggerSpec = getSwaggerSpec();
exports.swaggerUiOptions = swagger_config_1.swaggerConfig.ui;
const refreshSwaggerCache = () => {
    cachedSwaggerSpec = null;
    lastCacheTime = 0;
    return getSwaggerSpec();
};
exports.refreshSwaggerCache = refreshSwaggerCache;
//# sourceMappingURL=swagger.js.map