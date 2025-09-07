"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.forwardMessage = exports.recallMessage = exports.markMessagesAsRead = exports.createReplyMessage = exports.createMessageHandler = exports.getMessages = exports.uploadImage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const message_1 = __importDefault(require("../models/message"));
const conversation_1 = __importDefault(require("../models/conversation"));
const image_1 = __importDefault(require("../models/image"));
const response_1 = require("../config/response");
const uploadImage = async (req, res) => {
    try {
        const { userId } = req.body;
        const file = req.file;
        if (!userId || !file) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Missing userId or image file');
        }
        const mimeType = file.mimetype;
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(mimeType)) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Unsupported image format');
        }
        const image = new image_1.default({
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
        return (0, response_1.ResponseApi)(res, 201, { imageId: image._id, fileUrl: image.fileUrl }, 'Image uploaded successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to upload image: ${error.message}`);
    }
};
exports.uploadImage = uploadImage;
const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(conversationId)) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Invalid conversation ID');
        }
        const messages = await message_1.default.find({ conversation: conversationId })
            .populate('sender', 'username avatar')
            .populate('replyTo', 'content sender')
            .populate('imageId', 'fileUrl mimeType')
            .sort({ createdAt: 1 })
            .limit(50);
        return (0, response_1.ResponseApi)(res, 200, messages, 'Messages fetched successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to fetch messages: ${error.message}`);
    }
};
exports.getMessages = getMessages;
const createMessageHandler = async (req, res) => {
    try {
        const { conversationId, content, messageType = 'text', imageId, senderId } = req.body;
        const userId = req.user?.id || senderId;
        if (!mongoose_1.default.Types.ObjectId.isValid(conversationId) || !userId || !content) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Missing or invalid required fields');
        }
        const conversation = await conversation_1.default.findById(conversationId);
        if (!conversation) {
            return (0, response_1.ResponseApi)(res, 404, null, 'Conversation not found');
        }
        if (!conversation.members.includes(new mongoose_1.default.Types.ObjectId(userId))) {
            return (0, response_1.ResponseApi)(res, 403, null, 'User is not a member of this conversation');
        }
        let mediaUrl = null;
        if (messageType === 'image' && imageId) {
            const image = await image_1.default.findById(imageId);
            if (!image) {
                return (0, response_1.ResponseApi)(res, 404, null, 'Image not found');
            }
        }
        else if (messageType === 'file' && req.file) {
            mediaUrl = req.file.path;
        }
        const message = new message_1.default({
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
        conversation.lastMessage = message._id;
        conversation.lastUpdated = new Date();
        await conversation.save();
        const populatedMessage = await message_1.default.findById(message._id)
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
        return (0, response_1.ResponseApi)(res, 201, populatedMessage, 'Message created successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to send message: ${error.message}`);
    }
};
exports.createMessageHandler = createMessageHandler;
const createReplyMessage = async (req, res) => {
    try {
        const { conversationId, content, replyTo, messageType = 'text', imageId } = req.body;
        const senderId = req.user?.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(conversationId) || !senderId || !content || !replyTo) {
            return (0, response_1.ResponseApi)(res, 400, null, 'Missing or invalid required fields');
        }
        const conversation = await conversation_1.default.findById(conversationId);
        if (!conversation) {
            return (0, response_1.ResponseApi)(res, 404, null, 'Conversation not found');
        }
        if (!conversation.members.includes(new mongoose_1.default.Types.ObjectId(senderId))) {
            return (0, response_1.ResponseApi)(res, 403, null, 'User is not a member of this conversation');
        }
        const parentMessage = await message_1.default.findById(replyTo);
        if (!parentMessage) {
            return (0, response_1.ResponseApi)(res, 404, null, 'Parent message not found');
        }
        let mediaUrl = null;
        if (messageType === 'image' && imageId) {
            const image = await image_1.default.findById(imageId);
            if (!image) {
                return (0, response_1.ResponseApi)(res, 404, null, 'Image not found');
            }
        }
        else if (messageType === 'file' && req.file) {
            mediaUrl = req.file.path;
        }
        const message = new message_1.default({
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
        conversation.lastMessage = message._id;
        conversation.lastUpdated = new Date();
        await conversation.save();
        const populatedMessage = await message_1.default.findById(message._id)
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
        return (0, response_1.ResponseApi)(res, 201, populatedMessage, 'Reply message created successfully');
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, `Failed to send reply: ${error.message}`);
    }
};
exports.createReplyMessage = createReplyMessage;
const markMessagesAsRead = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { senderId } = req.body;
        const userId = req.user?.id || senderId;
        if (!userId) {
            return (0, response_1.ResponseApi)(res, 400, null, 'User ID is required');
        }
        await message_1.default.updateMany({ conversation: conversationId, isRead: false, sender: { $ne: userId } }, { $set: { isRead: true }, $addToSet: { readBy: userId } });
        req.io?.to(conversationId).emit('messagesRead', { conversationId, userId });
        return (0, response_1.ResponseApi)(res, 200, null, 'Messages marked as read');
    }
    catch (err) {
        return (0, response_1.ResponseApi)(res, 500, null, err.message);
    }
};
exports.markMessagesAsRead = markMessagesAsRead;
const recallMessage = async (req, res) => {
    const { messageId } = req.params;
    const userId = req.user?.id;
    const message = await message_1.default.findById(messageId);
    if (!message)
        return (0, response_1.ResponseApi)(res, 404, null, "Message not found");
    if (message.sender.toString() !== userId)
        return (0, response_1.ResponseApi)(res, 403, null, "Not allowed");
    message.content = "Tin nhắn đã được thu hồi";
    message.messageType = "text";
    await message.save();
    req.io?.to(message.conversation.toString()).emit("messageRecalled", { messageId });
    return (0, response_1.ResponseApi)(res, 200, message, "Message recalled");
};
exports.recallMessage = recallMessage;
const forwardMessage = async (req, res) => {
    const { messageId, targetConversationId } = req.body;
    const userId = req.user?.id;
    const original = await message_1.default.findById(messageId);
    if (!original)
        return (0, response_1.ResponseApi)(res, 404, null, "Message not found");
    const forwarded = new message_1.default({
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
    return (0, response_1.ResponseApi)(res, 201, forwarded, "Message forwarded");
};
exports.forwardMessage = forwardMessage;
const deleteMessage = async (req, res) => {
    const { messageId } = req.params;
    try {
        const message = await message_1.default.findById(messageId);
        if (!message)
            return (0, response_1.ResponseApi)(res, 404, null, "Message not found");
        const data = await message_1.default.findByIdAndDelete(messageId);
        return (0, response_1.ResponseApi)(res, 200, data, "Message deleted");
    }
    catch (error) {
        return (0, response_1.ResponseApi)(res, 500, null, error.message);
    }
};
exports.deleteMessage = deleteMessage;
//# sourceMappingURL=messsageController.js.map