import { Server as SocketIOServer, Socket } from 'socket.io';
import mongoose from 'mongoose';
import Conversation from '../models/conversation';
import Message from '../models/message';
import Image from '../models/image';

type OnlineUser = { userId: string; socketId: string; profile?: any };

export const registerChatSocket = (
  io: SocketIOServer,
  socket: Socket,
  onlineUsersRef: { current: OnlineUser[] }
) => {
  const getOnlineUsers = () => onlineUsersRef.current;

  socket.on('chat:join', (payload: { userId: string; conversations?: string[] }) => {
    const { userId, conversations = [] } = payload || ({} as any);
    if (!userId) return;

    if (!getOnlineUsers().some(u => u.userId === userId)) {
      onlineUsersRef.current = [
        ...getOnlineUsers().filter(u => u.userId !== userId),
        { userId, socketId: socket.id },
      ];
      io.emit('getUsers', getOnlineUsers());
    }

    if (Array.isArray(conversations) && conversations.length > 0) {
      conversations.forEach((c) => {
        if (typeof c === 'string' && mongoose.Types.ObjectId.isValid(c)) {
          socket.join(c);
        }
      });
    }
  });

  socket.on('chat:joinConversation', (payload: { conversationId: string }) => {
    const { conversationId } = payload || ({} as any);
    if (conversationId && mongoose.Types.ObjectId.isValid(conversationId)) {
      socket.join(conversationId);
    }
  });

  socket.on('chat:leaveConversation', (payload: { conversationId: string }) => {
    const { conversationId } = payload || ({} as any);
    if (conversationId && mongoose.Types.ObjectId.isValid(conversationId)) {
      socket.leave(conversationId);
    }
  });

  socket.on('chat:typing', (payload: { conversationId: string; userId: string }) => {
    const { conversationId, userId } = payload || ({} as any);
    if (!conversationId || !userId) return;
    io.to(conversationId).except(socket.id).emit('chat:typing', { conversationId, userId });
  });

  socket.on('chat:stopTyping', (payload: { conversationId: string; userId: string }) => {
    const { conversationId, userId } = payload || ({} as any);
    if (!conversationId || !userId) return;
    io.to(conversationId).except(socket.id).emit('chat:stopTyping', { conversationId, userId });
  });

  socket.on('chat:send', async (payload: {
    conversationId: string;
    content: string;
    messageType?: 'text' | 'image' | 'file' | 'audio' | 'video';
    imageId?: string | null;
    senderId: string;
    receiverId?: string;
  }) => {
    try {
      const {
        conversationId,
        content,
        messageType = 'text',
        imageId,
        senderId,
        receiverId,
      } = payload || ({} as any);

      let conversationIdToUse = conversationId;
      let conversation = null as any;

      if (conversationIdToUse && mongoose.Types.ObjectId.isValid(conversationIdToUse)) {
        conversation = await Conversation.findById(conversationIdToUse);
      } else if (receiverId && mongoose.Types.ObjectId.isValid(receiverId)) {
        conversation = await Conversation.findOne({
          type: 'personal',
          members: { $all: [senderId, receiverId], $size: 2 },
        });
        if (!conversation) {
          conversation = new Conversation({ type: 'personal', members: [senderId, receiverId] });
          await conversation.save();
          conversationIdToUse = conversation._id.toString();
          socket.join(conversationIdToUse);
        } else {
          conversationIdToUse = conversation._id.toString();
        }
      } else {
        return;
      }

      if (!conversation) return;

      if (!conversation.members.includes(new mongoose.Types.ObjectId(senderId))) {
        return;
      }

      if (messageType === 'image' && imageId) {
        const image = await Image.findById(imageId);
        if (!image) return;
      }

      const message = new Message({
        sender: senderId,
        conversation: conversationIdToUse,
        content,
        messageType,
        imageId: messageType === 'image' ? imageId : null,
        mediaUrl: null,
        isRead: false,
        readBy: [],
      });
      await message.save();

      conversation.lastMessage = message._id as mongoose.Types.ObjectId;
      conversation.lastUpdated = new Date();
      await conversation.save();

      const populatedMessage = await Message.findById(message._id)
        .populate('sender', 'username avatar')
        .populate('replyTo', 'content sender')
        .populate('imageId', 'fileUrl mimeType');

      io.to(conversationIdToUse).emit('receiveMessage', {
        senderId,
        conversationId: conversationIdToUse,
        content,
        messageType,
        imageId: populatedMessage?.imageId,
        mediaUrl: null,
        timestamp: message.createdAt,
        messageId: message._id,
        sender: populatedMessage?.sender,
        image: populatedMessage?.imageId,
      });

      io.to(conversationIdToUse).emit('conversationUpdated', {
        conversationId: conversationIdToUse,
        lastMessage: populatedMessage,
        lastUpdated: conversation.lastUpdated,
      });
    } catch (_) {
      // swallow errors in socket handler
    }
  });

  socket.on('chat:read', async (payload: { conversationId: string; userId: string }) => {
    const { conversationId, userId } = payload || ({} as any);
    if (!conversationId || !userId) return;
    try {
      await Message.updateMany(
        { conversation: conversationId, isRead: false, sender: { $ne: userId } },
        { $set: { isRead: true }, $addToSet: { readBy: userId } }
      );
      io.to(conversationId).emit('messagesRead', { conversationId, userId });
    } catch (_) {}
  });
};


