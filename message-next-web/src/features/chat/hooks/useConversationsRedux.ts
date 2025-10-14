import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks'
import { selectChat } from '@/redux/slices/chatSlice'
import { selectAuth } from '@/redux/slices/authSlice'
import { IUser } from '@/types/types'
import { 
  setConversations,
  addConversation,
  updateConversation,
  setUnreadCount,
  incrementUnreadCount,
  clearUnreadCount,
  setLoading,
  setError
} from '@/redux/slices/chatSlice'
import { getConversationOfUser } from '@/apis/conservationApi'
import { useEffect, useCallback } from 'react'
import { IConversation } from '@/types/types'

// Ensure conversation.members are IUser[] when possible
const normalizeConversation = (conversation: IConversation): IConversation => {
  const members = (conversation.members || []) as (string | IUser)[]
  const membersAsUsers: IUser[] = members.map((m) =>
    typeof m === 'string' ? ({ _id: m, username: '', email: '', phone: '', password: '' } as IUser) : m
  )
  return { ...conversation, members: membersAsUsers }
}

export const useConversationsRedux = () => {
  const dispatch = useAppDispatch()
  const { conversations, unreadCounts, isLoading, error } = useAppSelector(selectChat)
  const { user, isAuthenticated } = useAppSelector(selectAuth)

  const fetchConversations = useCallback(async () => {
    if (!isAuthenticated || !user) {
      console.log('User not authenticated or not found in auth state')
      dispatch(setConversations([]))
      return
    }

    const userId = user.id || user._id
    if (!userId) {
      console.error('User ID not found:', user)
      dispatch(setConversations([]))
      return
    }

    console.log('Fetching conversations for user:', userId)
    dispatch(setLoading(true))

    try {
      const conversationsData = await getConversationOfUser(userId)
      console.log('Received conversations:', conversationsData)

      const normalized = conversationsData.map(normalizeConversation)
      dispatch(setConversations(normalized))
    } catch (error: any) {
      console.error('Error fetching conversations:', error)
      dispatch(setError(error?.message || 'Failed to fetch conversations'))
    } finally {
      dispatch(setLoading(false))
    }
  }, [isAuthenticated, user, dispatch])

  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  const refreshConversations = useCallback(() => {
    console.log("🔄 Refreshing conversations...")
    fetchConversations()
  }, [fetchConversations])

  const getUnreadCount = useCallback((conversationId: string) => {
    return unreadCounts[conversationId] || 0
  }, [unreadCounts])

  const markAsRead = useCallback((conversationId: string) => {
    dispatch(clearUnreadCount(conversationId))
  }, [dispatch])

  const addNewConversation = useCallback((conversation: IConversation) => {
    if (!user) return
    
    const userId = user.id || user._id
    if (!userId) return

    dispatch(addConversation(normalizeConversation(conversation)))
  }, [dispatch, user])

  const updateExistingConversation = useCallback((conversationId: string, updates: Partial<IConversation>) => {
    dispatch(updateConversation({
      id: conversationId,
      updates
    }))
  }, [dispatch])

  return {
    conversations,
    unreadCounts,
    isLoading,
    error,
    refreshConversations,
    getUnreadCount,
    markAsRead,
    addNewConversation,
    updateExistingConversation
  }
}
