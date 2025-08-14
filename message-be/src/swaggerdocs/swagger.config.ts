// Swagger configuration for better performance
export const swaggerConfig = {
  // Cache settings
  cache: {
    duration: 5 * 60 * 1000, // 5 minutes
    maxSize: 100, // Maximum number of cached items
  },
  
  // UI Options
  ui: {
    explorer: true,
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .scheme-container { margin: 0 0 20px 0 }
      .swagger-ui .info { margin: 20px 0 }
    `,
    customSiteTitle: 'Chat Zalo API Documentation',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
      tryItOutEnabled: true,
      requestInterceptor: (req: any) => {
        // Add request timeout
        req.timeout = 30000; // 30 seconds
        return req;
      },
      responseInterceptor: (res: any) => {
        // Add response processing if needed
        return res;
      },
      // Performance optimizations
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 1,
      displayRequestDuration: true,
      displayOperationId: false,
      // Better error handling
      onComplete: () => {
        console.log('Swagger UI loaded successfully');
      },
      onFailure: (data: any) => {
        console.error('Swagger UI failed to load:', data);
      }
    }
  },
  
  // API Documentation settings
  api: {
    title: 'Chat Zalo API',
    description: 'API quản lý người dùng, hội thoại và tin nhắn trong ứng dụng chat tương tự Zalo',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@example.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  
  // Server configurations
  servers: [
    { 
      url: 'http://localhost:8000', 
      description: 'Local Development Server' 
    },
    { 
      url: 'https://api.example.com', 
      description: 'Production Server' 
    }
  ]
}; 