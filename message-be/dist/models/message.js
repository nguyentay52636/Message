"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    conversation: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'file', 'audio', 'video'],
        default: 'text',
    },
    mediaUrl: {
        type: String,
        default: null,
    },
    imageId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Image',
        default: null,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    readBy: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    replyTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Message',
    },
}, {
    timestamps: true,
    versionKey: false,
});
messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });
exports.default = (0, mongoose_1.model)('Message', messageSchema);
//# sourceMappingURL=message.js.map