"use client"

import React from "react"
import { Pin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { IConversationDisplay } from "@/types/types"

interface ChatListItemProps {
    user: IConversationDisplay
    index: number
    isSelected: boolean
    onClick: () => void
}

export function ChatItem({ user, index, isSelected, onClick }: ChatListItemProps) {
    const getMessageIcon = (type: string) => {
        switch (type) {
            case "image":
                return "📷"
            case "video":
                return "🎥"
            case "sticker":
                return "😊"
            case "file":
                return "📎"
            default:
                return null
        }
    }

    return (
        <div
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 p-3 sm:p-4 cursor-pointer transition-all duration-200 rounded-2xl border border-transparent hover:bg-[#f1f5f9] hover:shadow-sm",
                isSelected && "bg-[#e6f3ff] border-[#107bbd] shadow-sm"
            )}
        >
            {/* Avatar + trạng thái */}
            <div className="relative flex-shrink-0">
                <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-200 shadow-sm">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-[#107bbd] text-white font-semibold">
                        {user.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                {user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                )}
            </div>

            {/* Nội dung chính */}
            <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center justify-between mb-0.5">
                    <p
                        className={cn(
                            "font-semibold text-[15px] sm:text-[16px] text-gray-900 truncate",
                            isSelected && "text-[#107bbd]"
                        )}
                    >
                        {user.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        {user.isPinned && <Pin className="w-3 h-3 text-amber-500" />}
                        {user.timestamp && <span>{user.timestamp}</span>}
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    {user.messageType && getMessageIcon(user.messageType) && (
                        <span className="text-sm mr-1 flex-shrink-0 opacity-80">
                            {getMessageIcon(user.messageType)}
                        </span>
                    )}
                    <p
                        className={cn(
                            "text-sm text-gray-600 truncate",
                            isSelected && "text-[#107bbd]/80"
                        )}
                    >
                        {user.lastMessage || " "}
                    </p>
                </div>
            </div>

            {/* Badge tin chưa đọc */}
            <div className="flex flex-col items-end justify-between h-full text-center  text-gray-100! rounded-full bg-red-600 px-3 py-1   ">
                {user.unreadCount && user.unreadCount > 0 && (
                    <Badge
                        className={cn(
                            "px-2 py-1 rounded-full text-[12px ] font-semibold text-white",
                            user.unreadCount >= 5 ? "bg-[#107bbd]" : "bg-red-500"
                        )}
                    >
                        {user.unreadCount >= 5 ? "5+" : user.unreadCount}
                    </Badge>
                )}
            </div>
        </div>
    )
}
