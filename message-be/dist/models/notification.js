"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    recipient: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        enum: ['message', 'call', 'friend_request', 'group_invite', 'system'],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    relatedId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
}, {
    timestamps: true,
    versionKey: false,
});
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
exports.default = (0, mongoose_1.model)('Notification', notificationSchema);
//# sourceMappingURL=notification.js.map