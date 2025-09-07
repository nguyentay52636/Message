"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contactSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    contact: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    nickname: { type: String, trim: true },
    isFavorite: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ['accepted', 'pending', 'blocked'],
        default: 'accepted',
    },
    friendSince: { type: Date, default: Date.now },
}, { timestamps: true, versionKey: false });
contactSchema.index({ user: 1, contact: 1 }, { unique: true });
exports.default = (0, mongoose_1.model)('Contact', contactSchema);
//# sourceMappingURL=contact.js.map