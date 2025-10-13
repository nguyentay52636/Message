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

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const renderMessageContent = (message: StrangerMessage) => {
        const isUser = message.sender === "user"

        // 🔔 Cuộc gọi nhỡ
        if (message.type === "missed-call") {
            return (
                <div className="max-w-xs mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center">
                                <Phone className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-red-600">Bạn bị nhỡ</p>
                                <p className="text-xs text-muted-foreground">📞 Cuộc gọi thoại</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full h-8 text-sm border-primary text-primary hover:bg-primary/10 transition"
                        >
                            Gọi lại
                        </Button>
                    </div>
                </div>
            )
        }

        // 🐰 Sticker
        if (message.type === "sticker") {
            return (
                <div className="relative">
                    <img
                        src="/placeholder.svg?height=120&width=120&text=🐰"
                        alt="Sticker"
                        className="w-24 h-24 object-contain"
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-1 right-1 p-1 h-6 w-6 bg-black/20 hover:bg-black/30 rounded-full"
                    >
                        <span className="text-white text-xs">↓</span>
                    </Button>
                </div>
            )
        }

        // 🌐 Link Preview
        if (message.type === "link-preview" && message.linkData) {
            return (
                <div className={`max-w-sm ${isUser ? "ml-auto" : ""}`}>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                        <div className="aspect-video bg-gray-100">
                            <img
                                src={message.linkData.thumbnail || "/placeholder.svg?height=200&width=400&text=Preview"}
                                alt="Link preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-3">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                                {message.linkData.title}
                            </h4>
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
                </div>
            )
        }

        // 😄 Emoji lớn
        if (message.type === "emoji") {
            return <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}><div className="text-6xl">{message.content}</div></div>
        }

        // 💬 Tin nhắn text
        return (
            <div
                className={`px-3 py-2 rounded-2xl shadow-sm max-w-xs transition ${isUser
                    ? "bg-blue-500 text-white ml-auto rounded-br-md hover:bg-blue-600"
                    : "bg-white border border-gray-200 text-gray-900 rounded-bl-md hover:bg-gray-50"
                    }`}
            >
                <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
            </div>
        )
    }

    // 🕊 Khi chưa có tin nhắn
    if (!messages || messages.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
                <div className="text-center p-8 max-w-md">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Bắt đầu trò chuyện 💬</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Gửi lời chào đầu tiên để bắt đầu cuộc trò chuyện với <span className="font-semibold text-blue-600">{user.name}</span>
                    </p>
                </div>
            </div>
        )
    }

    // 💬 Khu vực hiển thị tin nhắn
    return (
        <div className="w-full h-full flex flex-col bg-gray-50 relative">
            {/* Background gradient */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_60%)]" />

            {/* Tin nhắn */}
            <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-6 space-y-4">
                    {/* Label ngày */}
                    <div className="flex justify-center">
                        <div className="px-3 py-1 rounded-full bg-gray-300 text-gray-700 text-xs font-medium shadow-sm">
                            Hôm nay
                        </div>
                    </div>

                    {/* Các tin nhắn */}
                    {messages.map((message, index) => {
                        const isUser = message.sender === "user"
                        const prevMessage = messages[index - 1]
                        const nextMessage = messages[index + 1]
                        const showAvatar = !isUser && (!prevMessage || prevMessage.sender !== message.sender)
                        const isLastInGroup = !nextMessage || nextMessage.sender !== message.sender

                        return (
                            <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}>
                                {!isUser && (
                                    <div className="flex-shrink-0">
                                        {showAvatar ? (
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback className="bg-gray-300 text-gray-700 font-semibold text-xs">
                                                    {user.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        ) : (
                                            <div className="w-8 h-8" />
                                        )}
                                    </div>
                                )}
                                <div className="flex flex-col max-w-[75%]">
                                    {renderMessageContent(message)}
                                    {isLastInGroup && (
                                        <span className={`text-xs text-gray-400 mt-1 ${isUser ? "text-right" : ""}`}>
                                            {message.timestamp}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </div>
    )
}
