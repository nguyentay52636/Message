import { Request, Response } from 'express';
import Conversation from '../models/conversation';
import User from '../models/user';
import { Socket } from 'socket.io';
import { ResponseApi } from '../config/response';

interface CustomRequest extends Request {
  io?: Socket;
}

export const addConversation = async (req: CustomRequest, res: Response) => {
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
        return ResponseApi(res, 400, null, 'Personal conversation already exists');
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

export const getAllConversations = async (req: CustomRequest, res: Response) => {
  try {
    const conversations = await Conversation.find()
      .populate('members', 'username avatar status')
      .populate('groupAdmin', 'username')
      .populate('lastMessage')
      .sort({ lastUpdated: -1 });

    return ResponseApi(res, 200, conversations, 'All conversations fetched successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to fetch conversations: ${error.message}`);
  }
};

export const getConversationOfUser = async (req: CustomRequest, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return ResponseApi(res, 400, null, 'User ID is required');
    }

    const conversations = await Conversation.find({ members: userId })
      .populate('members', 'username avatar status')
      .populate('groupAdmin', 'username')
      .populate('lastMessage')
      .sort({ lastUpdated: -1 });

    if (!conversations.length) {
      return ResponseApi(res, 404, null, 'No conversations found for this user');
    }

    return ResponseApi(res, 200, conversations, 'User conversations fetched successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to fetch user conversations: ${error.message}`);
  }
};

export const updateConversation = async (req: CustomRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { groupName, groupAvatar, groupAdmin } = req.body;

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
      .populate('lastMessage');

    return ResponseApi(res, 200, populatedConversation, 'Conversation updated successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to update conversation: ${error.message}`);
  }
};

export const addMemberToConversation = async (req: CustomRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return ResponseApi(res, 400, null, 'User ID is required');
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
      .populate('lastMessage');

    return ResponseApi(res, 200, populatedConversation, 'Member added successfully');
  } catch (error: any) {
    return ResponseApi(res, 500, null, `Failed to add member: ${error.message}`);
  }
};


export const deleteConversation = async (req: CustomRequest, res: Response) => {
  try {
    const { conversationId } = req.params;

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