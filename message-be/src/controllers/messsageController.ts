import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Message from '../models/message';
import Conversation from '../models/conversation';
import Image from '../models/image';
import { Socket } from 'socket.io'; 
import { ResponseApi } from '../config/response';

interface CustomRequest extends Request {
  io?: Socket;
  user?: { id: string };
  file?: Express.Multer.File;
}

export const uploadImage = async (req: CustomRequest, res: Response) => {
  try {
    const { userId } = req.body;
    const file = req.file;

    if (!userId || !file) {
      return ResponseApi(res, 400, null, 'Missing userId or image file');
    }

    const mimeType = file.mimetype;
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(mimeType)) {
      return ResponseApi(res, 400, null, 'Unsupported image format');
    }

    const image = new Image({
      userId,
      base64: null,
      fileUrl: file.path,
      mimeType,
    });

    await image.save();

    req.io?.emit('imageUploaded', {
      imageId: image._id,
      userId,
      mimeType,
      fileUrl: image.fileUrl,
    });

    return ResponseApi(res, 201, { imageId: image._id, fileUrl: image.fileUrl }, 'Image uploaded successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to upload image: ${error.message}`);
  }
};

export const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    const { conversationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return ResponseApi(res, 400, null, 'Invalid conversation ID');
    }

    const messages = await Message.find({ conversation: conversationId })
      .populate('sender', 'username avatar')
      .populate('replyTo', 'content sender')
      .populate('imageId', 'fileUrl mimeType')
      .sort({ createdAt: 1 })
      .limit(50);

    return ResponseApi(res, 200, messages, 'Messages fetched successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to fetch messages: ${error.message}`);
  }
};

export const createMessageHandler = async (req: CustomRequest, res: Response) => {
  try {
    const { conversationId, content, messageType = 'text', imageId, senderId } = req.body;
    
    const userId = req.user?.id || senderId;

    if (!mongoose.Types.ObjectId.isValid(conversationId) || !userId || !content) {
      return ResponseApi(res, 400, null, 'Missing or invalid required fields');
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return ResponseApi(res, 404, null, 'Conversation not found');
    }

    if (!conversation.members.includes(new mongoose.Types.ObjectId(userId))) {
      return ResponseApi(res, 403, null, 'User is not a member of this conversation');
    }

    let mediaUrl: string | null = null;
    if (messageType === 'image' && imageId) {
      const image = await Image.findById(imageId);
      if (!image) {
        return ResponseApi(res, 404, null, 'Image not found');
      }
    } else if (messageType === 'file' && req.file) {
      mediaUrl = req.file.path;
    }

    const message = new Message({
      sender: userId,
      conversation: conversationId,
      content,
      messageType,
      imageId: messageType === 'image' ? imageId : null,
      mediaUrl: messageType === 'file' ? mediaUrl : null,
      isRead: false,
      readBy: [],
    });

    await message.save();

    // Cập nhật conversation với tin nhắn mới nhất và thời gian
    conversation.lastMessage = message._id as mongoose.Types.ObjectId;
    conversation.lastUpdated = new Date();
    await conversation.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'username avatar')
      .populate('replyTo', 'content sender')
      .populate('imageId', 'fileUrl mimeType');

    // Emit socket event để real-time
    req.io?.to(conversationId).emit('receiveMessage', {
      senderId: userId,
      conversationId,
      content,
      messageType,
      imageId: message.imageId,
      mediaUrl,
      timestamp: message.createdAt,
      messageId: message._id,
      sender: populatedMessage?.sender,
      image: populatedMessage?.imageId,
    });

    // Emit event cập nhật conversation
    req.io?.to(conversationId).emit('conversationUpdated', {
      conversationId,
      lastMessage: populatedMessage,
      lastUpdated: conversation.lastUpdated,
    });

    return ResponseApi(res, 201, populatedMessage, 'Message created successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to send message: ${error.message}`);
  }
};

export const createReplyMessage = async (req: CustomRequest, res: Response) => {
  try {
    const { conversationId, content, replyTo, messageType = 'text', imageId } = req.body;
    const senderId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(conversationId) || !senderId || !content || !replyTo) {
      return ResponseApi(res, 400, null, 'Missing or invalid required fields');
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return ResponseApi(res, 404, null, 'Conversation not found');
    }

    if (!conversation.members.includes(new mongoose.Types.ObjectId(senderId))) {
      return ResponseApi(res, 403, null, 'User is not a member of this conversation');
    }

    const parentMessage = await Message.findById(replyTo);
    if (!parentMessage) {
      return ResponseApi(res, 404, null, 'Parent message not found');
    }

    let mediaUrl: string | null = null;
    if (messageType === 'image' && imageId) {
      const image = await Image.findById(imageId);
      if (!image) {
        return ResponseApi(res, 404, null, 'Image not found');
      }
    } else if (messageType === 'file' && req.file) {
      mediaUrl = req.file.path;
    }

    const message = new Message({
      sender: senderId,
      conversation: conversationId,
      content,
      messageType,
      imageId: messageType === 'image' ? imageId : null,
      mediaUrl: messageType === 'file' ? mediaUrl : null,
      replyTo,
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

    req.io?.to(conversationId).emit('receiveMessage', {
      senderId,
      conversationId,
      content,
      messageType,
      imageId: message.imageId,
      mediaUrl,
      replyTo: populatedMessage?.replyTo,
      timestamp: message.createdAt,
      messageId: message._id,
      sender: populatedMessage?.sender,
      image: populatedMessage?.imageId,
    });

    return ResponseApi(res, 201, populatedMessage, 'Reply message created successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to send reply: ${error.message}`);
  }
};  
export const markMessagesAsRead = async (req: CustomRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { senderId } = req.body;
    const userId = req.user?.id || senderId;

    if (!userId) {
      return ResponseApi(res, 400, null, 'User ID is required');
    }

    await Message.updateMany(
      { conversation: conversationId, isRead: false, sender: { $ne: userId } },
      { $set: { isRead: true }, $addToSet: { readBy: userId } }
    );

    req.io?.to(conversationId).emit('messagesRead', { conversationId, userId });

    return ResponseApi(res, 200, null, 'Messages marked as read');
  } catch (err: any) {
    return ResponseApi(res, 500, null, err.message);
  }
};

export const recallMessage = async (req: CustomRequest, res: Response) => {
  const { messageId } = req.params;
  const userId = req.user?.id;

  const message = await Message.findById(messageId);
  if (!message) return ResponseApi(res, 404, null, "Message not found");
  if (message.sender.toString() !== userId) return ResponseApi(res, 403, null, "Not allowed");

  message.content = "Tin nhắn đã được thu hồi";
  message.messageType = "text";
  await message.save();

  req.io?.to(message.conversation.toString()).emit("messageRecalled", { messageId });

  return ResponseApi(res, 200, message, "Message recalled");
};
export const forwardMessage = async (req: CustomRequest, res: Response) => {
  const { messageId, targetConversationId } = req.body;
  const userId = req.user?.id;

  const original = await Message.findById(messageId);
  if (!original) return ResponseApi(res, 404, null, "Message not found");

  const forwarded = new Message({
    sender: userId,
    conversation: targetConversationId,
    content: original.content,
    messageType: original.messageType,
    mediaUrl: original.mediaUrl,
    imageId: original.imageId,
    replyTo: original._id,
  });

  await forwarded.save();
  req.io?.to(targetConversationId).emit("messageForwarded", forwarded);

  return ResponseApi(res, 201, forwarded, "Message forwarded");
};
 export const deleteMessage = async (req: CustomRequest, res: Response) => {
  const { messageId } = req.params;
try { 

  const message = await Message.findById(messageId);
  if (!message) return ResponseApi(res, 404, null, "Message not found");
 const data = await Message.findByIdAndDelete(messageId);
  return ResponseApi(res, 200, data, "Message deleted");
}catch(error: any){
  return ResponseApi(res, 500, null, error.message);
}
};

