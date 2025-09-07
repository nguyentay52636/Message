"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversationController_1 = require("../controllers/conversationController");
const Router = express_1.default.Router();
// Tạo hội thoại mới
Router.post("/", conversationController_1.addConversation);
// Lấy tất cả hội thoại (cho admin)
Router.get("/", conversationController_1.getAllConversations);
// Lấy hội thoại của user cụ thể
Router.get("/user/:userId", conversationController_1.getConversationOfUser);
// Lấy hội thoại giữa 2 user (để kiểm tra xem đã có hội thoại chưa)
Router.get("/between/:userId1/:userId2", conversationController_1.getConversationBetweenUsers);
// Cập nhật thông tin hội thoại
Router.put("/:conversationId", conversationController_1.updateConversation);
// Xóa hội thoại
Router.delete("/:conversationId", conversationController_1.deleteConversation);
// Thêm thành viên vào hội thoại nhóm
Router.post("/:conversationId/addMember", conversationController_1.addMemberToConversation);
exports.default = Router;
//# sourceMappingURL=conversationRouter.js.map