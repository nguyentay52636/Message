import express from "express";
import { 
  uploadImage, 
  getMessages, 
  createMessageHandler, 
  createReplyMessage,
  markMessagesAsRead,
  recallMessage,
  forwardMessage,
  deleteMessage,
  sendDirectMessage
} from "../controllers/messsageController";

const Router = express.Router();

// Upload ảnh
Router.post("/upload-image", uploadImage);

// Lấy tin nhắn của một hội thoại
Router.get("/:conversationId", getMessages);

// Gửi tin nhắn mới
Router.post("/send", createMessageHandler);

// Gửi tin nhắn trực tiếp (auto tạo hội thoại personal nếu thiếu)
Router.post("/send-direct", sendDirectMessage);

// Gửi tin nhắn trả lời
Router.post("/reply", createReplyMessage);

// Đánh dấu tin nhắn đã đọc
Router.put("/:conversationId/read", markMessagesAsRead);

// Thu hồi tin nhắn
Router.put("/recall/:messageId", recallMessage);

// Chuyển tiếp tin nhắn
Router.post("/forward", forwardMessage);

// Xóa tin nhắn
Router.delete("/:messageId", deleteMessage);

export default Router;