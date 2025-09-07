"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['personal', 'group'],
        required: true,
    },
    members: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    groupName: { type: String },
    groupAvatar: { type: String },
    groupAdmin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    lastMessage: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Message',
        default: null,
    },
    lastUpdated: { type: Date, default: Date.now },
}, {
    timestamps: true,
    versionKey: false,
});
conversationSchema.index({ members: 1, lastUpdated: -1 });
exports.default = (0, mongoose_1.model)('Conversation', conversationSchema);
//# sourceMappingURL=conversation.js.map