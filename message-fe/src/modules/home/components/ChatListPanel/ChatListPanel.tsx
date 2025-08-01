import { ChatUser, mockUsers } from "../MainContentArea/components/Mock/DataChat"
import { useState } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { ListChatItem } from "./components/ListChatItem"
import { TabBar } from "./components/TabBar"
interface ChatListSidebarProps {
    onChatSelect: (chatId: string) => void
    selectedChat: string
    onToggleMobileSidebar: () => void
}
export function ChatListPanel({ onChatSelect, selectedChat, onToggleMobileSidebar }: ChatListSidebarProps) {
    const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
    const [showWebNotification, setShowWebNotification] = useState(true)

    const filteredUsers =
        activeTab === "unread" ? Object.values(mockUsers).filter((user: ChatUser) => user.unreadCount && user.unreadCount > 0) : Object.values(mockUsers)

    const handleChatSelection = (chatId: string) => {
        console.log("Selecting chat:", chatId)
        onChatSelect(chatId)
    }

    return (
        <div className="w-[400px!] h-full flex bg-card">


            {/* Chat List Content - Takes remaining width */}
            <div className="flex-1 flex flex-col bg-card overflow-y-auto">
                <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />


                {/* Chat List - Scrollable */}
                <ScrollArea className="flex-1 overflow-hidden">
                    {/* Web Login Notification - Compact */}


                    {/* Chat List Items */}
                    <div className="flex-shrink-0 pb-4">
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
                </ScrollArea>
            </div>
        </div>
    )
}