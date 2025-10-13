"use client"

import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, Heart, ExternalLink } from "lucide-react"

interface StrangerMessage {
    id: string
    content: string
    sender: "user" | "other"
    timestamp: string
    type: "text" | "emoji" | "missed-call" | "sticker" | "link-preview"
    isRead?: boolean
    linkData?: {
        url: string
        title: string
        description: string
        domain: string
        thumbnail: string
        likes?: number
    }
}

interface StrangerMessageAreaProps {
    messages: StrangerMessage[]
    user: {
        id: string
        name: string
        avatar: string
    }
}

export default function MessageAreaWindownChat({ messages, user }: StrangerMessageAreaProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const renderMessageContent = (message: StrangerMessage) => {
        const isUser = message.sender === "user"

        // Missed Call Message
        if (message.type === "missed-call") {
            return (
                <div className="max-w-xs mx-auto">
                    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                                <Phone className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-600 dark:text-red-400">Bạn bị nhỡ</p>
                                <p className="text-xs text-muted-foreground">📞 Cuộc gọi thoại</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full h-8 text-sm bg-transparent border-primary text-primary hover:bg-primary/10"
                        >
                            Gọi lại
                        </Button>
                    </div>
                </div>
            )
        }

        // Sticker Message
        if (message.type === "sticker") {
            return (
                <div className="flex justify-start">
                    <div className="relative">
                        <img
                            src="/placeholder.svg?height=120&width=120&text=🐰"
                            alt="Sticker"
                            className="w-24 h-24 object-contain"
                        />
                        {/* Download button for stickers */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 p-1 h-6 w-6 bg-black/20 hover:bg-black/30 rounded-full"
                        >
                            <span className="text-white text-xs">↓</span>
                        </Button>
                    </div>
                </div>
            )
        }

        // Link Preview Message
        if (message.type === "link-preview" && message.linkData) {
            return (
                <div className={`max-w-sm ${isUser ? "ml-auto" : ""}`}>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                        {/* Link thumbnail */}
                        <div className="aspect-video bg-gray-100">
                            <img
                                src={message.linkData.thumbnail || "/placeholder.svg?height=200&width=400&text=Preview"}
                                alt="Link preview"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Link content */}
                        <div className="p-3">
                            <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{message.linkData.title}</h4>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{message.linkData.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-blue-600">{message.linkData.domain}</span>
                                <div className="flex items-center gap-2">
                                    {message.linkData.likes && (
                                        <div className="flex items-center gap-1">
                                            <Heart className="w-3 h-3 text-red-500 fill-current" />
                                            <span className="text-xs text-gray-500">{message.linkData.likes}</span>
                                        </div>
                                    )}
                                    <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                                        <ExternalLink className="w-3 h-3 text-gray-500" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timestamp below link preview */}
                    <div className="flex justify-center mt-1">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{message.timestamp}</span>
                    </div>
                </div>
            )
        }

        if (message.type === "emoji") {
            return (
                <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div className="text-6xl">{message.content}</div>
                </div>
            )
        }

        return (
            <div
                className={`px-3 py-2 rounded-2xl max-w-xs ${isUser
                    ? "bg-blue-500 text-white rounded-br-md ml-auto"
                    : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"
                    }`}
            >
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
            </div>
        )
    }

    if (!messages || messages.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="text-center p-8 max-w-md">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Bắt đầu trò chuyện</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Hãy gửi lời chào đầu tiên để bắt đầu cuộc trò chuyện với {user.name}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col bg-gray-50">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="w-full min-h-full px-4 py-6">
                    {/* Today timestamp */}
                    <div className="flex justify-center mb-6">
                        <div className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-xs font-medium">Hôm nay</div>
                    </div>

                    {/* Messages */}
                    <div className="space-y-3 pb-6">
                        {messages.map((message, index) => {
                            const isUser = message.sender === "user"
                            const prevMessage = messages[index - 1]
                            const nextMessage = messages[index + 1]

                            // Show avatar only for first message in a group from other users
                            const showAvatar =
                                !isUser && (index === 0 || prevMessage?.sender !== message.sender || prevMessage?.sender === "user")

                            // Add more spacing between different senders
                            const isNewSender = prevMessage && prevMessage.sender !== message.sender
                            const isLastInGroup = !nextMessage || nextMessage.sender !== message.sender

                            // Special handling for missed call messages
                            if (message.type === "missed-call") {
                                return (
                                    <div key={message.id} className={`${isNewSender ? "mt-6" : ""}`}>
                                        <div className="flex justify-center">{renderMessageContent(message)}</div>
                                        {/* Timestamp for missed call */}
                                        <div className="flex justify-center mt-2">
                                            <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                                                {message.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                )
                            }

                            // Special handling for link preview messages
                            if (message.type === "link-preview") {
                                return (
                                    <div key={message.id} className={`${isNewSender ? "mt-6" : ""}`}>
                                        <div className="flex justify-start">{renderMessageContent(message)}</div>
                                    </div>
                                )
                            }

                            return (
                                <div key={message.id} className={`${isNewSender ? "mt-4" : ""}`}>
                                    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} group`}>
                                        {/* Avatar for other users */}
                                        {!isUser && (
                                            <div className="mr-3 flex flex-col items-center flex-shrink-0">
                                                {showAvatar ? (
                                                    <Avatar className="w-8 h-8">
                                                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                                        <AvatarFallback className="bg-gray-300 text-gray-700 font-semibold text-xs">
                                                            {user.name?.charAt(0) || "U"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                ) : (
                                                    <div className="w-8 h-8" />
                                                )}
                                            </div>
                                        )}

                                        {/* Message Content */}
                                        <div className={`${isUser ? "ml-auto" : ""} flex flex-col min-w-0`}>
                                            {/* Message Bubble */}
                                            <div>{renderMessageContent(message)}</div>

                                            {/* Timestamp - Only show for last message in group and non-link messages */}
                                            {isLastInGroup && (
                                                <div
                                                    className={`flex items-center gap-2 mt-1 px-2 ${isUser ? "justify-end" : "justify-start"}`}
                                                >
                                                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div ref={messagesEndRef} className="h-1" />
                </div>
            </div>
        </div>
    )
}
