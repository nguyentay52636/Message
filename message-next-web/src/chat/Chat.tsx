import React, { useState } from 'react'
import ChatListItem from './components/ChatListItem'
import { ChatListHeader } from './components/ChatListHeader/ChatListHeader'
import { ChatArea } from './components/ChatArea/ChatArea'
import { Message, chatData, mockUsers } from '@/lib/Mock/dataMock'

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedChat, setSelectedChat] = useState<string | null>(null)

    const handleChatSelection = (chatId: string) => {
        setSelectedChat(chatId)
        const chatMessages = chatData[chatId] || []
        setMessages(chatMessages)
    }

    // Get selected chat info
    const selectedChatInfo = selectedChat ? mockUsers[selectedChat] : null

    return (
        <div className="w-full h-full flex overflow-hidden">
            {/* Left Sidebar - Chat List */}
            <div className="w-80 h-full flex flex-col border-r border-border bg-card">
                {/* Header */}
                <div className="flex-shrink-0">
                    <ChatListHeader activeTab="all" setActiveTab={() => { }} />
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    <ChatListItem
                        activeTab="all"
                        onChatSelect={handleChatSelection}
                        selectedChat={selectedChat}
                    />
                </div>
            </div>

            {/* <div className="flex-1 h-full flex flex-col">
                <ChatArea
                    messages={messages}
                    selectedChatName={selectedChatInfo?.name}
                    selectedChatAvatar={selectedChatInfo?.avatar}
                />
            </div> */}
        </div>
    )
}
