"use client"

import { MainWindownChat } from "@/chat/ChatUpdate/MainWindownChat"
import React, { useState } from 'react'

import { IUser } from "@/types/types"
import { ChatListSidebar } from "@/chat/components/ChatListSider/ChatListSider"



export default function page() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

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
            {selectedUser ? (
                <MainWindownChat onBack={() => setSelectedUser(null)} />
            ) : (
                <ChatListSidebar
                    onChatSelect={() => { }}
                    selectedChat={null}
                />
            )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col lg:ml-0">

            {selectedUser ? (
                <MainWindownChat onBack={() => setSelectedUser(null)} />
            ) : (
                <MainWindownChat onBack={() => setSelectedUser(null)} />
            )}
        </div>
    </div>

}
