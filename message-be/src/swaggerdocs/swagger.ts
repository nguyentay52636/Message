import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import fs from 'fs';

const swaggerDir = path.join(__dirname, './');

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
      return null;
    }
  })
  .filter(spec => spec !== null);

// Merge specifications
const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Chat Zalo API',
    description: 'API quản lý người dùng, hội thoại và tin nhắn trong ứng dụng chat tương tự Zalo',
    version: '1.0.0',
  },
  servers: [
    { url: 'http://localhost:8000', description: 'Local server' },
  ],
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


export { swaggerSpec, swaggerUi };