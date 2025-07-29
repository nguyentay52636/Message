// server/swagger/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "WebRTC API",
      version: "1.0.0",
    },
    servers: [
      { url: 'http://localhost:8000' },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.ts'),      
    path.join(__dirname, './*.ts'),           
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
