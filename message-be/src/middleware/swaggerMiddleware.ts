import { Request, Response, NextFunction } from 'express';
import compression from 'compression';

// Middleware to optimize Swagger performance
export const swaggerOptimization = (req: Request, res: Response, next: NextFunction) => {
  // Add cache headers for Swagger UI assets
  if (req.path.startsWith('/api-docs')) {
    // Cache static assets for 1 hour
    res.set('Cache-Control', 'public, max-age=3600');
  }
  next();
};

// Middleware to handle Swagger requests efficiently
export const swaggerRequestHandler = (req: Request, res: Response, next: NextFunction) => {
  // Add request timeout for Swagger operations
  req.setTimeout(30000); // 30 seconds
  
  // Add performance headers
  res.set('X-Response-Time', '0ms');
  
  next();
};

// Middleware to compress Swagger responses
export const swaggerCompression = compression({
  filter: (req: Request, res: Response) => {
    // Only compress Swagger-related requests
    if (req.path.startsWith('/api-docs')) {
      return compression.filter(req, res);
    }
    return false;
  },
  level: 6, // Balanced compression level
  threshold: 1024, // Only compress responses larger than 1KB
}); 