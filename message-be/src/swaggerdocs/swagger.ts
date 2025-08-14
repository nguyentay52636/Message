import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import fs from 'fs';
import { swaggerConfig } from './swagger.config';

const swaggerDir = path.join(__dirname, './');

let cachedSwaggerSpec: any = null;
let lastCacheTime = 0;
const CACHE_DURATION = swaggerConfig.cache.duration;

const loadSwaggerSpecs = () => {
  try {
    // Load all YAML files dynamically
    const swaggerSpecs = fs
      .readdirSync(swaggerDir)
      .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'))
      .map(file => {
        try {
          const filePath = path.join(swaggerDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          
          if (!content.trim()) {
            return null;
          }
          
          const spec = YAML.parse(content);
          
          if (!spec || Object.keys(spec).length === 0) {
            return null;
          }
          
          return spec;
        } catch (error) {
          console.warn(`Warning: Could not parse swagger file ${file}:`, error);
          return null;
        }
      })
      .filter(spec => spec !== null);

    // Merge specifications with config
    const swaggerSpec = {
      openapi: '3.0.3',
      info: {
        title: swaggerConfig.api.title,
        description: swaggerConfig.api.description,
        version: swaggerConfig.api.version,
        contact: swaggerConfig.api.contact,
        license: swaggerConfig.api.license,
      },
      servers: swaggerConfig.servers,
      tags: [] as any[],
      paths: {} as any,
      components: {
        schemas: {} as any,
        securitySchemes: {} as any,
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
  } catch (error) {
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
export const swaggerSpec = getSwaggerSpec();
export { swaggerUi };

export const swaggerUiOptions = swaggerConfig.ui;

export const refreshSwaggerCache = () => {
  cachedSwaggerSpec = null;
  lastCacheTime = 0;
  return getSwaggerSpec();
};