import React from 'react'
import { ChatItem } from './ChatItem'
import { IConversationDisplay } from '@/types/types'

interface chatListProps {
    activeTab: "all" | "unread"
    onChatSelect: (chatId: string) => void
    selectedChat: string | null
    onToggleMobileSidebar?: () => void
    user: IConversationDisplay
    index: number
}

export default function ChatListItem({ activeTab, onChatSelect, selectedChat, user, index }: chatListProps) {
    return (
        <div className="w-full">
            <ChatItem
                key={user.id}
                user={user}
                index={index}
                isSelected={selectedChat === user.id}
                onClick={() => onChatSelect(user.id)}
            />
        </div>
    )
}
