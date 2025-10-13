import { IMessage } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface TypingState {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

interface ChatState {
  messages: IMessage[];
  typingUsers: TypingState[];
  onlineUsers: string[];
}

const initialState: ChatState = {
  messages: [],
  typingUsers: [],
  onlineUsers: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
  
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },

 
    updateMessageRead: (
      state,
      action: PayloadAction<{ conversationId: string; userId: string }>
    ) => {
      const { conversationId, userId } = action.payload;
      state.messages
        .filter((m) => m.conversationId === conversationId)
        .forEach((m) => {
          if (!m.readBy) m.readBy = [];
          if (!m.readBy.includes(userId)) {
            m.readBy.push(userId);
          }
          m.isRead = true;
        });
    },

    recallMessage: (state, action: PayloadAction<string>) => {
      const messageId = action.payload;
      const msg = state.messages.find((m) => m.id === messageId);
      if (msg) {
        msg.content = "Tin nhắn đã được thu hồi";
        msg.messageType = "text";
      }
    },

 
    forwardMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },

    setTyping: (
      state,
      action: PayloadAction<{ conversationId: string; userId: string; isTyping: boolean }>
    ) => {
      const { conversationId, userId, isTyping } = action.payload;
      const existing = state.typingUsers.find(
        (t) => t.conversationId === conversationId && t.userId === userId
      );

      if (isTyping) {
        if (!existing) {
          state.typingUsers.push({ conversationId, userId, isTyping });
        }
      } else {
        state.typingUsers = state.typingUsers.filter(
          (t) => !(t.conversationId === conversationId && t.userId === userId)
        );
      }
    },

 
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const {
  addMessage,
  updateMessageRead,
  recallMessage,
  forwardMessage,
  setTyping,
  setOnlineUsers,
} = chatSlice.actions;

export default chatSlice.reducer;
