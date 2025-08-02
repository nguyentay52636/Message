"use client"
import Chat from '@/chat/Chat'
import React, { useState } from 'react'

export default function ChatPage() {
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const handleToggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen)
    }



    return (
        <div className="flex-1 overflow-hidden">
            <Chat
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
                onToggleMobileSidebar={handleToggleMobileSidebar}
            />
        </div>
    )
}
