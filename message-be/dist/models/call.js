"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const callSchema = new mongoose_1.Schema({
    caller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    conversation: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
    },
    callType: {
        type: String,
        enum: ['voice', 'video'],
        required: true,
    },
    status: {
        type: String,
        enum: ['incoming', 'ongoing', 'ended', 'missed'],
        default: 'incoming',
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
    },
    duration: {
        type: Number,
    },
}, {
    timestamps: true,
    versionKey: false,
});
callSchema.index({ caller: 1, startTime: -1 });
callSchema.index({ receiver: 1, startTime: -1 });
exports.default = (0, mongoose_1.model)('Call', callSchema);
//# sourceMappingURL=call.js.map