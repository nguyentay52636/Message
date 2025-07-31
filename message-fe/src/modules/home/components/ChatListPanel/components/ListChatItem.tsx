import React from 'react'
import ChatItem from './ChatItem'

interface ChatUser {
    id: string
    name: string
    avatar: string
    lastMessage: string
    timestamp: string
    unreadCount?: number
    isOnline?: boolean
    isPinned?: boolean
    status?: string
    groupInfo?: string
    messageType?: "text" | "image" | "video" | "sticker" | "file"
}

interface ListChatItemProps {
    users: ChatUser[]
    isDarkMode: boolean
    activeTab: string
    selectedUserId?: string
    onUserSelect?: (userId: string) => void
}

export default function ListChatItem({
    users,
    isDarkMode,
    activeTab,
    selectedUserId,
    onUserSelect
}: ListChatItemProps) {
    const filteredUsers = users.filter(user => {
        if (activeTab === "unread") {
            return user.unreadCount && user.unreadCount > 0
        }
        return true
    })

    return (
        <div className={`h-full overflow-y-auto ${isDarkMode ? "bg-gray-800" : "bg-white"
            }`}>
            {filteredUsers.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                        {activeTab === "unread" ? "Không có tin nhắn chưa đọc" : "Không có cuộc trò chuyện nào"}
                    </p>
                </div>
            ) : (
                <div className="space-y-1">
                    {filteredUsers.map((user) => (
                        <ChatItem
                            key={user.id}
                            user={user}
                            isDarkMode={isDarkMode}
                            isSelected={selectedUserId === user.id}
                            onClick={() => onUserSelect?.(user.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
