import { Socket } from 'socket.io-client'
import { AppDispatch } from '@/redux/store/store'
import { 
  addMessage, 
  updateMessageRead, 
  addConversation, 
  updateConversation,
  setTyping,
  setOnlineUsers
} from '@/redux/slices/chatSlice'
import { 
  setOnlineUsers as setSocketOnlineUsers,
  addTypingUser,
  removeTypingUser
} from '@/redux/slices/socketSlice'
import { IMessage } from '@/types/types'

export interface MessageData {
  conversationId: string
  content: string
  messageType?: 'text' | 'image' | 'file' | 'audio' | 'video'
  imageId?: string | null
  senderId: string
  receiverId?: string
}

export interface TypingData {
  conversationId: string
  userId: string
}

export interface ReadData {
  conversationId: string
  userId: string
}

export class SocketService {
  private socket: Socket | null = null
  private dispatch: AppDispatch

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch
  }

  setSocket(socket: Socket | null) {
    this.socket = socket
    this.setupEventListeners()
  }

  private setupEventListeners() {
    if (!this.socket) return

    // Online users
    this.socket.on('getUsers', (users: any[]) => {
      console.log('Received online users:', users)
      this.dispatch(setSocketOnlineUsers(users))
      this.dispatch(setOnlineUsers(users.map(u => u.userId)))
    })

    // Messages
    this.socket.on('receiveMessage', (messageData: any) => {
      console.log('Received message:', messageData)
      const message: IMessage = {
        id: messageData.messageId,
        content: messageData.content,
        sender: messageData.senderId,
        conversationId: messageData.conversationId,
        messageType: messageData.messageType || 'text',
        isRead: false,
        readBy: [],
        imageId: messageData.imageId,
        mediaUrl: messageData.mediaUrl  
      }
      this.dispatch(addMessage(message))
    })

    // Conversation updates
    this.socket.on('conversationUpdated', (conversationData: any) => {
      console.log('Conversation updated:', conversationData)
      this.dispatch(updateConversation({
        id: conversationData.conversationId,
        updates: {
          lastMessage: conversationData.lastMessage,
          lastUpdated: conversationData.lastUpdated
        }
      }))
    })

    // Message read status
    this.socket.on('messagesRead', (data: ReadData) => {
      console.log('Messages read:', data)
      this.dispatch(updateMessageRead(data))
    })

    // Typing indicators
    this.socket.on('chat:typing', (data: TypingData) => {
      console.log('User typing:', data)
      this.dispatch(addTypingUser(data))
      this.dispatch(setTyping({ ...data, isTyping: true }))
    })

    this.socket.on('chat:stopTyping', (data: TypingData) => {
      console.log('User stopped typing:', data)
      this.dispatch(removeTypingUser(data))
      this.dispatch(setTyping({ ...data, isTyping: false }))
    })
  }

  // Socket emit methods
  joinChat(userId: string, conversations: string[] = []) {
    if (this.socket) {
      console.log('Joining chat for user:', userId)
      this.socket.emit('chat:join', { userId, conversations })
    }
  }

  joinConversation(conversationId: string) {
    if (this.socket) {
      console.log('Joining conversation:', conversationId)
      this.socket.emit('chat:joinConversation', { conversationId })
    }
  }

  leaveConversation(conversationId: string) {
    if (this.socket) {
      console.log('Leaving conversation:', conversationId)
      this.socket.emit('chat:leaveConversation', { conversationId })
    }
  }

  sendMessage(messageData: MessageData) {
    if (this.socket) {
      console.log('Sending message:', messageData)
      this.socket.emit('chat:send', messageData)
    }
  }

  sendTyping(conversationId: string, userId: string) {
    if (this.socket) {
      this.socket.emit('chat:typing', { conversationId, userId })
    }
  }

  stopTyping(conversationId: string, userId: string) {
    if (this.socket) {
      this.socket.emit('chat:stopTyping', { conversationId, userId })
    }
  }

  markAsRead(conversationId: string, userId: string) {
    if (this.socket) {
      this.socket.emit('chat:read', { conversationId, userId })
    }
  }

  // Utility methods
  isConnected(): boolean {
    return this.socket?.connected || false
  }

  getSocket(): Socket | null {
    return this.socket
  }
}
