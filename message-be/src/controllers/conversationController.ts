import { Request, Response, RequestHandler } from 'express';
import Conversation from '../models/conversation';
import User from '../models/user';
import { Server as SocketIOServer } from 'socket.io';
import { ResponseApi } from '../config/response';

interface CustomRequest extends Request {
  io?: SocketIOServer;
}

export const addConversation: RequestHandler = async (req: CustomRequest, res: Response) => {
  try {
    const { members, type, groupName, groupAvatar, groupAdmin } = req.body;

    if (!members || !type) {
      return ResponseApi(res, 400, null, 'Members and type are required');
    }

    if (!Array.isArray(members) || members.length < 2) {
      return ResponseApi(res, 400, null, 'At least two members are required');
    }

    if (type === 'group' && (!groupName || !groupAdmin)) {
      return ResponseApi(res, 400, null, 'Group name and admin are required for group conversations');
    }

    const users = await User.find({ _id: { $in: members } });
    if (users.length !== members.length) {
      return ResponseApi(res, 404, null, 'One or more members not found');
    }

    if (type === 'personal') {
      const existingConversation = await Conversation.findOne({
        type: 'personal',
        members: { $all: members, $size: members.length },
      });
      if (existingConversation) {
        // Trả về hội thoại đã tồn tại thay vì báo lỗi
        const populatedConversation = await Conversation.findById(existingConversation._id)
          .populate('members', 'username avatar status')
          .populate('groupAdmin', 'username')
          .populate('lastMessage');
        
        return ResponseApi(res, 200, populatedConversation, 'Conversation already exists');
      }
    }

    const conversation = new Conversation({
      members,
      type,
      groupName: type === 'group' ? groupName : undefined,
      groupAvatar: type === 'group' ? groupAvatar : undefined,
      groupAdmin: type === 'group' ? groupAdmin : undefined,
    });

    await conversation.save();

    req.io?.to(members).emit('conversationCreated', {
      conversationId: conversation._id,
      type,
      members,
      groupName,
      groupAvatar,
      groupAdmin,
    });

    const populatedConversation = await Conversation.findById(conversation._id)
      .populate('members', 'username avatar status')
      .populate('groupAdmin', 'username')
      .populate('lastMessage');

    return ResponseApi(res, 201, populatedConversation, 'Conversation created successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to create conversation: ${error.message}`);
  }
};

export const getAllConversations: RequestHandler = async (req: CustomRequest, res: Response) => {
  try {
    const conversations = await Conversation.find()
      .populate('members', 'username avatar status email')
      .populate('groupAdmin', 'username avatar')
      .populate('lastMessage', 'content type createdAt sender')
      .populate('lastMessage.sender', 'username avatar')
      .sort({ lastUpdated: -1 });
    
    return ResponseApi(res, 200, conversations, 'All conversations fetched successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to fetch conversations: ${error.message}`);
  }
};

export const getConversationOfUser: RequestHandler = async (req: CustomRequest, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return ResponseApi(res, 400, null, 'User ID is required');
    }

    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      return ResponseApi(res, 400, null, 'Invalid User ID format');
    }

    const conversations = await Conversation.find({ members: userId })
      .populate('members', 'username avatar status lastSeen')
      .populate('groupAdmin', 'username')
      .populate('lastMessage')
      .populate('lastMessage.sender', 'username avatar lastSeen')
      .sort({ lastUpdated: -1 });

    if (!conversations.length) {
      return ResponseApi(res, 404, null, 'No conversations found for this user');
    }

    return ResponseApi(res, 200, conversations, 'User conversations fetched successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to fetch user conversations: ${error.message}`);
  }
};

export const updateConversation: RequestHandler = async (req: CustomRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { groupName, groupAvatar, groupAdmin } = req.body;

    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(conversationId)) {
      return ResponseApi(res, 400, null, 'Invalid Conversation ID format');
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return ResponseApi(res, 404, null, 'Conversation not found');
    }

    if (conversation.type === 'personal') {
      return ResponseApi(res, 400, null, 'Cannot update group details for personal conversations');
    }

    if (groupName) conversation.groupName = groupName;
    if (groupAvatar) conversation.groupAvatar = groupAvatar;
    if (groupAdmin) {
      if (!conversation.members.includes(groupAdmin)) {
        return ResponseApi(res, 400, null, 'Group admin must be a member');
      }
      conversation.groupAdmin = groupAdmin;
    }

    conversation.lastUpdated = new Date();
    await conversation.save();

    req.io?.to(conversation.members.map((m: any) => m.toString())).emit('conversationUpdated', {
      conversationId,
      groupName: conversation.groupName,
      groupAvatar: conversation.groupAvatar,
      groupAdmin: conversation.groupAdmin,
    });

    const populatedConversation = await Conversation.findById(conversationId)
      .populate('members', 'username avatar status')
      .populate('groupAdmin', 'username')
      .populate('lastMessage')
      .populate('lastMessage.sender', 'username avatar');

    return ResponseApi(res, 200, populatedConversation, 'Conversation updated successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to update conversation: ${error.message}`);
  }
};

export const addMemberToConversation: RequestHandler = async (req: CustomRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return ResponseApi(res, 400, null, 'User ID is required');
    }

    // Validate ObjectId formats
    if (!/^[0-9a-fA-F]{24}$/.test(conversationId)) {
      return ResponseApi(res, 400, null, 'Invalid Conversation ID format');
    }
    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      return ResponseApi(res, 400, null, 'Invalid User ID format');
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return ResponseApi(res, 404, null, 'Conversation not found');
    }

    if (conversation.type === 'personal') {
      return ResponseApi(res, 400, null, 'Cannot add members to personal conversations');
    }

    if (conversation.members.includes(userId)) {
      return ResponseApi(res, 400, null, 'User is already a member');
    }

    const user = await User.findById(userId);
    if (!user) {
      return ResponseApi(res, 404, null, 'User not found');
    }

    conversation.members.push(userId);
    conversation.lastUpdated = new Date();
    await conversation.save();

    req.io?.to(conversation.members.map((m: any) => m.toString())).emit('memberAdded', {
      conversationId,
      userId,
    });

    const populatedConversation = await Conversation.findById(conversationId)
      .populate('members', 'username avatar status')
      .populate('groupAdmin', 'username')
      .populate('lastMessage')
      .populate('lastMessage.sender', 'username avatar');

    return ResponseApi(res, 200, populatedConversation, 'Member added successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to add member: ${error.message}`);
  }
};


export const deleteConversation: RequestHandler = async (req: CustomRequest, res: Response) => {
  try {
    const { conversationId } = req.params;


    if (!/^[0-9a-fA-F]{24}$/.test(conversationId)) {
      return ResponseApi(res, 400, null, 'Invalid Conversation ID format');
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return ResponseApi(res, 404, null, 'Conversation not found');
    }

    await conversation.deleteOne();

    req.io?.to(conversation.members.map((m: any) => m.toString())).emit('conversationDeleted', {
      conversationId,
    });

    return ResponseApi(res, 200, null, 'Conversation deleted successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to delete conversation: ${error.message}`);
  }
};

export const getConversationBetweenUsers: RequestHandler = async (req: CustomRequest, res: Response) => {
  try {
    const { userId1, userId2 } = req.params;

    if (!userId1 || !userId2) {
      return ResponseApi(res, 400, null, 'Both user IDs are required');
    }

    // Validate ObjectId formats
    if (!/^[0-9a-fA-F]{24}$/.test(userId1) || !/^[0-9a-fA-F]{24}$/.test(userId2)) {
      return ResponseApi(res, 400, null, 'Invalid User ID format');
    }

    // Tìm hội thoại cá nhân giữa 2 user
    const conversation = await Conversation.findOne({
      type: 'personal',
      members: { $all: [userId1, userId2], $size: 2 }
    }).populate('members', 'username avatar status')
      .populate('lastMessage')
      .populate('lastMessage.sender', 'username avatar');

    if (!conversation) {
      return ResponseApi(res, 404, null, 'No conversation found between these users');
    }

    return ResponseApi(res, 200, conversation, 'Conversation found successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to find conversation: ${error.message}`);
  }
};