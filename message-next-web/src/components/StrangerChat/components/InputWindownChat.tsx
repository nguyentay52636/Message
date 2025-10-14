"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Smile, ImageIcon, FileText, Sticker, Camera, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSocket } from "@/context/SocketContext"
import { useTypingIndicator } from "@/features/chat/hooks/useChatMessages"
import { findOrCreateConversation } from "@/apis/conservationApi"
import { useAppSelector } from "@/redux/hooks/hooks"
import { selectAuth } from "@/redux/slices/authSlice"

interface StrangerChatInputProps {
    message: string
    setMessage: (message: string) => void
    onSendMessage: () => void
    recipientName?: string
    disabled?: boolean
    conversationId?: string | null
    recipientId?: string
    onConversationCreated?: (conversationId: string) => void
}

export default function InputWindownChat({
    message,
    setMessage,
    onSendMessage,
    recipientName,
    disabled = false,
    conversationId,
    recipientId,
    onConversationCreated
}: StrangerChatInputProps) {
    const [showAttachments, setShowAttachments] = useState(false)
    const [isCreatingConversation, setIsCreatingConversation] = useState(false)
    const { sendTyping, stopTyping, sendMessage: sendSocketMessage } = useSocket()
    const { startTyping, stopTyping: stopTypingIndicator } = useTypingIndicator(conversationId || null)
    const { user } = useAppSelector(selectAuth)

    // Typing indicator logic
    useEffect(() => {
        let typingTimeout: NodeJS.Timeout | undefined

        if (message.trim() && conversationId) {
            startTyping()

            // Clear existing timeout
            if (typingTimeout) {
                clearTimeout(typingTimeout)
            }

            // Set new timeout to stop typing
            typingTimeout = setTimeout(() => {
                stopTypingIndicator()
            }, 1000)
        } else if (!message.trim() && conversationId) {
            stopTypingIndicator()
        }

        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout)
            }
        }
    }, [message, conversationId, startTyping, stopTypingIndicator])

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (message.trim() && !disabled) {
                onSendMessage()
            }
        }
    }

    const handleSendClick = async () => {
        if (message.trim() && !disabled && !isCreatingConversation) {
            // Nếu chưa có conversationId và có recipientId, tạo conversation trước
            if (!conversationId && recipientId && user) {
                setIsCreatingConversation(true)
                try {
                    const conversation = await findOrCreateConversation(user._id || user.id || '', recipientId)
                    if (onConversationCreated) {
                        onConversationCreated(conversation._id)
                    }

                    // Gửi tin nhắn qua socket với conversationId mới
                    sendSocketMessage({
                        conversationId: conversation._id,
                        content: message.trim(),
                        messageType: 'text',
                        senderId: user._id || user.id,
                        receiverId: recipientId
                    })

                    setMessage("")
                } catch (error) {
                    console.error('Error creating conversation:', error)
                } finally {
                    setIsCreatingConversation(false)
                }
            } else {
                // Nếu đã có conversationId, gửi tin nhắn bình thường
                onSendMessage()
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    return (
        <div className="w-full border-t border-gray-200 px-4 py-3 bg-white">
            {/* Attachment Menu */}
            {showAttachments && (
                <div className="mb-3 flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-xs">Ảnh</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-green-600 hover:bg-green-50 p-2">
                        <Camera className="w-4 h-4" />
                        <span className="text-xs">Camera</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-purple-600 hover:bg-purple-50 p-2">
                        <FileText className="w-4 h-4" />
                        <span className="text-xs">File</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-orange-600 hover:bg-orange-50 p-2">
                        <Sticker className="w-4 h-4" />
                        <span className="text-xs">Sticker</span>
                    </Button>
                </div>
            )}

            {/* Message Input Row */}
            <div className="flex items-center gap-3 w-full">
                {/* Left Action Buttons */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAttachments(!showAttachments)}
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        disabled={disabled}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        disabled={disabled}
                    >
                        <ImageIcon className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        disabled={disabled}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                        </svg>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        disabled={disabled}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2"
                            />
                        </svg>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        disabled={disabled}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        disabled={disabled}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                            />
                        </svg>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        disabled={disabled}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </Button>
                </div>

                <div className="flex-1 relative min-w-0">
                    <Input
                        placeholder={
                            disabled
                                ? "Gửi yêu cầu kết bạn để có thể nhắn tin"
                                : recipientName
                                    ? `Nhập @, tin nhắn tới ${recipientName}`
                                    : "Nhập tin nhắn..."
                        }
                        value={message}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={disabled}
                        className="w-full h-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-20 bg-white text-gray-900 placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            disabled={disabled}
                        >
                            <Smile className="w-4 h-4" />
                        </Button>
                        {message.trim() ? (
                            <Button
                                onClick={handleSendClick}
                                size="sm"
                                className="p-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                                disabled={disabled || isCreatingConversation}
                            >
                                {isCreatingConversation ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </Button>
                        ) : (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                disabled={disabled}
                            >
                                <span className="text-lg">👍</span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
