import { io } from "socket.io-client";
import { AppDispatch } from "@/redux/store/store";
import { addMessage, setTyping, setOnlineUsers } from "@/redux/slices/chatSlice";

const socket = io("http://localhost8000", { withCredentials: true });

export const initChatSocket = (dispatch: AppDispatch, userId: string) => {
  socket.emit("join", userId);

  socket.on("newMessage", (msg) => {
    dispatch(addMessage(msg));
  });

  socket.on("typing", ({ conversationId, userId, isTyping }) => {
    dispatch(setTyping({ conversationId, userId, isTyping }));
  });

  socket.on("onlineUsers", (users) => {
    dispatch(setOnlineUsers(users));
  });
};

export const sendMessage = (msg: any) => {
  socket.emit("sendMessage", msg);
};

export const sendTyping = (conversationId: string, userId: string, isTyping: boolean) => {
  socket.emit("typing", { conversationId, userId, isTyping });
};
