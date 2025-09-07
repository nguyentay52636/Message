"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConversationBetweenUsers = exports.deleteConversation = exports.addMemberToConversation = exports.updateConversation = exports.getConversationOfUser = exports.getAllConversations = exports.addConversation = void 0;
const conversation_1 = __importDefault(require("../models/conversation"));
const user_1 = __importDefault(require("../models/user"));
const response_1 = require("../config/response");
const addConversation = async (req, res) => {
    try {
        const { members, type, groupName, groupAvatar, groupAdmin } = req.body;
        if (!members || !type) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Members and type are required');
        }
        if (!Array.isArray(members) || members.length < 2) {
            return (0, response_1.ResponseApi)(res, 400, null, 'At least two members are required');
        }
        if (type === 'group' && (!groupName || !groupAdmin)) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Group name and admin are required for group conversations');
        }
        const users = await user_1.default.find({ _id: { $in: members } });
        if (users.length !== members.length) {
            return (0, response_1.ResponseApi)(res, 404, null, 'One or more members not found');
        }
        if (type === 'personal') {
            const existingConversation = await conversation_1.default.findOne({
                type: 'personal',
                members: { $all: members, $size: members.length },
            });
            if (existingConversation) {
                // Trả về hội thoại đã tồn tại thay vì báo lỗi
                const populatedConversation = await conversation_1.default.findById(existingConversation._id)
                    .populate('members', 'username avatar status')
                    .populate('groupAdmin', 'username')
                    .populate('lastMessage');
                return (0, response_1.ResponseApi)(res, 200, populatedConversation, 'Conversation already exists');
            }
        }
        const conversation = new conversation_1.default({
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
        const populatedConversation = await conversation_1.default.findById(conversation._id)
            .populate('members', 'username avatar status')
            .populate('groupAdmin', 'username')
            .populate('lastMessage');
        return (0, response_1.ResponseApi)(res, 201, populatedConversation, 'Conversation created successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to create conversation: ${error.message}`);
    }
};
exports.addConversation = addConversation;
const getAllConversations = async (req, res) => {
    try {
        const conversations = await conversation_1.default.find()
            .populate('members', 'username avatar status email')
            .populate('groupAdmin', 'username avatar')
            .populate('lastMessage', 'content type createdAt sender')
            .populate('lastMessage.sender', 'username avatar')
            .sort({ lastUpdated: -1 });
        return (0, response_1.ResponseApi)(res, 200, conversations, 'All conversations fetched successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to fetch conversations: ${error.message}`);
    }
};
exports.getAllConversations = getAllConversations;
const getConversationOfUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return (0, response_1.ResponseApi)(res, 400, null, 'User ID is required');
        }
        // Validate ObjectId format
        if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Invalid User ID format');
        }
        const conversations = await conversation_1.default.find({ members: userId })
            .populate('members', 'username avatar status')
            .populate('groupAdmin', 'username')
            .populate('lastMessage')
            .populate('lastMessage.sender', 'username avatar')
            .sort({ lastUpdated: -1 });
        if (!conversations.length) {
            return (0, response_1.ResponseApi)(res, 404, null, 'No conversations found for this user');
        }
        return (0, response_1.ResponseApi)(res, 200, conversations, 'User conversations fetched successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to fetch user conversations: ${error.message}`);
    }
};
exports.getConversationOfUser = getConversationOfUser;
const updateConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { groupName, groupAvatar, groupAdmin } = req.body;
        // Validate ObjectId format
        if (!/^[0-9a-fA-F]{24}$/.test(conversationId)) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Invalid Conversation ID format');
        }
        const conversation = await conversation_1.default.findById(conversationId);
        if (!conversation) {
            return (0, response_1.ResponseApi)(res, 404, null, 'Conversation not found');
        }
        if (conversation.type === 'personal') {
            return (0, response_1.ResponseApi)(res, 400, null, 'Cannot update group details for personal conversations');
        }
        if (groupName)
            conversation.groupName = groupName;
        if (groupAvatar)
            conversation.groupAvatar = groupAvatar;
        if (groupAdmin) {
            if (!conversation.members.includes(groupAdmin)) {
                return (0, response_1.ResponseApi)(res, 400, null, 'Group admin must be a member');
            }
            conversation.groupAdmin = groupAdmin;
        }
        conversation.lastUpdated = new Date();
        await conversation.save();
        req.io?.to(conversation.members.map((m) => m.toString())).emit('conversationUpdated', {
            conversationId,
            groupName: conversation.groupName,
            groupAvatar: conversation.groupAvatar,
            groupAdmin: conversation.groupAdmin,
        });
        const populatedConversation = await conversation_1.default.findById(conversationId)
            .populate('members', 'username avatar status')
            .populate('groupAdmin', 'username')
            .populate('lastMessage')
            .populate('lastMessage.sender', 'username avatar');
        return (0, response_1.ResponseApi)(res, 200, populatedConversation, 'Conversation updated successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to update conversation: ${error.message}`);
    }
};
exports.updateConversation = updateConversation;
const addMemberToConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { userId } = req.body;
        if (!userId) {
            return (0, response_1.ResponseApi)(res, 400, null, 'User ID is required');
        }
        // Validate ObjectId formats
        if (!/^[0-9a-fA-F]{24}$/.test(conversationId)) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Invalid Conversation ID format');
        }
        if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Invalid User ID format');
        }
        const conversation = await conversation_1.default.findById(conversationId);
        if (!conversation) {
            return (0, response_1.ResponseApi)(res, 404, null, 'Conversation not found');
        }
        if (conversation.type === 'personal') {
            return (0, response_1.ResponseApi)(res, 400, null, 'Cannot add members to personal conversations');
        }
        if (conversation.members.includes(userId)) {
            return (0, response_1.ResponseApi)(res, 400, null, 'User is already a member');
        }
        const user = await user_1.default.findById(userId);
        if (!user) {
            return (0, response_1.ResponseApi)(res, 404, null, 'User not found');
        }
        conversation.members.push(userId);
        conversation.lastUpdated = new Date();
        await conversation.save();
        req.io?.to(conversation.members.map((m) => m.toString())).emit('memberAdded', {
            conversationId,
            userId,
        });
        const populatedConversation = await conversation_1.default.findById(conversationId)
            .populate('members', 'username avatar status')
            .populate('groupAdmin', 'username')
            .populate('lastMessage')
            .populate('lastMessage.sender', 'username avatar');
        return (0, response_1.ResponseApi)(res, 200, populatedConversation, 'Member added successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to add member: ${error.message}`);
    }
};
exports.addMemberToConversation = addMemberToConversation;
const deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        if (!/^[0-9a-fA-F]{24}$/.test(conversationId)) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Invalid Conversation ID format');
        }
        const conversation = await conversation_1.default.findById(conversationId);
        if (!conversation) {
            return (0, response_1.ResponseApi)(res, 404, null, 'Conversation not found');
        }
        await conversation.deleteOne();
        req.io?.to(conversation.members.map((m) => m.toString())).emit('conversationDeleted', {
            conversationId,
        });
        return (0, response_1.ResponseApi)(res, 200, null, 'Conversation deleted successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to delete conversation: ${error.message}`);
    }
};
exports.deleteConversation = deleteConversation;
const getConversationBetweenUsers = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;
        if (!userId1 || !userId2) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Both user IDs are required');
        }
        // Validate ObjectId formats
        if (!/^[0-9a-fA-F]{24}$/.test(userId1) || !/^[0-9a-fA-F]{24}$/.test(userId2)) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Invalid User ID format');
        }
        // Tìm hội thoại cá nhân giữa 2 user
        const conversation = await conversation_1.default.findOne({
            type: 'personal',
            members: { $all: [userId1, userId2], $size: 2 }
        }).populate('members', 'username avatar status')
            .populate('lastMessage')
            .populate('lastMessage.sender', 'username avatar');
        if (!conversation) {
            return (0, response_1.ResponseApi)(res, 404, null, 'No conversation found between these users');
        }
        return (0, response_1.ResponseApi)(res, 200, conversation, 'Conversation found successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to find conversation: ${error.message}`);
    }
};
exports.getConversationBetweenUsers = getConversationBetweenUsers;
//# sourceMappingURL=conversationController.js.map