import { Server as SocketIOServer } from 'socket.io';
import { registerChatSocket } from './chatSocket';

type OnlineUser = { userId: string; socketId: string; profile?: any };

export const initializeSockets = (io: SocketIOServer) => {
  const onlineUsersRef: { current: OnlineUser[] } = { current: [] };

  io.on('connection', (socket) => {
    registerChatSocket(io, socket, onlineUsersRef);
  });
};


