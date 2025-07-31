import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pin, Image, Video, FileText, Smile } from "lucide-react"

interface ChatUser {
    id: string
    name: string
    avatar: string
    lastMessage: string
    timestamp: string
    unreadCount?: number
    isOnline?: boolean
    isPinned?: boolean
    status?: string
    groupInfo?: string
    messageType?: "text" | "image" | "video" | "sticker" | "file"
}

interface ChatItemProps {
    user: ChatUser
    isDarkMode: boolean
    isSelected?: boolean
    onClick?: () => void
}

export default function ChatItem({ user, isDarkMode, isSelected = false, onClick }: ChatItemProps) {
    const getMessageIcon = (type?: string) => {
        switch (type) {
            case "image":
                return <Image className="w-4 h-4" />
            case "video":
                return <Video className="w-4 h-4" />
            case "file":
                return <FileText className="w-4 h-4" />
            case "sticker":
                return <Smile className="w-4 h-4" />
            default:
                return null
        }
    }

    return (
        <div
            onClick={onClick}
            className={`flex items-center p-3 cursor-pointer transition-all duration-200 hover:bg-opacity-80 ${isSelected
                ? isDarkMode
                    ? "bg-blue-600/20 border-r-2 border-blue-500"
                    : "bg-blue-50 border-r-2 border-blue-500"
                : isDarkMode
                    ? "hover:bg-gray-700/50"
                    : "hover:bg-gray-50"
                }`}
        >
            {/* Avatar */}
            <div className="relative mr-3">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className={`font-semibold text-sm ${isDarkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-700"
                        }`}>
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                </Avatar>
                {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
                {user.isPinned && (
                    <div className="absolute -top-1 -right-1">
                        <Pin className="w-4 h-4 text-blue-500" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold text-sm truncate ${isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                        {user.name}
                    </h3>
                    <span className={`text-xs ml-2 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}>
                        {user.timestamp}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-1 min-w-0">
                        {getMessageIcon(user.messageType)}
                        <p className={`text-sm truncate ${isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}>
                            {user.lastMessage}
                        </p>
                    </div>

                    {user.unreadCount && user.unreadCount > 0 && (
                        <div className="ml-2 flex-shrink-0">
                            <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1 min-w-[20px] text-center">
                                {user.unreadCount > 99 ? "99+" : user.unreadCount}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
