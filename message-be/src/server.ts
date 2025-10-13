import app from './index';
import { createServer } from 'http';
import { integrateSocketWithExpress } from './socket/socketIntegration';

const PORT = process.env.PORT || 8000;

const httpServer = createServer(app);

const io = integrateSocketWithExpress(app, httpServer);
// Make io available to Express requests
app.set('io', io);

httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export { io }; 