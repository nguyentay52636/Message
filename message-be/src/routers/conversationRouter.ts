import express from "express";
import { 
  addConversation, 
  addMemberToConversation, 
  deleteConversation, 
  getConversationOfUser, 
  getAllConversations,
  updateConversation,
  getConversationBetweenUsers
} from "../controllers/conversationController";

const Router = express.Router();

// Tạo hội thoại mới
Router.post("/", addConversation);

// Lấy tất cả hội thoại (cho admin)
Router.get("/", getAllConversations);

// Lấy hội thoại của user cụ thể
Router.get("/user/:userId", getConversationOfUser);

// Lấy hội thoại giữa 2 user (để kiểm tra xem đã có hội thoại chưa)
Router.get("/between/:userId1/:userId2", getConversationBetweenUsers);

// Cập nhật thông tin hội thoại
Router.put("/:conversationId", updateConversation);

// Xóa hội thoại
Router.delete("/:conversationId", deleteConversation);

// Thêm thành viên vào hội thoại nhóm
Router.post("/:conversationId/addMember", addMemberToConversation);

export default Router;