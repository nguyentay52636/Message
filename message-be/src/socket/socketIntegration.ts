import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { Application } from 'express';
import { initializeSockets } from './index';

export const integrateSocketWithExpress = (app: Application, httpServer: HTTPServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      methods: ["GET", "POST","PUT","DELETE","PATCH"],
      credentials: true 
    }
  });

  initializeSockets(io);

  return io;
};