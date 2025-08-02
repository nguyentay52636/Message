import { mockUsers, ChatUser } from '@/lib/Mock/dataMock'
import React from 'react'
import { ChatItem } from './ChatItem'
interface chatListProps {
    activeTab: "all" | "unread"
    onChatSelect: (chatId: string) => void
    selectedChat: string | null
    onToggleMobileSidebar?: () => void
}

export default function ChatListItem({ activeTab, onChatSelect, selectedChat, onToggleMobileSidebar }: chatListProps) {
    const handleChatSelection = (chatId: string) => {
        console.log("Selecting chat:", chatId)
        onChatSelect(chatId)
    }

    const filteredUsers =
        activeTab === "unread" ? Object.values(mockUsers).filter((user) => user.unreadCount && user.unreadCount > 0) : Object.values(mockUsers)
    return (
        <>
            {filteredUsers.map((user: ChatUser, index: number) => (
                <ChatItem
                    key={user.id}
                    user={user}
                    index={index}
                    isSelected={selectedChat === user.id}
                    onClick={() => handleChatSelection(user.id)}
                />
            ))}

        </>
    )
}
