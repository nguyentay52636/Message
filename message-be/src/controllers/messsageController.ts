import { Request, Response } from 'express';
import Message from '../models/message';
import Conversation from '../models/conversation';
import Image from '../models/image';
import { Server as SocketIOServer } from 'socket.io';
import { ResponseApi } from '../config/response';

interface CustomRequest extends Request {
  io?: SocketIOServer;
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

interface IImageWithFileUrl {
  _id: any;
  userId: string;
  base64: string | null;
  fileUrl?: string;
  mimeType: string;
  createdAt: Date;
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

    const imageData = {
      userId,
      base64: null,
      fileUrl: file.path,
      mimeType,
    };

    const image = new Image(imageData);
    await image.save();

    // Cast to our extended interface
    const savedImage = image.toObject() as IImageWithFileUrl;

    req.io?.emit('imageUploaded', {
      imageId: savedImage._id,
      userId,
      mimeType,
      fileUrl: savedImage.fileUrl,
    });

    return ResponseApi(res, 201, { imageId: savedImage._id, fileUrl: savedImage.fileUrl }, 'Image uploaded successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to upload image: ${error.message}`);
  }
};

export const createMessageHandler = async (req: CustomRequest, res: Response) => {
  const { conversationId, senderId, content, messageType = 'text', imageId } = req.body;
  if (!conversationId || !senderId || !content) {
    return ResponseApi(res, 400, null, 'Missing required fields');
  }

  try {
    const files = req.files ? (req.files as Express.Multer.File[]).map(file => ({
      url: file.path,
      type: file.mimetype
    })) : [];
    let mediaUrl: string | null = null;

    if (!conversationId || !senderId || !content) {
      return ResponseApi(res, 400, null, 'Missing required fields');
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return ResponseApi(res, 404, null, 'Conversation not found');
    }

    if (messageType === 'image' && imageId) {
      const image = await Image.findById(imageId);
      if (!image) {
        return ResponseApi(res, 404, null, 'Image not found');
      }
    } else if (messageType !== 'image') {
      mediaUrl = files.length > 0 ? files[0].url : null;
    }

    const message = new Message({
      sender: senderId,
      conversation: conversationId,
      content,
      messageType,
      imageId: messageType === 'image' ? imageId : null,
      mediaUrl: messageType !== 'image' ? mediaUrl : null,
      isRead: false,
      readBy: [],
      replyTo: undefined,
    });

    await message.save();

    // Update conversation with proper typing
    conversation.lastMessage = message._id as any;
    conversation.lastUpdated = new Date();
    await conversation.save();

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'username')
      .populate('replyTo', 'content sender')
      .populate('imageId', 'base64 fileUrl mimeType');

    if (!populatedMessage) {
      return ResponseApi(res, 500, null, 'Failed to populate message');
    }

    req.io?.to(conversationId).emit('receiveMessage', {
      senderId,
      conversationId,
      content,
      messageType,
      imageId: messageType === 'image' ? imageId : null,
      mediaUrl,
      timestamp: message.createdAt,
      messageId: message._id,
      sender: populatedMessage.sender,
      image: populatedMessage.imageId,
    });

    return ResponseApi(res, 201, populatedMessage, 'Message created successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to send message: ${error.message}`);
  }
};
