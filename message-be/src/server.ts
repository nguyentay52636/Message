import app from './index';
import { createServer } from 'http';
import { integrateSocketWithExpress } from './socket/socketIntegration';

const PORT = process.env.PORT || 8000;

// Create HTTP server
const httpServer = createServer(app);

const io = integrateSocketWithExpress(app, httpServer);

httpServer.listen(PORT, () => {

});

export { io }; 