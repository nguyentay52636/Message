import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { IConversation, IConversationDisplay, IUser } from "@/types/types"
import { getConversationOfUser } from "@/apis/conservationApi"
import { selectAuth } from "@/redux/slices/authSlice"

interface UseConversationsReturn {
    conversations: IConversationDisplay[]
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useConversations = (): UseConversationsReturn => {
    const [conversations, setConversations] = useState<IConversationDisplay[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const { user, isAuthenticated } = useSelector(selectAuth)

    // Helper function to convert IConversation to IConversationDisplay
    const convertConversationToDisplay = (conversation: IConversation, currentUserId: string): IConversationDisplay => {
        // Filter out current user from members
        const otherMembers = conversation.members.filter((member: string | IUser) => {
            if (typeof member === 'object') {
                return member._id !== currentUserId && member.id !== currentUserId
            }
            return member !== currentUserId
        }) as IUser[]

        // Determine display name based on conversation type
        const displayName = conversation.type === 'group'
            ? conversation.groupName || 'Group Chat'
            : otherMembers[0]?.username || otherMembers[0]?.email || 'Unknown User'

        // Determine display avatar
        const displayAvatar = conversation.type === 'group'
            ? conversation.groupAvatar || 'https://i.pravatar.cc/150?img=15'
            : otherMembers[0]?.avatar || 'https://i.pravatar.cc/150?img=11'

        // Get last message content
        const lastMessage = conversation.lastMessage?.content || 'No messages yet'

        // Format timestamp - handle both lastMessage.createdAt and lastUpdated
        const timestamp = conversation.lastMessage?.createdAt
            ? new Date(conversation.lastMessage.createdAt).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
            })
            : new Date(conversation.lastUpdated).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
            })

        return {
            _id: conversation._id,
            id: conversation._id,
            name: displayName,
            avatar: displayAvatar,
            lastMessage,
            timestamp,
            unreadCount: 0, // TODO: Calculate unread count from messages
            isOnline: true, // TODO: Get real online status
            isPinned: false,
            messageType: conversation.lastMessage?.messageType === 'audio' ? 'text' : (conversation.lastMessage?.messageType || 'text'),
            type: conversation.type,
            members: otherMembers,
            lastUpdated: conversation.lastUpdated
        }
    }

    const fetchConversations = async () => {
        // Clear previous error
        setError(null)

        if (!isAuthenticated || !user) {
            console.log('User not authenticated or not found in auth state')
            setConversations([])
            return
        }

        const userId = user.id || user._id
        if (!userId) {
            console.error('User ID not found:', user)
            setError('User ID not found')
            setConversations([])
            return
        }

        console.log('Fetching conversations for user:', userId)
        setLoading(true)

        try {
            const conversationsData = await getConversationOfUser(userId)
            console.log('Received conversations:', conversationsData)
            console.log('Number of conversations:', conversationsData.length)

            const convertedConversations = conversationsData.map((conv, index) => {
                console.log(`Converting conversation ${index}:`, conv)
                const converted = convertConversationToDisplay(conv, userId)
                console.log(`Converted conversation ${index}:`, converted)
                return converted
            })

            console.log('All converted conversations:', convertedConversations)
            setConversations(convertedConversations)
            setError(null)
        } catch (error: any) {
            console.error('Error fetching conversations:', error)
            const errorMessage = error?.message || 'Failed to fetch conversations'
            setError(errorMessage)
            setConversations([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchConversations()
    }, [user, isAuthenticated])

    return {
        conversations,
        loading,
        error,
        refetch: fetchConversations
    }
}
