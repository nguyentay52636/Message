import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks'
import { selectChat } from '@/redux/slices/chatSlice'
import { selectSocket } from '@/redux/slices/socketSlice'
import { selectAuth } from '@/redux/slices/authSlice'
import { 
  setMessages, 
  addMessage, 
  updateMessageRead,
  setSelectedConversation,
  clearUnreadCount
} from '@/redux/slices/chatSlice'
import { useSocket } from '@/context/SocketContext'
import { useEffect, useCallback } from 'react'
import { IMessage } from '@/types/types'

export const useChatMessages = (conversationId: string | null) => {
  const dispatch = useAppDispatch()
  const { messages, selectedConversation, unreadCounts } = useAppSelector(selectChat)
  const { user } = useAppSelector(selectAuth)
  const { markAsRead, joinConversation, leaveConversation } = useSocket()

  const conversationMessages = conversationId ? messages[conversationId] || [] : []
  const unreadCount = conversationId ? unreadCounts[conversationId] || 0 : 0

  // Join conversation when selected
  useEffect(() => {
    if (conversationId && conversationId !== selectedConversation) {
      dispatch(setSelectedConversation(conversationId))
      joinConversation(conversationId)
      
      // Mark messages as read
      if (user && unreadCount > 0) {
        markAsRead(conversationId, user._id)
        dispatch(clearUnreadCount(conversationId))
      }
    }

    return () => {
      if (conversationId) {
        leaveConversation(conversationId)
      }
    }
  }, [conversationId, selectedConversation, user, unreadCount, dispatch, joinConversation, leaveConversation, markAsRead])

  const sendMessage = useCallback((messageData: Partial<IMessage>) => {
    if (!conversationId || !user) return

    const message: IMessage = {
      id: Date.now().toString(),
      content: messageData.content || '',
      sender: user._id,
      conversationId,
      messageType: messageData.messageType || 'text',
      createdAt: new Date().toISOString(),
      isRead: false,
      readBy: [],
      imageId: messageData.imageId,
      mediaUrl: messageData.mediaUrl
    }

    dispatch(addMessage(message))
  }, [conversationId, user, dispatch])

  return {
    messages: conversationMessages,
    unreadCount,
    sendMessage,
    isLoading: false
  }
}

export const useTypingIndicator = (conversationId: string | null) => {
  const { typingUsers } = useAppSelector(selectChat)
  const { user } = useAppSelector(selectAuth)
  const { sendTyping, stopTyping } = useSocket()

  const typingUsersInConversation = conversationId 
    ? typingUsers.filter(t => t.conversationId === conversationId && t.userId !== user?._id)
    : []

  const startTyping = useCallback(() => {
    if (conversationId && user) {
      sendTyping(conversationId, user._id)
    }
  }, [conversationId, user, sendTyping])

  const stopTypingIndicator = useCallback(() => {
    if (conversationId && user) {
      stopTyping(conversationId, user._id)
    }
  }, [conversationId, user, stopTyping])

  return {
    typingUsers: typingUsersInConversation,
    startTyping,
    stopTyping: stopTypingIndicator
  }
}

export const useOnlineUsers = () => {
  const { onlineUsers } = useAppSelector(selectSocket)
  
  const isUserOnline = useCallback((userId: string) => {
    return onlineUsers.some(user => user.userId === userId)
  }, [onlineUsers])

  return {
    onlineUsers,
    isUserOnline
  }
}
