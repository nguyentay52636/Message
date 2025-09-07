"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
    },
    base64: {
        type: String,
        default: null,
    },
    fileUrl: {
        type: String,
        default: null,
    },
    mimeType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    versionKey: false,
});
imageSchema.index({ userId: 1, createdAt: -1 });
exports.default = (0, mongoose_1.model)('Image', imageSchema);
//# sourceMappingURL=image.js.map