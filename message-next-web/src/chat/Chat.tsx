import React, { useState } from 'react'
import { ChatListSidebar } from './components/ChatListSider/ChatListSider'
import { ChatArea } from './components/ChatArea/ChatArea'
import { mockUsers, chatData } from '@/lib/Mock/dataMock'
import { Button } from '@/components/ui/button'

interface ChatProps {
    setSelectedChat: (chatId: string | null) => void
    selectedChat: string | null
    onToggleMobileSidebar: () => void
}

export default function Chat({ setSelectedChat, selectedChat, onToggleMobileSidebar }: ChatProps) {
    const [message, setMessage] = useState('')
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    // Lấy thông tin user được chọn
    const selectedUser = selectedChat ? mockUsers[selectedChat] : null

    // Lấy tin nhắn của user được chọn
    const currentMessages = selectedChat ? chatData[selectedChat] || [] : []

    const handleSendMessage = () => {
        if (message.trim() && selectedChat) {
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
        // Đóng mobile sidebar khi chọn chat trên mobile
        setIsMobileSidebarOpen(false)
    }

    return (
        <div className="flex h-full w-full relative">
            {/* Mobile Sidebar Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Main Container with Sidebar and Chat Area */}
            <div className="flex h-full w-full">
                {/* Sidebar */}
                <div className={`
                    ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:relative
                    fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50
                    transition-transform duration-300 ease-in-out
                `}>
                    <ChatListSidebar
                        onChatSelect={handleChatSelect}
                        selectedChat={selectedChat}
                        onToggleMobileSidebar={() => setIsMobileSidebarOpen(false)}
                    />
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col lg:ml-0">
                    {selectedChat && selectedUser && (
                        <div className="lg:hidden flex items-center gap-3 p-4 border-b border-border bg-card">
                            <Button
                                onClick={() => setIsMobileSidebarOpen(true)}
                                className="p-2 rounded-lg hover:bg-accent"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </Button>
                            <div className="flex items-center gap-3 flex-1">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-sm font-semibold text-primary">
                                        {selectedUser.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">{selectedUser.name}</h3>
                                    <p className="text-xs text-muted-foreground">
                                        {selectedUser.isOnline ? 'Đang hoạt động' : 'Không hoạt động'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedChat && selectedUser ? (
                        <ChatArea
                            messages={currentMessages}
                            setSelectedChat={setSelectedChat}
                            selectedChat={selectedChat}
                            message={message}
                            setMessage={setMessage}
                            onSendMessage={handleSendMessage}
                            recipientName={selectedUser.name}
                            user={selectedUser}
                            onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
                        />
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-muted/10 via-background to-muted/20">
                            <div className="text-center p-8 max-w-md">
                                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-primary/10">
                                    <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-foreground">Chọn một cuộc trò chuyện</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Chọn một người từ danh sách để bắt đầu cuộc trò chuyện
                                </p>
                                <button
                                    onClick={() => setIsMobileSidebarOpen(true)}
                                    className="lg:hidden mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                                >
                                    Mở danh sách chat
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
