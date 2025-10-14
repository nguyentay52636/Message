"use client"

import { MainWindownChat } from "@/components/StrangerChat/components/MainWindownChat"
import React, { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks'
import { selectAuth } from '@/redux/slices/authSlice'
import { selectChat } from '@/redux/slices/chatSlice'
import { useSocket } from '@/context/SocketContext'
import { useChatMessages } from '@/features/chat/hooks/useChatMessages'
import { IUser } from "@/types/types"
import { ChatListSidebar } from "@/chat/components/ChatListSider/ChatListSider"
import { SocketStatus } from '@/components/debug/SocketStatus'

export default function StrangerChat() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [selectedChat, setSelectedChat] = useState<string | null>(null)
    const [message, setMessage] = useState("")

    const dispatch = useAppDispatch()
    const { user } = useAppSelector(selectAuth)
    const { selectedConversation } = useAppSelector(selectChat)
    const { sendMessage, joinConversation, leaveConversation } = useSocket()

    // Use custom hook for chat messages
    const { messages, sendMessage: sendMessageToRedux } = useChatMessages(selectedChat)

    const onSendMessage = () => {
        if (!message.trim() || !selectedUser || !user || !selectedChat) return

        // Send message via Socket
        sendMessage({
            conversationId: selectedChat,
            content: message.trim(),
            messageType: 'text',
            senderId: user._id,
            receiverId: selectedUser._id
        })

        // Also add to Redux for immediate UI update
        sendMessageToRedux({
            content: message.trim(),
            messageType: 'text'
        })

        setMessage("")
    }

    const handleConversationCreated = (conversationId: string) => {
        setSelectedChat(conversationId)
    }

    const handleSelectUser = (user: IUser) => {
        console.log("StrangerChat - handleSelectUser:", user)
        setSelectedUser(user)
        setSelectedChat(null) // Reset selected chat
        setMessage("")
    }

    const handleBack = () => {
        setSelectedUser(null)
        setSelectedChat(null)
        setMessage("")
    }

    // Join conversation when user is selected and we have a conversation ID
    useEffect(() => {
        if (selectedUser && selectedChat) {
            joinConversation(selectedChat)
        }

        return () => {
            if (selectedChat) {
                leaveConversation(selectedChat)
            }
        }
    }, [selectedUser, selectedChat, joinConversation, leaveConversation])

    return <div className="flex h-full w-full relative">
        <SocketStatus />


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
                onChatSelect={(chatId) => setSelectedChat(chatId)}
                selectedChat={selectedChat}
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
                    onConversationCreated={handleConversationCreated}
                />
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-4">Chọn người để bắt đầu chat</h2>
                        <p className="text-gray-500">Tìm kiếm và chọn một người từ danh sách để bắt đầu cuộc trò chuyện</p>
                    </div>
                </div>
            )}
        </div>
    </div>
}
