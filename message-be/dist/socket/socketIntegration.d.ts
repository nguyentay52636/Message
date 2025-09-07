import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Application } from 'express';
export declare const integrateSocketWithExpress: (app: Application, httpServer: HTTPServer) => SocketIOServer<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
//# sourceMappingURL=socketIntegration.d.ts.map