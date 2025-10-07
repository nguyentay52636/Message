"use client"

import { MainWindownChat } from "@/components/StrangerChat/components/MainWindownChat"
import React, { useState } from 'react'

import { IUser } from "@/types/types"
import { ChatListSidebar } from "@/chat/components/ChatListSider/ChatListSider"
import { Message } from "@/lib/Mock/dataMock"
import ChatVide from "@/chat/components/ChatVide"

export default function StrangerChat() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [message, setMessage] = useState("")

    const onSendMessage = () => {
        setMessage("")
    }

    const handleSelectUser = (user: IUser) => {
        console.log("Strager-chat page - handleSelectUser:", user)
        setSelectedUser(user)
        // Reset messages when selecting a new user
        setMessages([])
        setSelectedChat(null)
    }

    const handleBack = () => {
        setSelectedUser(null)
        setMessages([])
        setSelectedChat(null)
    }

    return <div className="flex h-full w-full relative">
        {isMobileSidebarOpen && (
            <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setIsMobileSidebarOpen(false)}
            />
        )}

        <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-90 bg-card border-r border-border flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>

            <ChatListSidebar
                onChatSelect={() => { }}
                selectedChat={null}
                onSelectUser={handleSelectUser}
                onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            />
        </div>

        <div className="flex-1 flex flex-col lg:ml-0">
            {selectedUser ? (
                <MainWindownChat
                    messages={messages}
                    setSelectedChat={setSelectedChat}
                    selectedChat={selectedChat}
                    message={message}
                    setMessage={setMessage}
                    onSendMessage={onSendMessage}
                    recipientName={selectedUser.username}
                    user={selectedUser}
                    onBack={handleBack}
                    onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                />
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    <ChatVide />
                </div>
            )}
        </div>
    </div>
}
