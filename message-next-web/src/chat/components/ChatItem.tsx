import type React from "react"
import { Pin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChatUser } from "@/lib/Mock/dataMock"



interface ChatListItemProps {
    user: ChatUser
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
                return "▶️"
            case "sticker":
                return "😊"
            case "file":
                return "📎"
            default:
                return null
        }
    }

    const handleClick = (e: React.MouseEvent) => {
        onClick()
    }

    return (
        <div
            onClick={handleClick}
            className={cn(
                "flex items-center gap-3 p-3 mx-2 my-1 cursor-pointer transition-all duration-200 rounded-xl hover:scale-[1.02] active:scale-[0.9]",
                isSelected ? "bg-accent/50 shadow-lg  border-primary" : "hover:bg-accent/30",
            )}
        >
            <div className="relative flex-shrink-0">
                <Avatar className="w-11 h-11 lg:w-12 lg:h-12 shadow-md">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-blue-600 text-primary-foreground font-semibold text-sm">
                        {user.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 lg:w-4 lg:h-4 bg-green-500 border-2 border-background rounded-full shadow-sm"></div>
                )}
                {/* Special badges for specific users */}
                {index === 0 && user.unreadCount && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-destructive text-destructive-foreground text-xs flex items-center justify-center rounded-full shadow-lg font-bold">
                        {user.unreadCount}
                    </div>
                )}
                {index === 3 && user.unreadCount && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-orange-500 text-white text-xs flex items-center justify-center rounded-full shadow-lg font-bold">
                        {user.unreadCount}
                    </div>
                )}
                {index === 6 && user.unreadCount && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-destructive text-destructive-foreground text-xs flex items-center justify-center rounded-full shadow-lg font-bold">
                        {user.unreadCount}
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0 overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                    <span
                        className={cn("font-semibold text-sm truncate flex-1", isSelected ? "text-primary" : "text-foreground")}
                    >
                        {user.name}
                    </span>
                    {user.isPinned && <Pin className="w-3 h-3 text-amber-500 flex-shrink-0" />}
                    {index === 2 && (
                        <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="text-yellow-500">⚡</span>
                            <span className="text-xs text-primary font-medium">{user.timestamp}</span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-1">
                    {user.messageType && getMessageIcon(user.messageType) && (
                        <span className="text-xs mr-1 flex-shrink-0">{getMessageIcon(user.messageType)}</span>
                    )}
                    <span
                        className={cn("text-xs truncate flex-1", isSelected ? "text-primary/80" : "text-muted-foreground")}
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        {user.lastMessage}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                {user.timestamp && index !== 2 && (
                    <span className="text-xs whitespace-nowrap text-muted-foreground">{user.timestamp}</span>
                )}
                {user.unreadCount && user.unreadCount > 0 && (
                    <Badge
                        className={cn(
                            "text-white text-xs px-2 py-1 h-5 min-w-[20px] font-bold shadow-lg",
                            user.unreadCount >= 5 ? "bg-destructive" : "bg-primary",
                        )}
                    >
                        {user.unreadCount >= 5 ? "5+" : user.unreadCount}
                    </Badge>
                )}
            </div>
        </div>
    )
}
