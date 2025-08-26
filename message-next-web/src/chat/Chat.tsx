import React, { useState } from 'react'
import { ChatListSidebar } from './components/ChatListSider/ChatListSider'
import { ChatArea } from './components/ChatArea/ChatArea'
import { ChatAreaWithUser } from './components/ChatArea/ChatAreaWithUser'
import { mockUsers, chatData, Message } from '@/lib/Mock/dataMock'
import { IUser } from '@/types/types'
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
                    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-muted/10 via-background to-muted/20">
                        <div className="text-center p-4 sm:p-8 max-w-md">
                            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg border border-primary/10">
                                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">Chọn một cuộc trò chuyện</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                Chọn một người từ danh sách để bắt đầu cuộc trò chuyện
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
