
"use client"

import { ArrowLeft, Search, Phone, Video, MoreHorizontal, UserCheck, Info, Menu, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface StrangerChatHeaderProps {
    user: {
        id: string
        name: string
        avatar: string
        isOnline?: boolean
    }
    onBack?: () => void
    onToggleInfo?: () => void
    onSendFriendRequest?: () => void
    onAcceptFriendRequest?: () => void
    showInfoPanel?: boolean
    friendRequestStatus?: "pending" | "waiting" | "accepted"
    onToggleMobileSidebar?: () => void
    onToggleChatBubble?: () => void
}

export default function HeaderWindownChat({
    user,
    onBack,
    onToggleInfo,
    onSendFriendRequest,
    onAcceptFriendRequest,
    showInfoPanel = false,
    friendRequestStatus = "waiting",
    onToggleMobileSidebar,
    onToggleChatBubble,
}: StrangerChatHeaderProps) {
    return (
        <div className="w-full bg-white border-b border-gray-200">
            {/* Friend Request Status Banner */}
            {friendRequestStatus === "waiting" && (
                <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700">Đang chờ được đồng ý kết bạn</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={onAcceptFriendRequest}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 h-7 text-sm rounded-md font-medium"
                            >
                                Đồng ý
                            </Button>
                            <Button variant="ghost" size="sm" className="p-1 h-7 w-7 text-gray-500 hover:text-gray-700">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Chat Header */}
            <div className="px-4 py-3 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Mobile Back Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
                        onClick={onBack}
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Button>

                    {/* Mobile Menu Button */}
                    {onToggleMobileSidebar && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
                            onClick={onToggleMobileSidebar}
                        >
                            <Menu className="w-5 h-5 text-gray-600" />
                        </Button>
                    )}

                    <div className="relative flex-shrink-0">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gray-300 text-gray-700 font-semibold text-sm">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-base text-gray-900 truncate">{user.name}</span>
                            <Badge className="text-xs px-2 py-0.5 font-medium rounded bg-gray-200 text-gray-700 border-0">
                                NGƯỜI LẠ
                            </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <span>⏰</span>
                            <span>Không có nhóm chung</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Chat Bubble Toggle Button */}
                    {onToggleChatBubble && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="p-2.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            onClick={onToggleChatBubble}
                        >
                            <MessageCircle className="w-5 h-5" />
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    >
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    >
                        <Phone className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    >
                        <Video className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`p-2.5 rounded-lg ${showInfoPanel ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            }`}
                        onClick={onToggleInfo}
                    >
                        <Info className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
