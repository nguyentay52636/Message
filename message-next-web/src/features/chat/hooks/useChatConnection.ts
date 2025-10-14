import { useCallback, useState } from 'react'
import { useSocket } from '@/context/SocketContext'
import { useAppSelector } from '@/redux/hooks/hooks'
import { selectAuth } from '@/redux/slices/authSlice'
import { findOrCreateConversation } from '@/apis/conservationApi'

interface ChatConnectionResult {
  conversationId: string
  success: boolean
  error?: string
}

export const useChatConnection = () => {
  const [isConnecting, setIsConnecting] = useState(false)
  const { user } = useAppSelector(selectAuth)
  const { socket, isSocketConnected, joinConversation, sendMessage } = useSocket()

  const openChatConnection = useCallback(async (
    targetUserId: string,
    targetUsername: string
  ): Promise<ChatConnectionResult> => {
    if (!user?._id) {
      return {
        conversationId: '',
        success: false,
        error: 'User not authenticated'
      }
    }

    if (!socket || !isSocketConnected) {
      return {
        conversationId: '',
        success: false,
        error: 'Socket not connected'
      }
    }

    setIsConnecting(true)

    try {
      console.log('🚀 Starting chat connection process...')
      console.log('👤 Current user:', user._id)
      console.log('🎯 Target user:', targetUserId)
      console.log('🔌 Socket connected:', isSocketConnected)

      // Step 1: Find or create conversation via API
      console.log('📝 Find or create conversation via API...')
      const newConversation = await findOrCreateConversation(user._id, targetUserId)

      if (!newConversation?._id) {
        throw new Error('Failed to create conversation')
      }

      console.log('✅ Conversation created successfully:', newConversation._id)

      // Step 2: Join conversation via socket
      console.log('🔌 Joining conversation via socket...')
      joinConversation(newConversation._id)

      // Step 3: Send welcome message via socket
      console.log('📤 Sending welcome message...')
      const welcomeMessage = {
        conversationId: newConversation._id,
        content: `Xin chào ${targetUsername}! 👋`,
        messageType: 'text',
        senderId: user._id,
        receiverId: targetUserId,
        timestamp: new Date().toISOString()
      }

      sendMessage(welcomeMessage)
      console.log('✅ Welcome message sent successfully')

      // Step 4: Wait a bit to ensure message is processed
      await new Promise(resolve => setTimeout(resolve, 500))

      console.log('🎉 Chat connection established successfully!')
      
      return {
        conversationId: newConversation._id,
        success: true
      }

    } catch (error: any) {
      console.error('❌ Error establishing chat connection:', error)
      return {
        conversationId: '',
        success: false,
        error: error?.message || 'Failed to establish chat connection'
      }
    } finally {
      setIsConnecting(false)
    }
  }, [user, socket, isSocketConnected, joinConversation, sendMessage])

  const checkSocketConnection = useCallback(() => {
    return {
      isConnected: isSocketConnected,
      socketExists: !!socket,
      userAuthenticated: !!user?._id
    }
  }, [isSocketConnected, socket, user])

  return {
    openChatConnection,
    checkSocketConnection,
    isConnecting,
    isSocketConnected,
    socketExists: !!socket,
    userAuthenticated: !!user?._id
  }
}
