

 **Conversation APIs:**
- ✅ `POST /api/conversation` - Tạo hội thoại
- ✅ `GET /api/conversation/user/{userId}` - Lấy hội thoại của user
- ✅ `GET /api/conversation/between/{userId1}/{userId2}` - Kiểm tra hội thoại giữa 2 user
- ✅ `GET /api/conversation/all` - Lấy tất cả hội thoại (admin)

### **Message APIs:**
- ✅ `POST /api/message/send` - Gửi tin nhắn
- ✅ `GET /api/message/{conversationId}` - Lấy tin nhắn
- ✅ `PUT /api/message/{conversationId}/read` - Đánh dấu đã đọc
- ✅ `POST /api/message/reply` - Gửi tin nhắn trả lời
- ✅ `PUT /api/message/recall/{messageId}` - Thu hồi tin nhắn
- ✅ `POST /api/message/forward` - Chuyển tiếp tin nhắn
- ✅ `DELETE /api/message/{messageId}` - Xóa tin nhắn

1. ✅ **Tạo hội thoại** - Hoạt động tốt
2. ✅ **Gửi tin nhắn** - Hoạt động tốt
3. ✅ **Cập nhật conversation** - Hoạt động tốt (giống Zalo)
4. ✅ **Lấy tin nhắn** - Hoạt động tốt
5. ✅ **Đánh dấu đã đọc** - Hoạt động tốt
6. ✅ **Kiểm tra hội thoại** - Hoạt động tốt

