import { ChatUser, mockUsers } from "../MainContentArea/components/Mock/DataChat"
import { useState } from "react"

import { ListChatItem } from "./components/ListChatItem"
import { TabBar } from "./components/TabBar"
interface ChatListSidebarProps {
    onChatSelect: (chatId: string) => void
    selectedChat: string
    onToggleMobileSidebar: () => void
}
export function ChatListPanel({ onChatSelect, selectedChat }: ChatListSidebarProps) {
    const [activeTab, setActiveTab] = useState<"all" | "unread">("all")

    const filteredUsers =
        activeTab === "unread" ? Object.values(mockUsers).filter((user: ChatUser) => user.unreadCount && user.unreadCount > 0) : Object.values(mockUsers)

    const handleChatSelection = (chatId: string) => {
        onChatSelect(chatId)
    }

    return (
        <div className="w-[400px!] h-full flex bg-card">


            <div className="flex-1 flex flex-col bg-card overflow-y-auto">
                <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
                {filteredUsers.map((user: ChatUser, index: number) => (
                    <ListChatItem
                        key={user.id}
                        user={user}
                        index={index}
                        isSelected={selectedChat === user.id}
                        onClick={() => handleChatSelection(user.id)}
                    />
                ))}


            </div>
        </div>
    )
}