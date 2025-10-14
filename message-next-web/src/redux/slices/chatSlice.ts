import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMessage, IConversation } from '@/types/types'

interface TypingState {
  conversationId: string;
  userId: string;
  isTyping: boolean;
}

interface ChatState {
  messages: { [conversationId: string]: IMessage[] }
  conversations: IConversation[]
  selectedConversation: string | null
  typingUsers: TypingState[]
  onlineUsers: string[]
  isLoading: boolean
  error: string | null
  unreadCounts: { [conversationId: string]: number }
}

const initialState: ChatState = {
  messages: {},
  conversations: [],
  selectedConversation: null,
  typingUsers: [],
  onlineUsers: [],
  isLoading: false,
  error: null,
  unreadCounts: {}
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<{ conversationId: string; messages: IMessage[] }>) => {
      state.messages[action.payload.conversationId] = action.payload.messages
    },
    
    addMessage: (state, action: PayloadAction<IMessage>) => {
      const message = action.payload
      if (!state.messages[message.conversationId]) {
        state.messages[message.conversationId] = []
      }
      state.messages[message.conversationId].push(message)
      
      // Update unread count if message is from another user
      if (message.sender !== state.selectedConversation) {
        state.unreadCounts[message.conversationId] = (state.unreadCounts[message.conversationId] || 0) + 1
      }
    },

    updateMessage: (state, action: PayloadAction<{ conversationId: string; messageId: string; updates: Partial<IMessage> }>) => {
      const { conversationId, messageId, updates } = action.payload
      const messages = state.messages[conversationId]
      if (messages) {
        const index = messages.findIndex(msg => msg.id === messageId)
        if (index !== -1) {
          messages[index] = { ...messages[index], ...updates }
        }
      }
    },

    deleteMessage: (state, action: PayloadAction<{ conversationId: string; messageId: string }>) => {
      const { conversationId, messageId } = action.payload
      const messages = state.messages[conversationId]
      if (messages) {
        state.messages[conversationId] = messages.filter(msg => msg.id !== messageId)
      }
    },

    updateMessageRead: (
      state,
      action: PayloadAction<{ conversationId: string; userId: string }>
    ) => {
      const { conversationId, userId } = action.payload;
      const messages = state.messages[conversationId]
      if (messages) {
        messages
          .filter((m) => m.conversationId === conversationId)
          .forEach((m) => {
            if (!m.readBy) m.readBy = [];
            if (!m.readBy.includes(userId)) {
              m.readBy.push(userId);
            }
            m.isRead = true;
          });
        state.unreadCounts[conversationId] = 0
      }
    },

    recallMessage: (state, action: PayloadAction<{ conversationId: string; messageId: string }>) => {
      const { conversationId, messageId } = action.payload
      const messages = state.messages[conversationId]
      if (messages) {
        const msg = messages.find((m) => m.id === messageId);
        if (msg) {
          msg.content = "Tin nhắn đã được thu hồi";
          msg.messageType = "text";
        }
      }
    },

    forwardMessage: (state, action: PayloadAction<IMessage>) => {
      const message = action.payload
      if (!state.messages[message.conversationId]) {
        state.messages[message.conversationId] = []
      }
      state.messages[message.conversationId].push(message)
    },

    setConversations: (state, action: PayloadAction<IConversation[]>) => {
      state.conversations = action.payload
    },

    addConversation: (state, action: PayloadAction<IConversation>) => {
      const existingIndex = state.conversations.findIndex(conv => conv._id === action.payload._id)
      if (existingIndex !== -1) {
        state.conversations[existingIndex] = action.payload
      } else {
        state.conversations.unshift(action.payload)
      }
    },

    updateConversation: (state, action: PayloadAction<{ id: string; updates: Partial<IConversation> }>) => {
      const index = state.conversations.findIndex(conv => conv._id === action.payload.id)
      if (index !== -1) {
        state.conversations[index] = { ...state.conversations[index], ...action.payload.updates }
      }
    },

    setSelectedConversation: (state, action: PayloadAction<string | null>) => {
      state.selectedConversation = action.payload
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

    setUnreadCount: (state, action: PayloadAction<{ conversationId: string; count: number }>) => {
      state.unreadCounts[action.payload.conversationId] = action.payload.count
    },

    incrementUnreadCount: (state, action: PayloadAction<string>) => {
      state.unreadCounts[action.payload] = (state.unreadCounts[action.payload] || 0) + 1
    },

    clearUnreadCount: (state, action: PayloadAction<string>) => {
      state.unreadCounts[action.payload] = 0
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },

    clearError: (state) => {
      state.error = null
    }
  },
});

export const {
  setMessages,
  addMessage,
  updateMessage,
  deleteMessage,
  updateMessageRead,
  recallMessage,
  forwardMessage,
  setConversations,
  addConversation,
  updateConversation,
  setSelectedConversation,
  setTyping,
  setOnlineUsers,
  setUnreadCount,
  incrementUnreadCount,
  clearUnreadCount,
  setLoading,
  setError,
  clearError
} = chatSlice.actions;

// Selectors
export const selectChat = (state: { chat: ChatState }) => state.chat

export default chatSlice.reducer;