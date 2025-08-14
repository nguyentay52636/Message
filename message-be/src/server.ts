import app from './index';
import { createServer } from 'http';
import { integrateSocketWithExpress } from './socket/socketIntegration';

const PORT = process.env.PORT || 8000;

// Create HTTP server
const httpServer = createServer(app);

// Integrate Socket.IO
const io = integrateSocketWithExpress(app, httpServer);

// Start server
httpServer.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}`);
  // console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  // console.log(`Socket.IO is integrated and ready`);
});

// Export io instance for use in other parts of the application
export { io }; 