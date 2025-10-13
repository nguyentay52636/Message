import { Request, Response, NextFunction } from 'express';
import { Server as SocketIOServer } from 'socket.io';

declare global {
  namespace Express {
    interface Request {
      io?: SocketIOServer;
    }
  }
}

export const attachSocket = (req: Request, _res: Response, next: NextFunction) => {
  const io = req.app.get('io') as SocketIOServer | undefined;
  if (io) {
    req.io = io;
  }
  next();
};


