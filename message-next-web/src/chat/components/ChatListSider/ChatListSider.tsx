"use client"

import { useState } from "react"
import { ChatUser, mockUsers } from "@/lib/Mock/dataMock"
import { ChatListHeader } from "../ChatListHeader/ChatListHeader"
import ChatListItem from "../ChatListItem"


interface ChatListSidebarProps {
    onChatSelect: (chatId: string) => void
    selectedChat: string | null
    onToggleMobileSidebar?: () => void
}



export function ChatListSidebar({ onChatSelect, selectedChat, onToggleMobileSidebar }: ChatListSidebarProps) {
    const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
    const [showWebNotification, setShowWebNotification] = useState(true)

    // Convert mockUsers object to array and filter
    const allUsers = Object.values(mockUsers)
    const filteredUsers = activeTab === "unread"
        ? allUsers.filter((user) => user.unreadCount && user.unreadCount > 0)
        : allUsers

    const handleChatSelection = (chatId: string) => {
        console.log("Selecting chat:", chatId)
        onChatSelect(chatId)
    }

    return (
        <div className="w-full bg-blue-500 flex  items-center">

            <div className="flex-1 flex flex-col bg-card min-w-0 h-100vh ">
                <div>
                    <ChatListHeader activeTab={activeTab} setActiveTab={setActiveTab} user={allUsers[0]} onToggleMobileSidebar={onToggleMobileSidebar} />
                </div>

                <div className="">
                    {filteredUsers.map((user: ChatUser, index: number) => (
                        <ChatListItem
                            key={user.id}
                            user={user}
                            activeTab={activeTab}
                            onChatSelect={onChatSelect}
                            selectedChat={selectedChat}
                            index={index}

                        />
                    ))}
                </div>

            </div>
        </div>
    )
}
