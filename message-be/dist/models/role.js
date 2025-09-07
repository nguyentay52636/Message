"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    permissions: [
        {
            type: String,
            required: true,
        },
    ],
}, {
    timestamps: true,
    versionKey: false,
});
roleSchema.index({ name: 1 });
exports.default = (0, mongoose_1.model)('Role', roleSchema);
//# sourceMappingURL=role.js.map