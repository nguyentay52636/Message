import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

export interface OnlineUser {
  userId: string
  socketId: string
  profile?: any
}

export interface TypingUser {
  userId: string
  conversationId: string
}

interface SocketState {
  socket: Socket | null
  isConnected: boolean
  onlineUsers: OnlineUser[]
  typingUsers: TypingUser[]
  isLoading: boolean
  error: string | null
  currentConversationId: string | null
}

const initialState: SocketState = {
  socket: null,
  isConnected: false,
  onlineUsers: [],
  typingUsers: [],
  isLoading: false,
  error: null,
  currentConversationId: null
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<any | null>) => {
      state.socket = action.payload
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload
    },
    setOnlineUsers: (state, action: PayloadAction<OnlineUser[]>) => {
      state.onlineUsers = action.payload
    },
    addOnlineUser: (state, action: PayloadAction<OnlineUser>) => {
      const existingUser = state.onlineUsers.find(user => user.userId === action.payload.userId)
      if (!existingUser) {
        state.onlineUsers.push(action.payload)
      }
    },
    removeOnlineUser: (state, action: PayloadAction<string>) => {
      state.onlineUsers = state.onlineUsers.filter(user => user.userId !== action.payload)
    },
    addTypingUser: (state, action: PayloadAction<TypingUser>) => {
      const existingTyping = state.typingUsers.find(
        typing => typing.userId === action.payload.userId && 
        typing.conversationId === action.payload.conversationId
      )
      if (!existingTyping) {
        state.typingUsers.push(action.payload)
      }
    },
    removeTypingUser: (state, action: PayloadAction<TypingUser>) => {
      state.typingUsers = state.typingUsers.filter(
        typing => !(typing.userId === action.payload.userId && 
        typing.conversationId === action.payload.conversationId)
      )
    },
    clearTypingUsers: (state, action: PayloadAction<string>) => {
      state.typingUsers = state.typingUsers.filter(
        typing => typing.conversationId !== action.payload
      )
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    setCurrentConversation: (state, action: PayloadAction<string | null>) => {
      state.currentConversationId = action.payload
    }
  }
})

export const {
  setSocket,
  setConnectionStatus,
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  addTypingUser,
  removeTypingUser,
  clearTypingUsers,
  setLoading,
  setError,
  clearError,
  setCurrentConversation
} = socketSlice.actions

// Selectors
export const selectSocket = (state: { socket: SocketState }) => state.socket

export default socketSlice.reducer
