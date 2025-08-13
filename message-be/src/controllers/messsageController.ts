import { ResponseApi } from "../config/response";
import { Request, Response } from "express";
import { message } from "../models";
import { Socket } from "socket.io";

interface CustomRequest extends Request {
    io?: Socket;
  }
export const getMessages = async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    if( !conversationId ) { 
        return ResponseApi(res, 400, null, "Conversation ID is required");
     }
    try {
         const messages = await message.find({ conversation: conversationId });
         return ResponseApi(res, 200, messages, "Get messages success");
    }catch(error:any) { 
        return ResponseApi(res, 500, null, "Get messages failed");
    }
}
export const createMessageHandler = async (req: CustomRequest, res: Response) => {
    try {
      const { conversationId, senderId, content, messageType = 'text' } = req.body;
      const files = req.files ? (req.files as Express.Multer.File[]).map(file => ({
        url: file.path, 
        type: file.mimetype
      })) : [];
  
      if (!conversationId || !senderId || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Verify conversation exists
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
  
      const mediaUrl = files.length > 0 ? files[0].url : null; // Use first file as mediaUrl
      const message = new Message({
        sender: senderId,
        conversation: conversationId,
        content,
        messageType,
        mediaUrl,
        isRead: false,
        readBy: [],
      });
  
      await message.save();
  
      // Update conversation's lastMessage and lastUpdated
      conversation.lastMessage = message._id;
      conversation.lastUpdated = new Date();
      await conversation.save();
  
      // Emit message via Socket.IO to conversation members
      const populatedMessage = await Message.findById(message._id)
        .populate('sender', 'username')
        .populate('replyTo', 'content sender');
      req.io?.to(conversationId).emit('receiveMessage', {
        senderId,
        conversationId,
        content,
        messageType,
        mediaUrl,
        timestamp: message.createdAt,
        messageId: message._id,
        sender: populatedMessage.sender,
      });
  
      res.status(201).json(populatedMessage);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
  };