import React, { useState } from 'react'
import { ChatListSidebar } from './components/ChatListSider/ChatListSider'
import { ChatArea } from './components/ChatArea/ChatArea'
import { ChatAreaWithUser } from './components/ChatArea/ChatAreaWithUser'
import { mockUsers, chatData, Message } from '@/lib/Mock/dataMock'
import { IUser } from '@/types/types'
import ChatVide from './components/ChatVide'
interface ChatProps {
    setSelectedChat: (chatId: string | null) => void
    selectedChat: string | null
    onToggleMobileSidebar: () => void
}

export default function Chat({ setSelectedChat, selectedChat, onToggleMobileSidebar }: ChatProps) {
    const [message, setMessage] = useState('')
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)

    const selectedMockUser = selectedChat ? mockUsers[selectedChat] : null

    const currentMessages: Message[] = selectedChat ? chatData[selectedChat] || [] : []

    const handleSendMessage = () => {
        if (message.trim() && (selectedChat || selectedUser)) {
            // Thêm tin nhắn mới vào danh sách
            const newMessage = {
                id: Date.now().toString(),
                content: message,
                sender: 'user',
                senderName: 'Bạn',
                timestamp: new Date().toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                type: 'text',
                isRead: false
            }

            // Cập nhật tin nhắn (trong thực tế sẽ gọi API)
            console.log('Gửi tin nhắn:', newMessage)
            setMessage('')
        }
    }

    const handleChatSelect = (chatId: string) => {
        setSelectedChat(chatId)
        if (selectedUser) setSelectedUser(null)
        setIsMobileSidebarOpen(false)
    }

    const handleToggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen)
    }

    const handleSelectUserFromSearch = (u: IUser) => {
        setSelectedUser(u)
        setSelectedChat(null)
        setIsMobileSidebarOpen(false)
    }

    const handleConversationCreated = (conversationId: string) => {
        console.log("🎉 New conversation created:", conversationId)
        // Conversation list will automatically refresh via the callback chain
    }

    return (
        <div className="flex h-full w-full relative">
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
                    onChatSelect={handleChatSelect}
                    selectedChat={selectedChat}
                    onToggleMobileSidebar={() => setIsMobileSidebarOpen(false)}
                    onSelectUser={handleSelectUserFromSearch}
                    onConversationCreated={handleConversationCreated}
                />
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col lg:ml-0">
                {selectedUser ? (
                    <ChatAreaWithUser
                        messages={[]}
                        setSelectedChat={setSelectedChat}
                        selectedChat={null}
                        message={message}
                        setMessage={setMessage}
                        onSendMessage={handleSendMessage}
                        recipientName={selectedUser.username}
                        user={selectedUser}
                        onToggleMobileSidebar={handleToggleMobileSidebar}
                        onBack={() => setSelectedUser(null)}
                    />
                ) : selectedChat && selectedMockUser ? (
                    <ChatArea
                        messages={currentMessages}
                        setSelectedChat={setSelectedChat}
                        selectedChat={selectedChat}
                        message={message}
                        setMessage={setMessage}
                        onSendMessage={handleSendMessage}
                        recipientName={selectedMockUser.name}
                        user={selectedMockUser}
                        onToggleMobileSidebar={handleToggleMobileSidebar}
                    />
                ) : (
                    <ChatVide />
                )}
            </div>
        </div>
    )
}
