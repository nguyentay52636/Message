"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blockedUserSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    blockedUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reason: { type: String },
    createdAt: { type: Date, default: Date.now },
}, {
    versionKey: false,
});
blockedUserSchema.index({ user: 1, blockedUser: 1 }, { unique: true });
exports.default = (0, mongoose_1.model)('BlockedUser', blockedUserSchema);
//# sourceMappingURL=blockUser.js.map