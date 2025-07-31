
import { useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, CheckCheck } from "lucide-react"

interface Message {
    id: string
    content: string
    sender: "user" | "other"
    timestamp: string
    type: "text" | "image" | "video" | "sticker" | "file"
    senderName?: string
    avatar?: string
    isRead?: boolean
}

interface MessageAreaProps {
    messages: Message[]
    isDarkMode: boolean
}

export function MainContentArea({ messages, isDarkMode }: MessageAreaProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const renderMessageContent = (message: Message) => {
        if (message.type === "video" && message.sender === "user") {
            return (
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md shadow-lg max-w-xs">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm">▶️</span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <span className="text-sm font-medium block truncate">{message.content}</span>
                            <p className="text-xs text-blue-100 mt-1">Video • 2:34</p>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div
                className={`px-4 py-3 rounded-2xl shadow-lg max-w-xs lg:max-w-md ${message.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                        : `${isDarkMode
                            ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
                            : "bg-white text-gray-900 border border-gray-100"
                        } rounded-bl-md`
                    }`}
            >
                <p className="text-sm leading-relaxed break-words">{message.content}</p>
            </div>
        )
    }

    // Handle empty messages array
    if (!messages || messages.length === 0) {
        return (
            <div
                className={`w-full h-full overflow-y-auto flex items-center justify-center ${isDarkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-gray-50 to-gray-100"
                    }`}
            >
                <div className="text-center p-8 max-w-md">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        Chưa có tin nhắn
                    </h3>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Hãy bắt đầu cuộc trò chuyện bằng cách gửi tin nhắn đầu tiên
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div
            className={`w-full h-full overflow-y-auto ${isDarkMode ? "bg-gradient-to-b from-gray-900 to-gray-800" : "bg-gradient-to-b from-gray-50 to-gray-100"
                }`}
        >
            <div className="w-full max-w-none p-6">
                {/* Today timestamp */}
                <div className="flex justify-center mb-6 w-full">
                    <div
                        className={`px-4 py-2 rounded-full shadow-md ${isDarkMode
                                ? "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200"
                                : "bg-white text-gray-600 border border-gray-200"
                            }`}
                    >
                        <span className="text-xs font-semibold">Hôm nay</span>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="flex justify-center mb-8 w-full">
                    <div
                        className={`px-6 py-4 rounded-2xl shadow-md max-w-md text-center ${isDarkMode
                                ? "bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-700/30"
                                : "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200"
                            }`}
                    >
                        <div className="flex items-center justify-center mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <p className={`text-sm font-semibold mb-1 ${isDarkMode ? "text-yellow-200" : "text-yellow-800"}`}>
                            BẢO QUẢN TRỌNG
                        </p>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-yellow-300" : "text-yellow-700"}`}>
                            Tin nhắn tới đã được cập nhật trên hệ thống để kiểm tra và chuẩn bị sách vở nhé!
                        </p>
                    </div>
                </div>

                {/* Messages - Full width container */}
                <div className="space-y-4 w-full">
                    {messages.map((message, index) => (
                        <div
                            key={message.id}
                            className={`flex w-full ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {message.sender === "other" && (
                                <Avatar className="w-8 h-8 mr-3 mt-1 flex-shrink-0 shadow-lg ring-2 ring-white/20">
                                    <AvatarImage src={message.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold text-xs">
                                        {message.senderName?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`${message.sender === "user" ? "ml-auto" : ""} max-w-[70%] min-w-0`}>
                                {message.sender === "other" && message.senderName && (
                                    <p className={`text-xs mb-1 ml-2 font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        {message.senderName}
                                    </p>
                                )}
                                {renderMessageContent(message)}
                                <div
                                    className={`flex items-center gap-2 mt-1 px-2 ${message.sender === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <span className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        {message.timestamp}
                                    </span>
                                    {message.sender === "user" && (
                                        <div className="flex items-center gap-1">
                                            {message.isRead ? (
                                                <CheckCheck className={`w-3 h-3 text-blue-400`} />
                                            ) : (
                                                <Check className={`w-3 h-3 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                            )}
                                            <span
                                                className={`text-xs font-medium ${message.isRead ? "text-blue-400" : isDarkMode ? "text-gray-400" : "text-gray-500"
                                                    }`}
                                            >
                                                {message.isRead ? "Đã xem" : "Đã nhận"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </div>
    )
}
