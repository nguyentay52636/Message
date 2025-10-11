"use client"

import { useState } from "react"
import { ChatListHeader } from "../ChatListHeader/ChatListHeader"
import { IUser, IFriendDisplay } from "@/types/types"
import { ConversationContent } from "./components/ConversationContent"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/slices/authSlice"

interface ChatListSidebarProps {
    onChatSelect: (chatId: string) => void
    selectedChat: string | null
    onToggleMobileSidebar?: () => void
    onSelectUser?: (u: IUser) => void
    onConversationCreated?: (conversationId: string) => void
}



export function ChatListSidebar({ onChatSelect, selectedChat, onToggleMobileSidebar, onSelectUser, onConversationCreated }: ChatListSidebarProps) {
    const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
    const [friends, setFriends] = useState<IFriendDisplay[]>([])
    const [loadingFriends, setLoadingFriends] = useState(false)
    const { user } = useSelector(selectAuth)

    const handleChatSelection = (chatId: string) => {
        console.log("Selecting chat:", chatId)
        onChatSelect(chatId)
    }

    return (
        <div className="w-full h-full flex flex-col bg-card">
            <div className="flex-shrink-0">
                <ChatListHeader
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    user={user!}
                    friends={friends}
                    loadingFriends={loadingFriends}
                    onToggleMobileSidebar={onToggleMobileSidebar}
                    onSelectUser={onSelectUser}
                    onConversationCreated={onConversationCreated}
                />
            </div>

            <ConversationContent
                activeTab={activeTab}
                onChatSelect={handleChatSelection}
                selectedChat={selectedChat}
                onConversationCreated={onConversationCreated}
            />
        </div>
    )
}
