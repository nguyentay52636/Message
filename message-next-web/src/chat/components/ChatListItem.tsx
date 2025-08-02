import { mockUsers, ChatUser } from '@/lib/Mock/dataMock'
import React from 'react'
import { ChatItem } from './ChatItem'

interface chatListProps {
    activeTab: "all" | "unread"
    onChatSelect: (chatId: string) => void
    selectedChat: string | null
    onToggleMobileSidebar?: () => void
    user: ChatUser
    index: number
}

export default function ChatListItem({ activeTab, onChatSelect, selectedChat, user, index }: chatListProps) {
    const handleChatSelection = (chatId: string) => {
        onChatSelect(chatId)
    }

    return (
        <ChatItem
            key={user.id}
            user={user}
            index={index}
            isSelected={selectedChat === user.id}
            onClick={() => handleChatSelection(user.id)}
        />
    )
}
