"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messsageController_1 = require("../controllers/messsageController");
const Router = express_1.default.Router();
// Upload ảnh
Router.post("/upload-image", messsageController_1.uploadImage);
// Lấy tin nhắn của một hội thoại
Router.get("/:conversationId", messsageController_1.getMessages);
// Gửi tin nhắn mới
Router.post("/send", messsageController_1.createMessageHandler);
// Gửi tin nhắn trả lời
Router.post("/reply", messsageController_1.createReplyMessage);
// Đánh dấu tin nhắn đã đọc
Router.put("/:conversationId/read", messsageController_1.markMessagesAsRead);
// Thu hồi tin nhắn
Router.put("/recall/:messageId", messsageController_1.recallMessage);
// Chuyển tiếp tin nhắn
Router.post("/forward", messsageController_1.forwardMessage);
// Xóa tin nhắn
Router.delete("/:messageId", messsageController_1.deleteMessage);
exports.default = Router;
//# sourceMappingURL=messageRouter.js.map