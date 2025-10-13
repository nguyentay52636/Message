"use client"

import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, CheckCheck, Play, Download, FileText, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Message } from "@/lib/Mock/dataMock"

interface ChatContentProps {
    messages: Message[]
    selectedChat: string | null
}

export default function ChatContent({ messages, selectedChat }: ChatContentProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isInitialLoad, setIsInitialLoad] = useState(true)
    const [prevMessagesLength, setPrevMessagesLength] = useState(0)

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end"
            })
        }
    }

    // Chỉ scroll khi có tin nhắn mới được thêm vào (không phải khi chuyển chat)
    useEffect(() => {
        if (messages.length > prevMessagesLength && prevMessagesLength > 0) {
            scrollToBottom()
        }
        setPrevMessagesLength(messages.length)
    }, [messages, prevMessagesLength])

    // Chỉ scroll khi component mount lần đầu hoặc khi chuyển chat
    useEffect(() => {
        if (isInitialLoad) {
            const timer = setTimeout(() => {
                scrollToBottom()
                setIsInitialLoad(false)
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [isInitialLoad, selectedChat])

    // Reset initial load state khi chuyển chat
    useEffect(() => {
        setIsInitialLoad(true)
    }, [selectedChat])

    const renderMessageContent = (message: Message) => {
        const isUser = message.sender === "user"

        // Video message
        if (message.type === "video") {
            return (
                <div
                    className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl ${isUser
                        ? "bg-primary text-primary-foreground rounded-br-md max-w-[280px] "
                        : "bg-card text-card-foreground border border-border rounded-bl-md max-w-[280px] "
                        }`}
                >
                    <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-[1px]">
                            <Button
                                size="sm"
                                className="rounded-full w-14 h-14 bg-white/90 hover:bg-white text-slate-800 shadow-xl hover:scale-105 transition-all"
                            >
                                <Play className="w-6 h-6 ml-1" />
                            </Button>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
                            2:34
                        </div>
                    </div>
                    <div className="p-4">
                        <p className="text-sm font-medium leading-relaxed">{message.content}</p>
                    </div>
                </div>
            )
        }

        // Image message
        if (message.type === "image") {
            return (
                <div
                    className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl cursor-pointer ${isUser
                        ? "bg-primary text-primary-foreground rounded-br-md max-w-[280px] lg:max-w-[320px]"
                        : "bg-card text-card-foreground border border-border rounded-bl-md max-w-[280px] lg:max-w-[320px]"
                        }`}
                >
                    <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 flex items-center justify-center relative group">
                        <div className="text-6xl opacity-60 group-hover:opacity-80 transition-opacity">
                            <ImageIcon className="w-16 h-16 text-blue-400" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                        <p className="text-sm font-medium leading-relaxed">{message.content}</p>
                    </div>
                </div>
            )
        }

        // File message
        if (message.type === "file") {
            return (
                <div
                    className={`rounded-2xl shadow-lg p-4 transition-all duration-200 hover:shadow-xl ${isUser
                        ? "bg-primary text-primary-foreground rounded-br-md max-w-[320px] lg:max-w-[400px]"
                        : "bg-card text-card-foreground border border-border rounded-bl-md max-w-[320px] lg:max-w-[400px]"
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isUser ? "bg-white/20" : "bg-primary/10"
                                }`}
                        >
                            <FileText className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{message.content}</p>
                            <p className={`text-xs mt-1 ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                PDF • 2.4 MB
                            </p>
                        </div>
                        <Button
                            size="sm"
                            variant={isUser ? "secondary" : "outline"}
                            className="h-9 w-9 p-0 rounded-lg hover:scale-105 transition-transform"
                        >
                            <Download className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )
        }

        // Text message
        return (
            <div
                className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${isUser
                    ? "bg-primary text-primary-foreground rounded-br-md max-w-[280px] sm:max-w-[320px] lg:max-w-[450px] shadow-primary/20"
                    : "bg-card text-card-foreground border border-border rounded-bl-md max-w-[280px] sm:max-w-[320px] lg:max-w-[450px] shadow-card/20"
                    }`}
            >
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
            </div>
        )
    }

    // Handle empty messages array
    if (!messages || messages.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center relative z-10">
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
                    <h3 className="text-xl font-bold mb-3 text-foreground">Chưa có tin nhắn</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Hãy bắt đầu cuộc trò chuyện bằng cách gửi tin nhắn đầu tiên
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="px-3 sm:px-4 py-4 sm:py-6">
                {/* Today timestamp */}
                <div className="flex justify-center mb-6 sm:mb-8 sticky top-0 z-20">
                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md bg-card/90 backdrop-blur-md text-muted-foreground border border-border/50 text-xs font-semibold">
                        Hôm nay
                    </div>
                </div>

                {/* Messages */}
                <div className="space-y-3 sm:space-y-4 pb-4 sm:pb-6">
                    {messages.map((message, index) => {
                        const isUser = message.sender === "user"
                        const prevMessage = messages[index - 1]
                        const nextMessage = messages[index + 1]

                        // Show avatar only for first message in a group from other users
                        const showAvatar =
                            !isUser && (index === 0 || prevMessage?.sender !== message.sender || prevMessage?.sender === "user")

                        // Show name only when showing avatar
                        const showName = showAvatar && message.senderName

                        // Add more spacing between different senders
                        const isNewSender = prevMessage && prevMessage.sender !== message.sender
                        const isLastInGroup = !nextMessage || nextMessage.sender !== message.sender

                        return (
                            <div key={message.id} className={`${isNewSender ? "mt-6" : ""}`}>
                                <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} group`}>
                                    {/* Avatar for other users */}
                                    {!isUser && (
                                        <div className="mr-2 sm:mr-3 flex flex-col items-center flex-shrink-0">
                                            {showAvatar ? (
                                                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shadow-lg ring-2 ring-primary/10 transition-all duration-200 group-hover:scale-105 group-hover:ring-primary/20">
                                                    <AvatarImage src={message.avatar || "/placeholder.svg"} />
                                                    <AvatarFallback className="bg-gradient-to-br from-primary/80 to-secondary/80 text-primary-foreground font-bold text-xs sm:text-sm">
                                                        {message.senderName?.charAt(0) || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <div className="w-8 h-8 sm:w-10 sm:h-10" />
                                            )}
                                        </div>
                                    )}

                                    {/* Message Content */}
                                    <div className={`${isUser ? "ml-auto" : ""} flex flex-col min-w-0`}>
                                        {/* Sender Name */}
                                        {showName && (
                                            <p className="text-xs mb-1.5 sm:mb-2 ml-2 sm:ml-4 font-semibold text-muted-foreground">{message.senderName}</p>
                                        )}

                                        {/* Message Bubble */}
                                        <div className="transition-all duration-200 group-hover:scale-[1.01]">
                                            {renderMessageContent(message)}
                                        </div>

                                        {/* Timestamp and Status - Only show for last message in group */}
                                        {isLastInGroup && (
                                            <div
                                                className={`flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 px-2 sm:px-3 transition-all duration-300 opacity-0 group-hover:opacity-100 ${isUser ? "justify-end" : "justify-start"
                                                    }`}
                                            >
                                                <span className="text-xs font-medium text-muted-foreground/80">{message.timestamp}</span>
                                                {isUser && (
                                                    <div className="flex items-center gap-1 sm:gap-1.5">
                                                        {message.isRead ? (
                                                            <CheckCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary animate-pulse" />
                                                        ) : (
                                                            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
                                                        )}
                                                        <span
                                                            className={`text-xs font-medium transition-colors ${message.isRead ? "text-primary" : "text-muted-foreground"
                                                                }`}
                                                        >
                                                            {message.isRead ? "Đã xem" : "Đã gửi"}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {/* Scroll anchor for auto-scroll */}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </div>
    )
}
