"use client"
import Chat from '@/chat/Chat'
import { SiderBar } from '@/components/shared/SiderBar/SiderBar'
import React, { useState } from 'react'

export default function ChatPage() {
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const handleToggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen)
    }

    return (
        <div className="flex h-screen w-full">
            {/* Main Sidebar */}
            <div className="w-16 flex-shrink-0 z-30">
                <SiderBar />
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-hidden">
                <Chat
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                    onToggleMobileSidebar={handleToggleMobileSidebar}
                />
            </div>
        </div>
    )
}
